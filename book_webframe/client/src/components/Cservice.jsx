import React, { Component } from 'react';
import {Jumbotron, Container, Accordion, Card, Button, Row, Col} from 'react-bootstrap';
// import "./Cservice.css";

export class Cservice extends Component
{
    JumboStyle = {
        padding: "30px 30px",
        marginBottom: "10px",
		background: "linear-gradient(to right, #57d073, #0054d6)",
        color: "white",
        textAlign:"center",
    };
    
    render(){
        return(
            <div>
                <div fluid="true">
                    <Jumbotron style={this.JumboStyle} >
                            <h1>Frequently Asked Question</h1>
                            <p>
                                If you have a question, please check the FAQ section below. Please contact us if you do not find satisfactory answer.
                            </p>
                    </Jumbotron>
                </div>
                <Container fluid>
                    <Row>
                        <Col md={4} style={{padding:"0px 5px 0px 0px"}}>
                            <Card>
                                <Card.Img variant="top" src="http://zldzksk1.dothome.co.kr/image/support2.png" fluid="true" />
                                <Card.Body fluid="true">
                                    <Card.Title>BINDER</Card.Title>
                                    <Card.Text>
                                        BINDER team will strive to provide you with our best service.<br/><br/>
                                        ADDRESS: Corvallis, Oregon <br/>
                                        HOURS: 10AM - 5PM / Mon - Fri<br/>
                                        CONTACT: support@binder.com<br/>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <br/>
                        </Col>
                        <Col md={8} style={{padding:"0px 0px 0px 5px"}}>
                            <Accordion defaultActiveKey="0" fluid="true">
                                <Card style={{marginBottom:"0px"}}>
                                    <Card.Header style={{backgroundColor: "#CCF0D5"}}>
                                    <Accordion.Toggle as={Button} variant="Dark" eventKey="0">
                                        What is the BINDER?
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        BINDER is a web-based application that allows people to trade their books with other users. 
                                        If you post a book you want to share, you will get points, which you can use to request books from others.
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card style={{marginBottom:"0px"}}>
                                    <Card.Header style={{backgroundColor: "#CCF0D5"}}>
                                    <Accordion.Toggle as={Button} variant="Dark" eventKey="1">
                                        How does BINDER work?
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        BINDER is trust-based application among people. If you post your book on BINDER, your book will be listed on BINDER.
                                        Then, ohter users can see your book, and they will send you a swap request. If you want to send your book to the user,
                                        you can accept the request. If you don't want to swap your book with the user, then simply reject the request and wait for another request.
                                        If you accepted the request, ship your book. Once the user receives your book, you will earn points. 
                                        Now you can request more books with the points!
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card style={{marginBottom:"0px"}}>
                                    <Card.Header style={{backgroundColor: "#CCF0D5"}}>
                                    <Accordion.Toggle as={Button} variant="Dark" eventKey="2">
                                        How can I send books?
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="2">
                                    <Card.Body>
                                        You can send your book with any major carriers such as FedEx, USPS, or USP at your own cost. 
                                        If you become a Loyal User, we will cover your shipping cost for free!
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card style={{marginBottom:"0px"}}>
                                    <Card.Header style={{backgroundColor: "#CCF0D5"}}>
                                    <Accordion.Toggle as={Button} variant="Dark" eventKey="3">
                                        How do I know if requesting user received my book?
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="3">
                                    <Card.Body>
                                        Once user receives your book, the user will confirm that he/she got the book on Manage Request page.
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card style={{marginBottom:"0px"}}>
                                    <Card.Header style={{backgroundColor: "#CCF0D5"}}>
                                    <Accordion.Toggle as={Button} variant="Dark" eventKey="4">
                                        What should I do if the recipient does not confirm the request?  
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="4">
                                    <Card.Body>
                                        No worries, your book will be automatically confirmed after 30 days.
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card style={{marginBottom:"0px"}}>
                                    <Card.Header style={{backgroundColor: "#CCF0D5"}}>
                                    <Accordion.Toggle as={Button} variant="Dark" eventKey="5">
                                        I cannot find answer to my question here.
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="5">
                                    <Card.Body>
                                        I am sorry about we are not able to find what you are looking for. Please contact us by email at support@binder.com
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>  
                         </Col>              
                    </Row>
                </Container>
            </div>  
        )
    }
}
