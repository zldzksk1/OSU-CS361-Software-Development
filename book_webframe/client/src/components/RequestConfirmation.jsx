import React, { Component } from "react";
import { Jumbotron, Container, Button } from "reactstrap";
import { Link } from "react-router-dom";

export class RequestConfirmation extends Component {
	JumboStyle = {
		bannerUrl: "",
		padding: "30px 30px",
		background: "white",
		textAlign: "center",
	};

	render() {
		return (
			<div>
				<Jumbotron style={this.JumboStyle} fluid>
					<Container>
						<h1>Request Confirmation</h1>
					</Container>
				</Jumbotron>
				<div className="d-flex justify-content-center">
					<p style={{ textAlign: "center", fontSize: "1.25rem" }}>
						Your request has been sent successfully.
						<br />
						<br />
						You can check status of your swap at{" "}
						<Link to="ManageRequests">Manage Requests</Link>
						<br />
						<br />
						<br />
						<br />
						<Link to="/Booklist">
							<Button className="btn btn-dark">Go Back to Book List</Button>
						</Link>
					</p>
				</div>
			</div>
		);
	}
}
