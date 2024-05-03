class PixelSorter{
    constructor(cnv,ctx){
        this.cnv = cnv;
        this.ctx = ctx;
        // this.imageData = this.cnv.createImageData(this.cnv.width, this.cnv.height);
    }

randNumber (min,max){
  return Math.random() * (max - min +1) + min;
}
init () {
       this.width = this.ctx.canvas.width
       this.height = this.ctx.canvas.height
       this.img_data = this.ctx.getImageData (0, 0, this.width, this.height).data
    }

sortPixels(e) {
    const pixels = imageData.data;
    
    let areaX = e.clientX; // Current mouse X position
    let areaY = e.clientY; // Current mouse Y position
    let areaWidth = this.randNumber (20,50); // Width of the area
    let areaHeight = this.randNumber (100,200); // Height of the area
     
    // Calculate the start and end indices for x and y
    let startX = areaX;
    let startY = areaY - 200;
    let endX = areaX + areaWidth;
    let endY = areaY + areaHeight;
  
    for (let y = startY; y < endY; y++){
      for (let x = startX ; x < endX; x++){
       const index = (y * this.cnv.width + x) * 4;
       const brightness = pixels[index] + pixels[index + 1] + pixels[index + 2];
  
  // Get the brightness of the pixel below
   if (y + 1 < endY) {
    const indexBelow = ((y + 1) * this.cnv.width + x) * 4 ;
    const brightnessBelow = pixels[indexBelow] + pixels[indexBelow + 1] + pixels[indexBelow + 2];
  
    if (brightness < brightnessBelow) {
        for (let i = 0; i < 3; i++) {
        const temp = pixels[index + i];
        pixels[index + i] = pixels[indexBelow + i];
        pixels[indexBelow + i] = temp;
          }
        }
      }
    }
  }
   this.ctx.putImageData(imageData, 0, 0);
  }

}