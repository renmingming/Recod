
(function() {
  const defaultConfig = {
    width: 700,
    height: 500,
    elId: 'canvas',
    elTip: '',
    rectWidth: 60,
    rectHeight: 28,
    textColor: '#fff',
    textFontSize: '12',
    activeTextColor: '#fff',
    bgColor: '#acb0bd',
    activeBgColor: '#f39800',
    radius: 2.5, // 值越小，距离中心点越近
    number: 30, // 一圈多少个，决定角度
    ajaxUrl: 'http://47.103.121.177/Knowledge/Search?keywords=',
    centerHeight: 30,
    centerWidth: 90,
    boxshowWidth: 8,
    offsetX: 0,
    offsetY: 0,
    boxshowColor: 'rgba(243,152,0, 0.6)',
    clickCallback: function() {

    }
  };

  function createCanvas(params) {
    this.config = _getConfig(params);
    this.canvas = document.getElementById(this.config.elId);
    this.canvasLeft = this.canvas.getBoundingClientRect().left;
    this.canvasTop = this.canvas.getBoundingClientRect().top;
    this.ctx = this.canvas.getContext('2d');
    let devicePixelRatio = window.devicePixelRatio || 1
    let backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
    this.ctx.mozBackingStorePixelRatio ||
    this.ctx.msBackingStorePixelRatio ||
    this.ctx.oBackingStorePixelRatio ||
        this.ctx.backingStorePixelRatio || 1
    let ratio = devicePixelRatio / backingStoreRatio;
    if (this.config.width > 400) {
      ratio = 1;
    }
    this.canvas.width = this.config.width * ratio;
    this.canvas.height = this.config.height * ratio;
    this.mouseStart = new Map([
      ['x', null],
      ['y', null]
    ]);
    this.elTip = this.config.elTip;
    this.textColor = this.config.textColor;
    this.textFontSize = this.config.textFontSize * ratio;
    this.rectRadius = this.config.rectRadius * ratio;
    this.bgColor = this.config.bgColor;
    this.activeTextColor = this.config.activeTextColor;
    this.activeBgColor = this.config.activeBgColor;
    this.centerTitleText = '';
    this.diagramArray = []; // 路径数组
    this.draggingDiagram = null; // 记录正在
    this.rectWidth = this.config.rectWidth * ratio;
    this.rectHeight = this.config.rectHeight * ratio;
    this.radius = this.config.radius * ratio;
    this.touchtime = new Date().getTime();
    this.canvasCenterX = this.canvas.clientWidth / 2;
    this.canvasCenterY = this.canvas.clientHeight / 2;
    this.ajaxUrl = this.config.ajaxUrl;
    this.clickCallback = this.config.clickCallback;
    this.number = this.config.number;
    this.centerWidth = this.config.centerWidth * ratio;
    this.centerHeight = this.config.centerHeight * ratio;
    this.boxshowWidth = this.config.boxshowWidth;
    this.boxshowColor = this.config.boxshowColor;
    this.offsetX = this.config.offsetX;
    this.offsetY = this.config.offsetY;
    this.ratio = ratio;
    this.ctx.scale(1/ ratio, 1/ ratio);
    this.ctx.translate(this.offsetX, this.offsetY);
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

    this.canvas.ontouchstart = function (e) {
      downHandler(e.changedTouches[0]);
    }

    this.canvas.onmousedown = function (e) {
      downHandler(e);
    }

    function downHandler(e) {
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
      moveHanlde(e);
    }

    this.canvas.ontouchmove = function(e) {
      moveHanlde(e.changedTouches[0]);
    }

    function moveHanlde(e) {
      document.querySelector('body').style.cursor = '';
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
              document.querySelector('body').style.cursor = 'pointer';
            } else {
              diagram.textColor = _this.textColor;
              diagram.bgColor = _this.bgColor;
            }
            _this.draggingDiagram.createPath();
            // drawDiagramPath(diagram.centerX, diagram.centerY, diagram.radius, ctx, diagram.angle, diagram.text, diagram.typeVal, '#fff', 'green')
          }
          _this.draggingDiagram.centerX = tempCenterX;
          _this.draggingDiagram.centerY = tempCenterY;
          _this.centerTitle();
        } else {
          let pos = positionInCanvas(e, _this.canvasLeft, _this.canvasTop);
          _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
          if (_this.elTip) {
            document.querySelector(_this.elTip).setAttribute('style', `display:none;`)
          }
          for (let diagram of _this.diagramArray) {
            diagram.createPath();
            if (_this.ctx.isPointInPath(pos.x, pos.y)) {
              diagram.textColor = _this.activeTextColor;
              diagram.bgColor = _this.activeBgColor;
              document.querySelector('body').style.cursor = 'pointer';
              if (_this.elTip) {
                document.querySelector(_this.elTip).setAttribute('style', `display:block;left:${pos.x + 10}px;top:${pos.y + 10}px;position:absolute;`)
                document.querySelector(_this.elTip).innerHTML = diagram.text;
              }
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
      endHanlder(e);
    }

    this.canvas.ontouchend = function(e) {
      endHanlder(e.changedTouches[0]);
    }

    function endHanlder(e) {
      if (_this.draggingDiagram) {
        let pos = positionInCanvas(e, _this.canvasLeft, _this.canvasTop),
          offsetMap = new Map([
            ['offsetX', pos.x - _this.mouseStart.get('x')],
            ['offsetY', pos.y - _this.mouseStart.get('y')]
          ]);
        _this.draggingDiagram.centerX += offsetMap.get('offsetX');
        _this.draggingDiagram.centerY += offsetMap.get('offsetY');
        _this.draggingDiagram.createPath();
        _this.draggingDiagram.textColor = _this.textColor;
        _this.draggingDiagram.bgColor = _this.bgColor;
        let diagramArray = _this.diagramArray;
        for(let i = 0; i < diagramArray.length; i++) {
          if (_this.draggingDiagram.text == diagramArray[i].text) {
            diagramArray.slice(i, 1);
            diagramArray.push(diagramArray[i]);
            _this.diagramArray = diagramArray;
            _this.draggingDiagram = null;
            return;
          }
        }
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
    let centerNum = this.canvasCenterX < this.canvasCenterY ? this.canvasCenterX : this.canvasCenterY;
    let angle = -0.4, // 初始角度
      radius = centerNum * 0.66;
    for (let i = 0; i < res.length; i++) {
      radius += this.radius;
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
    let rectWidth = this.rectWidth;
    let textLen = text.length;
    let textWidth = (textLen + 2) * this.textFontSize;
    let addX = (rectWidth - textLen * this.textFontSize) / 2;
    let textArr = [];
    let lineNum = 1;
    if (textWidth > rectWidth) {
      let rowLen = Math.ceil(rectWidth / this.textFontSize) - 2;
      lineNum = Math.ceil(textLen / rowLen);
      addX = (rectWidth - rowLen * this.textFontSize) / 2;
      for (let i = 0; i < lineNum && lineNum > 1; i++) {
        textArr.push(text.substr(i * rowLen, rowLen));
      }
    }
    let lineEndX = centerX + xLength + addX;
    let lineEndY = centerY - yLength;
    // 求两点中心点坐标
    let lineCenterX = (lineEndX - this.canvasCenterX) / 2 + this.canvasCenterX;
    let lineCenterY = (lineEndY - this.canvasCenterY) / 2 + this.canvasCenterY;
    let ratio = this.ratio;
    let arc_width = 10 * ratio;
    ctx.beginPath();
    ctx.moveTo(this.canvasCenterX, this.canvasCenterY);
    ctx.lineTo(lineEndX, lineEndY);
    ctx.strokeStyle = bgColor;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(lineCenterX, lineCenterY, arc_width, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.fillStyle = bgColor;
    ctx.font = `${10 * ratio}px sans-serif`;
    ctx.fillText(typeVal, lineCenterX, lineCenterY + 3 * ratio);
    let rectHeight = this.rectHeight * 1;
    // let rectHeight = this.rectHeight * lineNum;
    drawRoundedRect('#fff', bgColor, centerX + xLength, centerY - yLength - rectHeight / 2, this.rectWidth, rectHeight, 13, ctx);

    ctx.textAlign = 'left';
    ctx.fillStyle = textColor;
    ctx.font = `${this.textFontSize}px sans-serif`;
    if (textArr.length > 0) {
      for (let i = 0; i < textArr.length; i++) {
        // ctx.fillText(textArr[i], centerX + xLength + addX, centerY - yLength - 4 + i * 16);
        ctx.fillText(textArr[i], centerX + xLength + addX, centerY - yLength + 4 * ratio);
        return;
      }
    } else {
      ctx.fillText(text, centerX + xLength + addX, centerY - yLength + 4 * ratio);
    }
  }

  createCanvas.prototype.centerTitle = function() {
    let centerW = this.centerWidth;
    let centerH = this.centerHeight;
    let boxshowWidth = this.boxshowWidth;
    let ratio = this.ratio;
    let text = this.centerTitleText;
    let textLen = text.length;
    let textFontSize = 14 * ratio;
    let textWidth = (textLen + 2) * textFontSize;
    let lineNum = 1;
    let textArr = [];
    if (textWidth > centerW) {
      let rowLen = Math.ceil(centerW / textFontSize) - 2;
      lineNum = Math.ceil(textLen / rowLen);
      for (let i = 0; i < lineNum && lineNum > 1; i++) {
        textArr.push(text.substr(i * rowLen, rowLen));
      }
      text = textArr[0];
    }
    drawRoundedRect(this.boxshowColor, this.boxshowColor, this.canvasCenterX - (centerW + boxshowWidth) / 2, this.canvasCenterY - (centerH + boxshowWidth) / 2, centerW + boxshowWidth, centerH + boxshowWidth, 14, this.ctx);

    drawRoundedRect(this.activeBgColor, this.activeBgColor, this.canvasCenterX - centerW / 2, this.canvasCenterY - centerH / 2, centerW, centerH, 14, this.ctx);
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = '#fff';
    this.ctx.font = `bold ${14 * ratio}px sans-serif`;
    this.ctx.fillText(text, this.canvasCenterX, this.canvasCenterY + (10 * ratio / 2));
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
