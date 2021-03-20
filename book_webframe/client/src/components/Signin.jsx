import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import "./Signin.css";

export class Signin extends Component {
	render() {
		return (
			<div class="container">
				<div class="row">
					<div class="col-md-6">
						<div class="card">
							<form class="box">
								<h1>Create a New Account</h1>
								<input type="text" name="" placeholder="First Name"></input>
								<input type="text" name="" placeholder="Last Name"></input>
								<input type="text" name="" placeholder="Username"></input>
								<input type="text" name="" placeholder="Email"></input>
								<input type="password" name="" placeholder="Password"></input>
								<input type="submit" name="" value="Submit" href="#"></input>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
