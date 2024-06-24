 const colorPicker = document.getElementById("colorPicker");
const canvas = document.getElementById("myCanvas");
const canvasColor = document.getElementById("backgroundPicker");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const fontPicker = document.getElementById("fontSize");
const ctx = canvas.getContext('2d');
const retrivedButton = document.getElementById('retriveButton');
colorPicker.addEventListener('change', (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});
canvasColor.addEventListener('change', (e)=>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,canvas.width,canvas.height);
});
fontPicker.addEventListener('change',(e)=>{
    ctx.lineWidth = e.target.value;

});
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
  if(isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
}); 
clearButton.addEventListener('click',()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
});
saveButton.addEventListener('click',()=>{
  localStorage.setItem('canvasContents', canvas.toDataURL());
  let link = document.createElement('a');
  link.download = 'canvasImage.png';
  link.href = canvas.toDataURL();
  link.click();
})
canvas.addEventListener('mouseup', (e)=>
{
    isDrawing = false;
});
retrivedButton.addEventListener('click',()=>{
    let savedCanvas = localStorage.getItem('canvasContents');
    if(savedCanvas){
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img,0,0)
    }
    
})
