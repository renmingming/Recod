const canvas = document.getElementById('my-canvas'),
  sideInput = document.getElementById('side-input'),
  dragInput = document.getElementById('dragPattern-input');
const canvasLeft = canvas.getBoundingClientRect().left,
  canvasTop = canvas.getBoundingClientRect().top,
  ctx = canvas.getContext('2d');
let sideNum = sideInput.value, // 多变行变数
  dragPattern = dragInput.checked, // 拖拽/绘制
  editIng = false, // 是否画图
  mouseStart = new Map([
    ['x', null],
    ['y', null]
  ]), // 鼠标点下位置
  polygonArray = [], // 记录多边形路径数组
  imageData = null, //
  draggingPolygon = null; // 记录正在拖拽的多边形

// 多边形路径类定义
class Polygon {
  constructor(centerX, centerY, sideNum, radius) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.sideNum = sideNum;
    this.radius = radius;
  }

  createPath() {
    drawPolygonPath(
      this.sideNum,
      this.radius,
      this.centerX,
      this.centerY,
      ctx
    )
  }
}

/**
 *
 * @param slideNum  变数
 * @param radius  半径
 * @param originX 原点坐标
 * @param originY
 * @param ctx
 */
function drawPolygonPath(slideNum, radius, originX, originY, ctx) {
  ctx.beginPath();
  const unitAngle = Math.PI * 2 / sideNum; // 单元角度
  let angle = 0, // 初始角度
    xLength, yLength;
  for (let i = 0; i < sideNum; i++) {
    xLength = radius * Math.cos(angle);
    yLength = radius * Math.sin(angle);
    ctx.lineTo(originX + xLength, originY - yLength);
    angle += unitAngle;
  }
  ctx.closePath();
}

/**
 * 获取在canvas中点击的位置
 * * @param e
 * @param canvasLeft
 * @param canvasTop
 * @returns {{x: number, y: number}}
 */
function positionInCanvas(e, canvasLeft, canvasTop) {
  console.log(e);
  return {
    x: e.clientX - canvasLeft,
    y: e.clientY - canvasTop
  }
}

/**
 * 获取两点直线距离
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns {number}
 */
function getDistance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

sideInput.oninput = function() {
  sideNum = this.value;
}

dragInput.onchange = function(){
  dragPattern = this.checked;
}

canvas.onmousedown = function(e) {
  // 鼠标按下时
  const pos = positionInCanvas(e, canvasLeft, canvasTop); // 获取在canvas中位置
  // 记录鼠标起始点
  mouseStart.set('x', pos.x);
  mouseStart.set('y', pos.y);

  if (dragPattern === false) {
    // 画图模式
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); // 记录当前图像
    editIng = true; // 开始画图
  } else {
    for (let polygon of polygonArray) {
      polygon.createPath();
      const xStart = mouseStart.get('x'),
        yStart = mouseStart.get('y');
      if (ctx.isPointInPath(xStart, yStart)) {
        draggingPolygon = polygon;
        return;
      }
    }
  }
}

canvas.onmousemove = function (e) {
  // 鼠标进入
  const xStart = mouseStart.get('x'),
    yStart = mouseStart.get('y');
  if (dragPattern === false && editIng === true) {
    // 画图模式
    // 获取位置以及计算半径
    const pos = positionInCanvas(e, canvasLeft, canvasTop),
      radius = getDistance(xStart, yStart, pos.x, pos.y);
    console.log(xStart, yStart);
    ctx.putImageData(imageData, 0, 0); // 绘制记录图像
    drawPolygonPath(sideNum, radius, xStart, yStart, ctx);
    ctx.stroke();
  } else if (draggingPolygon !== null && dragPattern === true) {
    const pos = positionInCanvas(e, canvasLeft, canvasTop),
      diff = new Map([
        ['offsetX', pos.x - xStart],
        ['offsetY', pos.y - yStart]
      ]);

    let tempCenterX = draggingPolygon.centerX,
      tempCenterY = draggingPolygon.centerY;
    draggingPolygon.centerX += diff.get('offsetX');
    draggingPolygon.centerY += diff.get('offsetY');
    console.log(draggingPolygon);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let polygon of polygonArray) {
      drawPolygonPath(polygon.sideNum, polygon.radius, polygon.centerX, polygon.centerY, ctx);
      ctx.stroke();
    }

    // 继续基于点击时的位置拖动，计算
    draggingPolygon.centerX = tempCenterX;
    draggingPolygon.centerY = tempCenterY;
    console.log(draggingPolygon);
  }
}

canvas.onmouseup = function (e) {
  if (dragPattern == false && editIng === true) {
    const pos = positionInCanvas(e, canvasLeft, canvasTop),
      xStart = mouseStart.get('x'),
      yStart = mouseStart.get('y'),
      radius = getDistance(xStart, yStart, pos.x, pos.y);
    const polygon = new Polygon(xStart, yStart, sideNum, radius);
    polygonArray.push(polygon); // 记录路径对象
    editIng = false;
  } else if (draggingPolygon !== null) {
    const pos = positionInCanvas(e, canvasLeft, canvasTop),
      offsetMap = new Map([
        ['offsetX', pos.x - mouseStart.get('x')],
        ['offsetY', pos.y - mouseStart.get('y')]
      ]);
    draggingPolygon.centerX += offsetMap.get('offsetX');
    draggingPolygon.centerY += offsetMap.get('offsetY');
    draggingPolygon = null;
  }
}
