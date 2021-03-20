import React, { Component } from 'react';

export class Home extends Component
{
    state = {
        bannerUrl: "http://zldzksk1.dothome.co.kr/image/main_banner.jpg",
        workRul: "http://zldzksk1.dothome.co.kr/image/howitworks2.jpg"
      };
      
    imgStyle = {
        display: "block"
      };

    render(){
        return(
            <div>
                <div id = "head">
                    <img src={this.state.bannerUrl} style={this.imgStyle} alt="" className="img-fluid"/>
                    <img src={this.state.workRul} style={this.imgStyle} alt="" className="img-fluid"/>
                </div>
            </div>
        )
    }
}
