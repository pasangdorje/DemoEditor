import ImageLayer from './layer/imageLayer.js';

class LayerContainer {
  layerOperators;
  constructor() {
    this.container = document.getElementById('layerBody');
  }

  setActive(index) {
    for (const layerOperator of this.layerOperators) {
      layerOperator.layerDiv.classList.remove('active');
    }
    this.layerOperators[index].layerDiv.classList.add('active');
  }

  displayLayers(layers) {
    this.container.innerHTML = '';
    this.layerOperators = [];
    this.layers = layers;
    for (let i = 0; i < layers.length; i++) {
      this.layerOperators.push(this.createLayerDiv(layers[i], i));
      if (i == 0) {
        let upImage = this.layerOperators[i].up.childNodes[0];
        upImage.src = '../images/up-arrow-disabled.png';
      }
      if (i == this.layers.length - 1) {
        let downImage = this.layerOperators[i].down.childNodes[0];
        downImage.src = '../images/down-arrow-disabled.png';
      }
    }

    this.setOnclicks();
  }

  setOnclicks() {
    for (let i = 0; i < this.layerOperators.length; i++) {
      this.layerOperators[i].up.onclick = () => {
        if (i != 0) {
          this.swapArrayElements(this.layers, i, i - 1);
          this.displayLayers(this.layers);
          this.setActive(i - 1);
        }
      };
      this.layerOperators[i].down.onclick = () => {
        if (i < this.layers.length - 1) {
          this.swapArrayElements(this.layers, i, i + 1);
          this.displayLayers(this.layers);
          this.setActive(i + 1);
        }
      };
      this.layerOperators[i].del.onclick = () => {
        this.layers[i].removeLayer();
        this.layers.splice(i, 1);
        this.displayLayers(this.layers);
        this.removeControlBox();
      };
      this.layerOperators[i].thumbnail.onclick = () => {
        this.layers[i].element.click();
      };
    }
  }

  swapArrayElements(arr, indexA, indexB) {
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
  }

  createLayerDiv(layer, i) {
    const operator = {};
    let layerDiv = (operator.layerDiv = this.docCreateElement('div', 'layer'));
    let upDownBtnsDiv = this.docCreateElement('div', 'up-down-btns');
    let upBtn = (operator.up = this.docCreateElement('button', 'up-btn'));
    let downBtn = (operator.down = this.docCreateElement('button', 'down-btn'));
    let deleteBtn = (operator.del = this.docCreateElement('button', 'delete-btn'));
    let layerthumbnails = (operator.thumbnail = this.docCreateElement('div', 'layer-thumbnails'));

    let upBtnImg = new Image();
    upBtnImg.src = 'images/up-arrow.png';
    let downBtnImg = new Image();
    downBtnImg.src = 'images/down-arrow.png';
    upBtn.appendChild(upBtnImg);
    downBtn.appendChild(downBtnImg);
    upDownBtnsDiv.appendChild(upBtn);
    upDownBtnsDiv.appendChild(downBtn);
    layerDiv.appendChild(upDownBtnsDiv);
    let thumbnailImg = new Image();
    thumbnailImg.src = layer.element.toDataURL();
    layerthumbnails.appendChild(thumbnailImg);
    layerDiv.appendChild(layerthumbnails);
    let layerInfo = this.docCreateElement('div', 'layer-info');
    layerInfo.innerHTML = `Layer ${i + 1}<br>${layer instanceof ImageLayer ? 'Image' : 'Text'}`;
    layerDiv.appendChild(layerInfo);
    layerDiv.appendChild(deleteBtn);
    let deleteBtnImg = document.createElement('img');
    deleteBtnImg.src = 'images/delete-icon.png';
    deleteBtn.appendChild(deleteBtnImg);
    layerBody.appendChild(layerDiv);

    return operator;
  }

  docCreateElement(elementToCreate, classToAdd) {
    let element = document.createElement(elementToCreate);
    element.classList.add(classToAdd);
    return element;
  }

  removeControlBox() {
    const oldControlBox = document.getElementsByClassName('control-box')[0];
    if (oldControlBox) {
      oldControlBox.remove();
    }
  }
}

export default LayerContainer;
