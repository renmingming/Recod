const canvas = document.getElementById('canvas');
const canvasLeft = canvas.getBoundingClientRect().left,
  canvasTop = canvas.getBoundingClientRect().top,
  ctx = canvas.getContext('2d');
let mouseStart = new Map([
    ['x', null],
    ['y', null]
  ]),
  diagramArray = [], // 路径数组
  draggingDiagram = null; // 记录正在


class Diagram {
  constructor(centerX, centerY, radius, angle, text) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.angle = angle;
    this.text = text;
  }

  createPath() {
    drawDiagramPath(this.centerX, this.centerY, this.radius, ctx, this.angle, this.text);
  }
}

canvas.onmousedown = function (e) {
  const pos = positionInCanvas(e, canvasLeft, canvasTop);
  mouseStart.set('x', pos.x);
  mouseStart.set('y', pos.y);
  for (let diagram of diagramArray) {
    diagram.createPath();
    const xStart = mouseStart.get('x'),
      yStart = mouseStart.get('y');
    if (ctx.isPointInPath(xStart, yStart)) {
      console.log(diagram);
      draggingDiagram = diagram;
      return;
    }
  }
}

canvas.onmousemove = function (e) {
  const xStart = mouseStart.get('x'),
    yStart = mouseStart.get('y');
  if (draggingDiagram !== null) {
    const pos = positionInCanvas(e, canvasLeft, canvasTop),
      diff = new Map([
        ['offsetX', pos.x - xStart],
        ['offsetY', pos.y - yStart]
      ]);
    let tempCenterX = draggingDiagram.centerX,
      tempCenterY = draggingDiagram.centerY;
    draggingDiagram.centerX += diff.get('offsetX');
    draggingDiagram.centerY += diff.get('offsetY');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let diagram of diagramArray) {
      drawDiagramPath(diagram.centerX, diagram.centerY, diagram.radius, ctx, diagram.angle, diagram.text)
    }
    draggingDiagram.centerX = tempCenterX;
    draggingDiagram.centerY = tempCenterY;
  }
}

canvas.onmouseup = function (e) {
  if (draggingDiagram !== null) {
    const pos = positionInCanvas(e, canvasLeft, canvasTop),
      offsetMap = new Map([
        ['offsetX', pos.x - mouseStart.get('x')],
        ['offsetY', pos.y - mouseStart.get('y')]
      ]);
    draggingDiagram.centerX += offsetMap.get('offsetX');
    draggingDiagram.centerY += offsetMap.get('offsetY');
    draggingDiagram = null;
  }
}

function positionInCanvas(e, canvasLeft, canvasTop) {
  return {
    x: e.clientX - canvasLeft,
    y: e.clientY - canvasTop
  }
}

let rectWidth = 80,
  rectHeight = 28,
  canvasCenterX = document.getElementById('canvas').clientWidth / 2,
  canvasCenterY = document.getElementById('canvas').clientHeight / 2;
init();
function init() {
  const unitAngle = Math.PI * 2 / 40;
  let angle = -0.3, // 初始角度
    radius = canvasCenterY * 0.66;
  for (let i = 0; i <= 50; i++) {
    radius += 3;
    let diagram = new Diagram(canvasCenterX, canvasCenterY, radius, angle,  i + '测试消息');
    diagramArray.push(diagram);
    drawDiagramPath(canvasCenterX, canvasCenterY, radius, ctx, angle,  i + '测试消息');
    angle += unitAngle;
  }
}

function drawDiagramPath(centerX, centerY, radius, ctx, angle, text = 1) {
  ctx.beginPath();
  let xLength = radius * Math.cos(angle);
  let yLength = radius * Math.sin(angle);
  let lineEndX = centerX + xLength + rectHeight / 2;
  let lineEndY = centerY - yLength;
  ctx.moveTo(canvasCenterX, canvasCenterY);
  ctx.lineTo(lineEndX, lineEndY);
  ctx.strokeStyle = '#dfdfdf';
  ctx.stroke();

  drawRoundedRect('#dfdfdf', '#dfdfdf', centerX + xLength, centerY - yLength - rectHeight / 2, rectWidth, rectHeight, 4);

  // 求两点中心点坐标
  let lineCenterX = (lineEndX - canvasCenterX) / 2 + canvasCenterX;
  let lineCenterY = (lineEndY - canvasCenterY) / 2 + canvasCenterY;
  ctx.arc(lineCenterX, lineCenterY, 10, 0,Math.PI*2);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = 'red';
  ctx.font = `14px ${rectHeight}px`;
  ctx.fillText(text, centerX + xLength + rectWidth / 2, centerY - yLength);
  ctx.closePath();
}

function roundedRect(x,y,width,height,radius){
  if(width <= 0 || height <= 0){
    ctx.arc(x,y,radius,0,Math.PI*2);
    return;
  }

  ctx.moveTo(x+radius,y);
  ctx.arcTo(x+width,y,x+width,y+height,radius);
  ctx.arcTo(x+width,y+height,x,y+height,radius);
  ctx.arcTo(x,y+height,x,y,radius);
  ctx.arcTo(x,y,x+radius,y,radius);
}

function drawRoundedRect(strokeStyle,fillStyle,x,y,width,height,radius){
  ctx.beginPath();
  roundedRect(x,y,width,height,radius);
  ctx.strokeStyle = strokeStyle;
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.stroke();
}