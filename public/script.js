document.body.style.margin   = 0
document.body.style.overflow = `hidden`

// calling the canvas from index file using Id name
const cnv = document.getElementById (`cnv_element`);

// setting the size of the canvas
cnv.width = 800;
cnv.height = (cnv.width * 9) / 16;

// 
const ctx = cnv.getContext(`2d`);

// calling the pixelsorter class in
const sorter = new PixelSorter(cnv,ctx);

// 
const img = new Image();

// 
img.onload = () => {

  // 
  cnv.height = cnv.width * (img.height / img.width);

  // 
  ctx.drawImage(img, 0, 0, cnv.width, cnv.height);

  // 
  window.imageData = ctx.getImageData (0, 0, cnv.width, cnv.height);

  // 
  sorter.init();
  };

// 
img.src = `me.jpg`;





const audio_context = new AudioContext ()

function init_audio() {
    if (!audio_context) {
        audio_context = new (window.AudioContext || window.webkitAudioContext)();
    }

// I put this in as a test, not planning to use all of this code.
// array of notes for the sounds
const notes = [ 62, 66, 69, 73, 74, 73, 69, 66 ]

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
    running = true

    // initiate the recurseive note_player function
    note_player ()
}

// this function handles the mouse event
// when the cursor moves over the canvas
cnv.onpointermove = e => {

    // as the cursor goes from left to right
    // len gos from 0 to 5
    len = 5 * e.offsetX / cnv.width

    // as the cursor goes from bottom to top
    // period goes from 420 to 20 (milliseconds)
    period = 20 + ((e.offsetY / cnv.height) ** 2) * 400
}

// this function handles the mouse event
// when the cursor leaves the canvas
cnv.onpointerleave = e => {

    // set running to false
    running = false
}

cnv.addEventListener('mousemove', (e) => {
  sorter.sortPixels(e);
});


