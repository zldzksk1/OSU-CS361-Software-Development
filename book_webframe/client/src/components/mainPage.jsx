import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, Nav, Form, FormControl, Button, NavDropdown} from 'react-bootstrap';
import {BrowerRouter, Route, Switch, Link} from 'react-router-dom';
//import Navbar from './NavBar/NavBar';

class MainPage extends Component {
    state = {
        logoUrl: "http://zldzksk1.dothome.co.kr/image/binder_log_resize.png",
        bannerUrl: ""

    };

    imgStyle = {
        marginLeft: "auto",
        marginRight: "auto",
        display: "block"
    };

    navStyle = {
        marginLeft: "30px",
        marginRight: "50px",        
    }
    render() { 
        return ( 
            <div>
                <div id = "head">
                    <img src={this.state.logoUrl} style={this.imgStyle} alt="" className="img-fluid"/>
                </div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home" style={this.navStyle}>BINDER-BOOkSWAP</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto" >
                            <Nav.Link href="#HOME">HOME</Nav.Link>
                            <Nav.Link href="./bookSwap" >BOOK SWAP</Nav.Link>path                         <Nav.Link href="#MYACCOUNT">MY ACCOUNT</Nav.Link>
                            <Nav.Link href="#pricing">FnA</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#LOGIN">Log in</Nav.Link>
                            <Nav.Link eventKey={2} href="#SIGNIN">
                                Sign up
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
                <div>
                    <image src=""/>
                </div> 
                <h1>Hello word</h1>
                <button>hit</button>
            </div>
         );
    }
}
 
export default MainPage;