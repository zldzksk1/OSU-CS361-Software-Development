import React, { Component } from 'react';

export class Nomatch extends Component
{
    state = {
        logoUrl: "http://zldzksk1.dothome.co.kr/image/404page.jpg",
        bannerUrl: ""
      };
      
      imgStyle = {
        display: "block"
      };

    render(){
        return(
            <div>
                <div id = "head">
                    <img src={this.state.logoUrl} style={this.imgStyle} alt="" className="img-fluid"/>
                </div>
            </div>
        )
    }
}
