document.body.style.margin   = 0
document.body.style.overflow = `hidden`

// I created this pixel sorter funciton inspired by Sabato Visconti's pixelsorted photos.
// https://www.sabatobox.com/pixel-sorting-experiments
// the photos have really cool pixel sorter area
// Changing a bit of variable and trial and error, I made this pixel sorter destroy function.
// I can manipulate the glitch myself but still shows the chaos 
// by adverting the user's expectation of the mouse control
// The pixel sorter is on a different side of the where the pointer is, 
// making it more unexpected and more zany.

// calling the canvas from index file using Id name
const cnv = document.getElementById (`cnv_element`);

// setting the size of the canvas
cnv.width = document.body.parentNode.scrollWidth;
cnv.height = (cnv.width * 9) / 16;

// getting the canvas context
const ctx = cnv.getContext(`2d`);

// calling the pixelsorter class in
const sorter = new PixelSorter(cnv,ctx);

// creating the image
const img = new Image();

// calling in the image
img.onload = () => {

  // size of the image 
  cnv.height = cnv.width * (img.height / img.width);

  // drawing the image
  ctx.drawImage(img, 0, 0, cnv.width, cnv.height);

  // getting the image data
  window.imageData = ctx.getImageData (0, 0, cnv.width, cnv.height);

  // calling the pixel sorter's canvas in with their own dimension
  sorter.init();
  };

// give filepath to the image
img.src = `stream.png`;


// audio context for the sound using midi notes
// I referenced the tutorial post on Thomas's blog (https://blog.science.family/240320_web_audio_api_synths)

// create a new audio context for the canvas
const audio_context = new AudioContext ()

// getting the audio context function
function init_audio() {
    if (!audio_context) {
        audio_context = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// array of notes for the sounds
const notes = [60, 67, 71, 65 ]

// declaring a mutable iterator
let i = 0

// declaring a mutable state value
let running = false

// declaring a mutable variable for 
// the period of time between notes
let period = 200

// declaring a mutable variable for
// the length of the note
let len = 0

function play_note (note, length) {

    // if the audio context is not running, resume it
    if (audio_context.state != 'running') init_audio ()

    // create an oscillator
    const osc = audio_context.createOscillator ()

    // make it a triangle wave this time
    osc.type = 'triangle'

    // set the value using the equation 
    // for midi note to Hz
    osc.frequency.value = 440 * 2 ** ((note - 69) / 12)

    // create an amp node
    const amp = audio_context.createGain ()

    // connect the oscillator 
    // to the amp
    // to the audio out
    osc.connect (amp).connect (audio_context.destination)

    // the .currentTime property of the audio context
    // contains a time value in seconds
    const now = audio_context.currentTime

    // make a gain envelope
    // start at 0
    amp.gain.setValueAtTime (0, now)

    // take 0.02 seconds to go to 0.4, linearly
    amp.gain.linearRampToValueAtTime (0.4, now + 0.02)

    // this method does not like going to all the way to 0
    // so take length seconds to go to 0.0001, exponentially
    amp.gain.exponentialRampToValueAtTime (0.0001, now + length)

    // start the oscillator now
    osc.start (now)

    // stop the oscillator 1 second from now
    osc.stop  (now + length)
}

// declaring a function that plays the next note
function next_note () {

    // use the iterator to select a note from 
    // the notes array and pass it to the 
    // play_note function along with the 
    // len variable to specify the length of the note
    play_note (notes[i], len)

    // iterate the iterator
    i++

    // if i gets too big
    // cycle back to 0
    i %= notes.length
}

// this is a recursive function
function note_player () {

    // play the next note
    next_note ()

    // if running is true
    // it uses setTimeout to call itself 
    // after period milliseconds
    if (running) setTimeout (note_player, period)
}

// this function handles the mouse event
// when the cursor enters the canvas
cnv.onpointerenter = e => {

    // set running to true
    running = true;

    // initiate the recurseive note_player function
    note_player ()
}

// this function handles the mouse event
// when the cursor moves over the canvas
cnv.onpointermove = e => {

    // as the cursor goes from left to right
    // len gos from 0 to 5
    len = 2 * e.offsetX / cnv.width

    // as the cursor goes from bottom to top
    // period goes from 420 to 20 (milliseconds)
    period = 20 + ((e.offsetY / cnv.height) ** 2) * 40
}

// this function handles the mouse event
// when the cursor leaves the canvas
cnv.onpointerleave = e => {

    // set running to false
    running = false
}

// function that handles the mouse event 
// when cursor enters the canvas
// it will call the sortPixels function from the sorter
cnv.addEventListener('mousemove', (e) => {
  sorter.sortPixels(e);
});


