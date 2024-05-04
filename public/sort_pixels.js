// heavily referencing Happy Coding's tutorial (https://happycoding.io/tutorials/p5js/images/pixel-sorter)
// I changed it from p5.js code to Canvas API code 
// with the help of this Youtube tutorial (https://youtu.be/q2YHo_9Ilyk?si=_BACJsUMLdC3k712) and Phind.


// creating the class for pixel sorter function
// in this way, it is much tidier for the script.js file
class PixelSorter{

    // giving the function the variale of canvas and context
  constructor(cnv,ctx){
    this.cnv = cnv;
    this.ctx = ctx;
    }

// creating a function for random number 
// so that it can be use for the random sizing of the sorter
// this function is run by choosing a random number in the list I will provide
randNumber (min,max){
  return Math.random() * (max - min +1) + min;
}

// calling the width and height of the sorter so that it can be called
// in the script.js file later
init () {
  this.width = this.ctx.canvas.width
  this.height = this.ctx.canvas.height
    }

// defining the function for sorting the pixels
// the variable is event (e) which will read the position of the mouse/pointer
// so that when you move the mouse, the sorter will follow your mouse
sortPixels(e) {
  
  // getting the rbga data of the imageData 
  const pixels = imageData.data;
    
    let areaX = e.clientX; // current mouse X position
    let areaY = e.clientY; // current mouse Y position
    let areaWidth = this.randNumber (20,50); // width of the area
    let areaHeight = this.randNumber (100,200); // height of the area
     
    // calculate the start and end indices for x and y
    let startX = areaX; // sorter created from this mouse X position
    let startY = areaY - 200; // sorter created from this mouse Y position
    let endX = areaX + areaWidth; // the width of the sorter
    let endY = areaY + areaHeight; // the height of the sorter
  
    // creating a for loop that read the rgba data of the image
    // starting from the first pixel down to the second pixel 
    // until it reaches the end of the height 
    // then move on to the second row and doing the same process
    for (let y = startY; y < endY; y++){
      for (let x = startX ; x < endX; x++){

        // getting the index of the first pixel
        // it is multiply by 4 because there is 4 variable (r, g, b, a)
        const index = (y * this.cnv.width + x) * 4;

        // getting the rgb data of the pixel
        // the index is how the computer read the data
        // with imageData.data[0] being the red(r) data of the first pixel
        // imageData.data[1] is green, imageData.data[2] is blue, and imageData.data[3] is alpha and so on
        // (however, we don't take the alpha value for this function)
        const brightness = pixels[index] + pixels[index + 1] + pixels[index + 2];
  
  // get the brightness of the pixel below
  // adding 1 to the y-axis moves the position of y down a line below
  // the (y + 1 < endY) making sure the sorter doens't go out of the image
    if (y + 1 < endY) {

    // getting the index of the second pixel
      const indexBelow = ((y + 1) * this.cnv.width + x) * 4 ;

    // getting the rbg data of the second pixel
      const brightnessBelow = pixels[indexBelow] + pixels[indexBelow + 1] + pixels[indexBelow + 2];
  
    // if the rgb value of the first pixel is less than the rgb value of the second pixel
      if (brightness < brightnessBelow) {

          for (let i = 0; i < 3; i++) {

          // exchanging the position of the pixels
          // the higher value pixel will go down one y value
          const temp = pixels[index + i];
          pixels[index + i] = pixels[indexBelow + i];
          pixels[indexBelow + i] = temp;
          }
        }
      }
    }
  }

  // drawing the image data
   this.ctx.putImageData(imageData, 0, 0);
  }
}