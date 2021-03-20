import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';

export class PostConfirm extends Component
{
    state={
        imgUrl:"http://zldzksk1.dothome.co.kr/image/thank_you.jpg"
    }
      
    imgStyle = {
        display: "block"
      };

    render(){
        return(
            <div>
                <img src={this.state.imgUrl} style={this.imgStyle} alt="" className="img-fluid"/>
                <div style={{margin:"auto", textAlign:"center"}}>
                    <Link to="/Home">
                        <Button variant="secondary">Go to Main</Button>{' '}
                    </Link>
                    <Link to="/Myaccount">
                        <Button variant="secondary">Go to My Account</Button>{' '}
                    </Link>
                    <Link to="/Bookpost">
                        <Button variant="primary">Post Another Book</Button>{' '}
                    </Link>
                </div>
            </div>
        )

    }
}