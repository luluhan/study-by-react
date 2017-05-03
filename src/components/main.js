require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//获取图片的相关信息
let imageDatas = require('../data/imageDatas.json');
//将图片名信息转成图片URL路径信息
imageDatas = (function getImageURL(imageDatasArr) {
  for(let i of imageDatasArr.keys()) {
    let singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
})(imageDatas);

// console.log(imageDatas);

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec">
        </section>
        <nav className="controller-nav">
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
