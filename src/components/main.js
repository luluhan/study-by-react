require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

//获取图片的相关信息
let imageDatas = require('../data/imageDatas.json');
//将图片名信息转成图片URL路径信息
imageDatas = (function getImageURL(imageDatasArr){
  for(let i of imageDatasArr.keys()) {
    let singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
})(imageDatas);

// console.log(imageDatas);

class imgFigure extends React.Component {
  render() {
    return (
      <figure className="img-figure">
        <img src={this.props.data.imageURL}　alt={this.props.data.title}　width="240"/>
        <figcaption>
          <h2 className="img-title">{this.props.data.description}</h2>
        </figcaption>
      </figure>
    )
  }
}
class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.Constant = {
      centerPos : {
        left: 0,
        right: 0
      },
      hPosRange: {  //水平方向的取值范围
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: {  //垂直方向的取值范围
        x: [0, 0],
        topY: [0,0]
      }
    }
  }


  /*
   *重新布局所有图片
   *@param centerIndex 指定居中排布哪个图片
  */
  rearrange(centerIndex) {

  }

  componentDidMount() {
    let stageDom = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDom.scrollWidth,
        stageH = stageDom.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

    //拿到一个imgFigure的大小
    let imgFigureDom = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDom.scrollWidth,
        imgH = imgFigureDom.scrollHeight,
        halfImgW = Math.ceil(imgFigureDom.scrollWidth / 2),
        halfImgH = Math.ceil(imgFigureDom.scrollHeight / 2);

    //计算中心图片的位置点
    // this.Constant.centerPos = {
    //   left: halfStageW - halfImgW,
    //   top: halfStageH - halfImgH
    // }
    this.Constant.centerPos = {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
      }

    //计算左侧，右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = - halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

    this.Constant.hPosRange.y[0] = - halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;
    //计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = - halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

    this.Constant.vPosRange.x[0] = halfImgW - imgW;
    this.Constant.vPosRange.x[1] = halfImgW;

    let num = Math.floor(Math.random() * 10);
    this.rearrange(num);
  }

  render() {
    let controllerUnits = [],
        imgFigures = [];
    imageDatas.forEach((item, index) => {
      imgFigures.push(<imgFigure data={item} key={index} ref={'imgFigure'+ index} />);
    });

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
