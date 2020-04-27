
(function(global){
  const defaultConfig = {
    title: '标题',
    content: '内容区域',
    type: 'alert-default', // 弹窗类型
    delayTime: 400, // 效果过渡时间
    autoClose: false, // 自动关闭
    autoTime: 2000, // 默认2s关闭
    ok: '确定',
    okCallback: () => {
    },
    cancel: '取消',
    cancelCallback: () => {
    },
    close: () => {
    }
  };

class Modal {
  constructor(config) {
    this._config = this._getConfig(config);
  }

  open() {
    this.generateHtml();
    this._element.classList.add('modal-show');
  }

  close() {
    this._config.close();
    this._element.remove();
    this.destroy();
  }

  cancel() {
    console.log('取消');
    this._config.cancelCallback();
  }

  confirm() {
    console.log('确定');
    this._config.okCallback();
  }

  generateHtml() {
    const id = `modal-dialog-${new Date().getTime()}`;
    switch (this._config.type) {
      case "alert-default":
        this.generateDefaultDom(id);
        this.setDefaultDialogStyle();
        this.clickHandle();
        break;
      case "tip":
        this.generateTipDom(id);
        this.setTipStyle();
        this.tipHandle();
        break;
    }
  }

  generateDefaultDom(id) {
    let dom = document.createElement('div');
    dom.setAttribute('class', 'modal-dialog');
    dom.setAttribute('id', id);
    const html = `
        <div class="modal-box">
          <div class="modal-head">
            <span class="title">${this._config.title}</span>
            <span class="close">X</span>
          </div>
          <div class="modal-content">${this._config.content}</div>
          <div class="modal-foot">
            <div class="cancel btn">${this._config.cancel}</div>
            <div class="confirm btn">${this._config.ok}</div>
          </div>
        </div>
    `;
    dom.innerHTML = html;
    document.body.appendChild(dom);
    this._element = document.getElementById(id);
  }

  generateTipDom(id) {
    let dom = document.createElement('div');
    dom.setAttribute('class', 'tip-dialog-main');
    dom.setAttribute('id', id);
    const html = `<div class="tip-dialog">${this._config.content}</div>`;
    dom.innerHTML = html;
    document.body.appendChild(dom);
    this._element = document.getElementById(id);
  }

  setTipStyle() {
    const tipMainStyle = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0);z-index:20;`;
    const tipDialogStyle = `
    position:absolute;top:50%;left: 50%;transform: translate(-50%,-50%);background:rgba(0,0,0,0.8);color:#fff;
    font-size:14px;padding:4px 15px;border-radius:4px;z-index:21;
    `;
    $('.tip-dialog-main').setAttribute('style', tipMainStyle);
    $('.tip-dialog-main .tip-dialog').setAttribute('style', tipDialogStyle);
  }

  setDefaultDialogStyle() {
    const modalDialogStyle = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.3);z-index:20;`;
    const modalBoxStyle = `position:absolute;top:50%;left: 50%; padding: 20px 20px; transform: translate(-50%,-50%);min-width: 400px; border-radius:6px;background: #fff;`;
    const modalTitleStyle = `display:block;font-size: 16px; text-align:center; color:#333;`;
    const modalCloseStyle = `position: absolute; top: 20px; right: 20px; font-size: 14px; padding: 0 5px; color:#dfdfdf;`;
    const modalContentStyle = `padding: 20px 0;`;
    const modalFootStyle = `text-align:right; font-size: 0;`;
    const modalBtnStyle = `display: inline-block; padding: 5px 15px;font-size: 14px; border: 1px solid #dfdfdf; border-radius: 6px; color:#333;`;
    $('.modal-dialog').setAttribute('style', modalDialogStyle);
    $('.modal-dialog .modal-box').setAttribute('style', modalBoxStyle);
    $('.modal-dialog .title').setAttribute('style', modalTitleStyle);
    $('.modal-dialog .close').setAttribute('style', modalCloseStyle);
    $('.modal-dialog .modal-content').setAttribute('style', modalContentStyle);
    $('.modal-dialog .modal-foot').setAttribute('style', modalFootStyle);
    $('.modal-dialog .modal-foot .btn').setAttribute('style', modalBtnStyle);
  }

  tipHandle() {
    setTimeout(() => {
      this.close();
    }, this._config.autoTime);
  }

  clickHandle() {
    this._element.onclick = (e) => {
      let classNames = e.target.className.split(' ');
      if (classNames.indexOf('close') !== -1) {
        this.close();
      }
      if (classNames.indexOf('cancel') !== -1) {
        this.cancel();
      }
      if (classNames.indexOf('confirm') !== -1) {
        this.confirm();
      }
    }
  }

  _getConfig(config) {
    return {
      ...defaultConfig,
      ...config
    }
  }

  destroy() {
     delete this;
  }
}
function $(name) {
  const dom = document.querySelectorAll(name);
  if (dom.length == 1) {
    return dom[0];
  }
  return dom;
}
this.Modal = Modal;
})();