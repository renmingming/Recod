
(function() {
  const defaultConfig = {
    elId: 'canvas',
    rectWidth: 80,
    rectHeight: 28,
    textColor: '#fff',
    activeTextColor: '#fff',
    bgColor: '#acb0bd',
    activeBgColor: '#f39800',
    number: 35, // 一圈多少个，决定角度
    ajaxUrl: 'http://47.103.121.177/Knowledge/Search?keywords=',
    clickCallback: function() {

    }
  };
  function createCanvas(params) {
    this.config = _getConfig(params);
    this.canvas = document.getElementById(this.config.elId);
    this.canvasLeft = this.canvas.getBoundingClientRect().left;
    this.canvasTop = this.canvas.getBoundingClientRect().top;
    this.ctx = this.canvas.getContext('2d');
    this.mouseStart = new Map([
      ['x', null],
      ['y', null]
    ]);
    this.textColor = this.config.textColor;
    this.bgColor = this.config.bgColor;
    this.activeTextColor = this.config.activeTextColor;
    this.activeBgColor = this.config.activeBgColor;
    this.centerTitleText = '';
    this.diagramArray = []; // 路径数组
    this.draggingDiagram = null; // 记录正在
    this.rectWidth = this.config.rectWidth;
    this.rectHeight = this.config.rectHeight;
    this.touchtime = new Date().getTime();
    this.canvasCenterX = this.canvas.clientWidth / 2;
    this.canvasCenterY = this.canvas.clientHeight / 2;
    this.ajaxUrl = this.config.ajaxUrl;
    this.clickCallback = this.config.clickCallback;
    this.number = this.config.number;
    let _this = this;
    this.canvas.onclick = (e) => {
      if (new Date().getTime() - _this.touchtime > 500) {
        _this.touchtime = new Date().getTime();
        return;
      }
      const pos = positionInCanvas(e, _this.canvasLeft, _this.canvasTop);
      _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
      for (let diagram of _this.diagramArray) {
        diagram.createPath();
        if (_this.ctx.isPointInPath(pos.x, pos.y)) {
          let keyword = diagram.text;
          _this.diagramArray = [];
          _this.updateData(keyword);
          _this.clickCallback(diagram)
        }
      }
    }

    this.canvas.onmousedown = function (e) {
      const pos = positionInCanvas(e, _this.canvasLeft, _this.canvasTop);
      _this.mouseStart.set('x', pos.x);
      _this.mouseStart.set('y', pos.y);
      _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
      for (let diagram of _this.diagramArray) {
        diagram.createPath();
        const xStart = _this.mouseStart.get('x'),
          yStart = _this.mouseStart.get('y');
        if (_this.ctx.isPointInPath(xStart, yStart)) {
          diagram.textColor = _this.activeTextColor;
          diagram.bgColor = _this.activeBgColor;
          _this.draggingDiagram = diagram;
        }
      }
      _this.centerTitle();
    }

    this.canvas.onmousemove = function (e) {
      debounce(function () {
        const xStart = _this.mouseStart.get('x'),
          yStart = _this.mouseStart.get('y');
        if (_this.draggingDiagram !== null) {
          let pos = positionInCanvas(e, _this.canvasLeft, _this.canvasTop),
            diff = new Map([
              ['offsetX', pos.x - xStart],
              ['offsetY', pos.y - yStart]
            ]);
          let tempCenterX = _this.draggingDiagram.centerX,
            tempCenterY = _this.draggingDiagram.centerY;
          _this.draggingDiagram.centerX += diff.get('offsetX');
          _this.draggingDiagram.centerY += diff.get('offsetY');
          _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
          for (let diagram of _this.diagramArray) {
            diagram.createPath();
            if (_this.ctx.isPointInPath(pos.x, pos.y)) {
              diagram.textColor = _this.activeTextColor;
              diagram.bgColor = _this.activeBgColor;
            } else {
              diagram.textColor = _this.textColor;
              diagram.bgColor = _this.bgColor;
            }
            // drawDiagramPath(diagram.centerX, diagram.centerY, diagram.radius, ctx, diagram.angle, diagram.text, diagram.typeVal, '#fff', 'green')
          }
          _this.draggingDiagram.centerX = tempCenterX;
          _this.draggingDiagram.centerY = tempCenterY;
          _this.centerTitle();
        } else {
          let pos = positionInCanvas(e, _this.canvasLeft, _this.canvasTop);
          _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
          for (let diagram of _this.diagramArray) {
            diagram.createPath();
            if (_this.ctx.isPointInPath(pos.x, pos.y)) {
              diagram.textColor = _this.activeTextColor;
              diagram.bgColor = _this.activeBgColor;
            } else {
              diagram.textColor = _this.textColor;
              diagram.bgColor = _this.bgColor;
            }
          }
          _this.centerTitle();
        }
      }, 100)()
    }

    this.canvas.onmouseup = function (e) {
      if (_this.draggingDiagram) {
        let pos = positionInCanvas(e, _this.canvasLeft, _this.canvasTop),
          offsetMap = new Map([
            ['offsetX', pos.x - _this.mouseStart.get('x')],
            ['offsetY', pos.y - _this.mouseStart.get('y')]
          ]);
        _this.draggingDiagram.centerX += offsetMap.get('offsetX');
        _this.draggingDiagram.centerY += offsetMap.get('offsetY');
        _this.draggingDiagram.textColor = _this.textColor;
        _this.draggingDiagram.bgColor = _this.bgColor;
        _this.draggingDiagram = null;
      }
    }
  }

  function _getConfig(config) {
    return {
      ...defaultConfig,
      ...config
    }
  }

// updateData('李健军');

  function positionInCanvas(e, canvasLeft, canvasTop) {
    return {
      x: e.clientX - canvasLeft,
      y: e.clientY - canvasTop
    }
  }

  createCanvas.prototype.updateData = function(keyword) {
    let _this = this;
    this.centerTitleText = keyword;
    $.get(this.ajaxUrl + keyword, function (res) {
      _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
      _this.init(res);
    })
  }
  createCanvas.prototype.init = function(res) {
    let num = this.number;
    let unitAngle = Math.PI * 2 / num;
    let angle = -0.4, // 初始角度
      radius = this.canvasCenterY * 0.66;
    for (let i = 0; i < res.length; i++) {
      radius += 2.5;
      if (i >= 7) {
        unitAngle = Math.PI * 2 / (num * 0.857);
      }
      if (i >= 9) {
        unitAngle = Math.PI * 2 / (num * 0.57);
      }
      if (i >= 11) {
        unitAngle = Math.PI * 2 / (num * 0.857);
      }
      if (i > 14) {
        unitAngle = Math.PI * 2 / (num * 1.085);
      }
      let name = '',
        value = '';
      if (res[i]) {
        name = res[i].name,
          value = res[i].value;
      }
      let diagram = new Diagram(this.canvasCenterX, this.canvasCenterY, radius, angle, name, value, this.textColor, this.bgColor, this);
      this.diagramArray.push(diagram);
      this.drawDiagramPath(this.canvasCenterX, this.canvasCenterY, radius, angle, name, value, this.textColor, this.bgColor);
      angle += unitAngle;
    }
    this.centerTitle();
  }

  createCanvas.prototype.drawDiagramPath = function(centerX, centerY, radius, angle, text = 1, typeVal = 1, textColor = 'red', bgColor = '#dfdfdf') {
    let ctx = this.ctx;
    let xLength = radius * Math.cos(angle);
    let yLength = radius * Math.sin(angle);
    let addX = (this.rectWidth - text.length * 12) / 2;
    let lineEndX = centerX + xLength + addX;
    let lineEndY = centerY - yLength;
    // 求两点中心点坐标
    let lineCenterX = (lineEndX - this.canvasCenterX) / 2 + this.canvasCenterX;
    let lineCenterY = (lineEndY - this.canvasCenterY) / 2 + this.canvasCenterY;

    ctx.beginPath();
    ctx.moveTo(this.canvasCenterX, this.canvasCenterY);
    ctx.lineTo(lineEndX, lineEndY);
    ctx.strokeStyle = bgColor;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(lineCenterX, lineCenterY, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.fillStyle = bgColor;
    ctx.font = `10px/22px sans-serif`;
    ctx.fillText(typeVal, lineCenterX, lineCenterY + 3);

    drawRoundedRect('#fff', bgColor, centerX + xLength, centerY - yLength - this.rectHeight / 2, this.rectWidth, this.rectHeight, 13, ctx);


    ctx.textAlign = 'left';
    ctx.fillStyle = textColor;
    ctx.font = `12px sans-serif`;
    ctx.fillText(text, centerX + xLength + addX, centerY - yLength + 4);
  }

  createCanvas.prototype.centerTitle = function() {
    drawRoundedRect(this.activeBgColor, this.activeBgColor, this.canvasCenterX - 45, this.canvasCenterY - 15, 90, 30, 14, this.ctx);
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = '#fff';
    this.ctx.font = `bold 14px/30px sans-serif`;
    this.ctx.fillText(this.centerTitleText, this.canvasCenterX, this.canvasCenterY + 5);
  }


  class Diagram{
    constructor(centerX, centerY, radius, angle, text, typeVal, textColor, bgColor, canvasObj) {
      this.canvasObj = canvasObj;
      this.centerX = centerX;
      this.centerY = centerY;
      this.radius = radius;
      this.angle = angle;
      this.text = text;
      this.typeVal = typeVal;
      this.textColor = textColor;
      this.bgColor = bgColor;
    }

    createPath(textColor, bgColor) {
      if (!textColor) {
        textColor = this.textColor;
      }
      if (!bgColor) {
        bgColor = this.bgColor;
      }
      this.canvasObj.drawDiagramPath(this.centerX, this.centerY, this.radius, this.angle, this.text, this.typeVal, textColor, bgColor);
    }
  }

  function roundedRect(x, y, width, height, radius, ctx) {
    if (width <= 0 || height <= 0) {
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      return;
    }

    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + radius, y, radius);
  }

  function drawRoundedRect(strokeStyle, fillStyle, x, y, width, height, radius, ctx) {
    ctx.beginPath();
    roundedRect(x, y, width, height, radius, ctx);
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  function debounce(fn, delay) {
    let timer = null;
    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(fn, delay);
    }
  }
  this.createCanvas = createCanvas;
})()