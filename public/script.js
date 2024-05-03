document.body.style.margin   = 0
document.body.style.overflow = `hidden`

import { PixelSorter } from "sort_pixels.js"

const cnv = document.getElementById (`cnv_element`)
cnv.width = 800;
cnv.height = (cnv.width * 9) / 16;


const ctx = cnv.getContext(`2d`);

const sorter = new PixelSorter(ctx);


  const img = new Image();
  img.onload = () => {
    cnv.height = cnv.width * (img.height / img.width);
    ctx.drawImage(img, 0, 0, cnv.width, cnv.height);
    window.imageData = ctx.getImageData (0, 0, cnv.width, cnv.height);

  };

img.src = `me.jpg`;

// function randNumber (min,max){
//   return Math.random() * (max - min +1) + min;
// }



// function sortPixels(e) {
//   const pixels = imageData.data;
  
//   let areaX = e.clientX; // Current mouse X position
//   let areaY = e.clientY; // Current mouse Y position
//   let areaWidth = randNumber (20,50); // Width of the area
//   let areaHeight = randNumber (100,200); // Height of the area
   
//   // Calculate the start and end indices for x and y
//   let startX = areaX;
//   let startY = areaY - 200;
//   let endX = areaX + areaWidth;
//   let endY = areaY + areaHeight;

//   for (let y = startY; y < endY; y++){
//     for (let x = startX ; x < endX; x++){
//      const index = (y * cnv.width + x) * 4;
//      const brightness = pixels[index] + pixels[index + 1] + pixels[index + 2];

// // Get the brightness of the pixel below
//  if (y + 1 < endY) {
//   const indexBelow = ((y + 1) * cnv.width + x) * 4 ;
//   const brightnessBelow = pixels[indexBelow] + pixels[indexBelow + 1] + pixels[indexBelow + 2];

//   if (brightness < brightnessBelow) {
//       for (let i = 0; i < 3; i++) {
//       const temp = pixels[index + i];
//       pixels[index + i] = pixels[indexBelow + i];
//       pixels[indexBelow + i] = temp;
//         }
//       }
//     }
//   }
// }
//  ctx.putImageData(imageData, 0, 0);
// }

cnv.addEventListener('mousemove', sortPixels);

