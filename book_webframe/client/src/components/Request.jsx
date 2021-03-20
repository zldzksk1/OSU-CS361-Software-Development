import React, { Component } from "react";
import { Jumbotron, Container, Table, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import UserStore from '../userStore/userStore';

// const user_id = "5fac8ee81577ff48d4652a82";
// const user_id = "5fac9f7cdfb7ef2ac4336473";

//final db
// const user_id = "5fb885beded3a615b4f96aa9";
//ok so it works when the button is abled and the statement is false//
export class Request extends Component {
	
	JumboStyle = {
		padding: "30px 30px",
		background: "linear-gradient(to right, #57d073, #0054d6)",
		color: "white",
		textAlign: "center"
	};

	CenterTable = {
		justifyContent:"center", 
		alignItems:"center", 
		display:"flex"
	}

	CenterBlock = {
		
		display: "block",
		marginLeft: "auto",
		marginRight: "auto"
		 
	}
	constructor(props) {
		super(props);
		this.state = { users: [] };
		this.updateUserPoints = this.updateUserPoints.bind(this);
		this.requestConfirm = this.requestConfirm.bind(this);
		this.requestPossible = this.requestPossible.bind(this);
	}
	
	async componentWillMount() {
		await this.setState({ username: UserStore.username});
	}
	componentDidMount() {
		axios
			.get("http://localhost:5000/users/")
			.then((response) => {
				this.setState({ users: response.data });
				this.setState({ user: this.state.users.filter(user => user.username === this.state.username)[0]})
			})
			.catch((error) => {
				console.log(error);
			});
		axios
			.get("http://localhost:5000/books/")
			.then((response) => {
				this.setState({ books: response.data });
				this.setState({ book: this.state.books.filter(book => book._id === this.props.location.state.data._id)[0]})
				console.log(this.state.book)
			})
			.catch((error) => {
				console.log(error);
			});
	}

	updateUserPoints(book_points) {
		
		const user = 
		// this.state.users.filter(user => user._id === user_id)[0]
		this.state.user
		const updatedPoints = user.points - book_points;
		return updatedPoints;
	}

	requestConfirm(book_points) {
		const user = this.state.user;
			// this.state.users.filter(user => user._id === user_id)[0]
		const book = 
			// this.state.books.filter(book => book._id === this.props.location.state.book._id)[0]
			this.state.book
			const updatedPoints = user.points - book_points;
			const updatedPendingPoints = user.pending_points - book_points;
			user.points = updatedPoints;
			user.pending_points = updatedPendingPoints;
			book.available = false;
			book.swap.requested = true;
			book.swap.requesting_user = user.username;
			book.swap.request_date = Date.now();
			console.log("book update:", book)
			axios
			.all([
				axios.post('http://localhost:5000/users/update/'+ user._id, user),
				axios.post('http://localhost:5000/books/update/'+ book._id, book)
			])
			.then(
				axios.spread((user_update, book_update) =>
					console.log(
						"user update:",
						user_update,
						"book update:",
						book_update
					)
				)
			)
			.catch((errors) => {
				console.log(errors);
			});
		
	}

	//check to user has enough points to submit request - this will change button color / disable
	requestPossible(book_points) {
		const user = 
		this.state.users.filter(user => user.username === this.state.username)[0]
		const updatedPoints = user.points - book_points;
		return (updatedPoints >= 0);

}
	render() {
		const { image, isbn, title, author, publishing_date, posting_user, condition, book_points } = this.props.location.state.data; 
		// console.log(this.props.location.state.book, 'this.props')

		
		return (
			<div>
				<Jumbotron style={this.JumboStyle} fluid>
					<Container>
						<h1>Book Request</h1><br />
						<p>Please confirm your book request.</p>
					</Container>
				</Jumbotron>

				{this.state.user && <Container>
					<Row>
						<Col sm={4} lg={3} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
							<img className="img-fluid" style={{height: "100%", width: "100%"}}src={image} onError={(e)=>{e.target.src="http://zldzksk1.dothome.co.kr/image/noimage.jpg"}}  />
						</Col>
						<Col sm={8} lg={5}>
							<Table className="table-borderless">
								<tbody style={{fontSize: "1.25rem"}}>
								<tr>
									<th>ISBN</th>
									<td>{isbn}</td>
								</tr>
								<tr>
									<th>Title</th>
									<td>{title}</td>
								</tr>
								<tr>
									<th>Author</th>
									<td>{author}</td>
								</tr>
								<tr>
									<th>Year</th>
									<td>{publishing_date.substring(0, 4)}</td>
								</tr>
								<tr>
									<th>Posting User</th>
									<td>{posting_user}</td>
								</tr>
								<tr>
									<th>Condition</th>
									<td>{condition}</td>
								</tr>
								</tbody>
							</Table>
						</Col>
						<Col sm={12} lg={4}>
						 <Table className="table-borderless" style={this.CenterTable}>
								<tbody style={{fontSize: "1.5em"}}>
								<tr>
									<th>{this.state.user.points}</th>
									<td>Points Available</td>
								</tr>
								<tr>
									<th>
										-<span>{book_points}</span>
									</th>
									<td>Points for Request</td>
								</tr>
								</tbody>
							</Table>
							<div className="divider bg-dark mx-auto" style={{width:"90%"}} >
								<hr />
							</div>
							<Table className="table-borderless" style={this.CenterTable}>
							<tbody style={{fontSize: "1.5em"}}>
								
								<tr className={this.requestPossible(book_points) ? "text-success" : "text-danger"}>
									<th className={this.requestPossible(book_points) ? "text-success" : "text-danger"}>{this.updateUserPoints(book_points)}</th>
									<td>Points Remain</td>
								</tr>
								</tbody>
							</Table>
						</Col>
					</Row>
				</Container>}
				
				<div className="d-flex justify-content-center my-5">
				{this.state.user && <div className="btn-group mr-5" role="group">

					
					{this.requestPossible(book_points) ?
						//when there's enough points - use function requestConfirm to update database
						<Link to="/RequestConfirmation">
						<Button
						
						className="btn btn-lg btn-success px-2"
						//{() => {}}anonymous function - click on button to be called, called on mount before
						style={{ width: "200px" }} onClick={() => {this.requestConfirm(book_points)}}
						>
						Confirm Request
						</Button>
						</Link>
					:	
					//so this button is disabled if user doesn't have enough points, and i want hover to show up if the button is disabled 
						//if not enough points - disable 
						
						<Button 
							data-tip data-for="tooltip"
							className="btn btn-lg btn-secondary px-2 disabled"
							style={{ width: "200px" }}
						>
							Confirm Request
						</Button>
						
					}
						
						<ReactTooltip id="tooltip" place="top" effect="solid" >
							You don't have enough points to request this book.
						</ReactTooltip>
					
					</div>}
					<div className="btn-group mr-5" role="group">

					<Link to="/Booklist">
						<Button
							className="btn btn-lg btn-danger px-2"
							style={{ width: "200px" }}
						>
							Cancel Request
						</Button>
					</Link>
					</div>
				</div>
			</div>
		);
	}
}
