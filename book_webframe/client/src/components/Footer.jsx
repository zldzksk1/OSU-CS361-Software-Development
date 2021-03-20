import React, { Component } from "react";
import {Container} from "react-bootstrap";

export class Footer extends Component {

    FooterStyle={
        marginTop:"1%",
        padding: "7px",
        background: "#222222",
        color: "white",
        fontSize: "12px",
    }

	render() {
		return (
			<div style={{position:"relative", bottom:"0"}}>

                    <div style={this.FooterStyle}>
                        <span style={{paddingLeft:"1%"}}>
                            BINDER
                        </span>
                        <span style={{paddingLeft:"24%"}}>
                            copyright © all rights reserved since 2020 / Created by Double A, OSU CS361
                        </span>
                    </div>
         
			</div>
		)
	}
}
