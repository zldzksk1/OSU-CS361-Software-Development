
import React, { Component } from "react";
import { Button } from "reactstrap";
import {
	Table,
	Tabs,
	Tab,
	Nav,
	Row,
	Col,
	Jumbotron,
	Container,
} from "react-bootstrap";
import "./ManageRequests.css";
import axios from "axios";
import UserStore from '../userStore/userStore';
//import { useAuth0, withAuth0 } from '@auth0/auth0-react';

const PReceived = (props) => (
	<tr className="preceived_table">
		<td>
			{props.book._id.substring(
				props.book._id.length - 3,
				props.book._id.length
			)}
		</td>
		<td>{props.book.swap.request_date.substring(0, 10)}</td>
		<td>{props.book.swap.requesting_user}</td>
		<td>{props.book.title}</td>
		<td>
			<Button
				id="accept-button"
				color="success"
				onClick={() => {
					props.acceptRequest(props.book._id);
				}}
			>
				Accept
			</Button>
			<Button
				id="reject-button"
				color="danger"
				onClick={() => {
					props.rejectRequest(props.book._id);
				}}
			>
				Reject
			</Button>
		</td>
	</tr>
);

const AReceived = (props) => (
	<tr className="areceived_table">
		<td>
			{props.book._id.substring(
				props.book._id.length - 3,
				props.book._id.length
			)}
		</td>
		<td>{props.book.swap.request_date.substring(0, 10)}</td>
		<td>
			{"Requesting User: " + props.book.swap.requesting_user} <br />
			{"Posting User: " + props.book.posting_user} <br />
			{"Book Title: " + props.book.title} <br />
		{"Mailing Address: " + props.user.mailing_address}
		</td>
		<td>
			<Button
				id="shipped-button"
				color="warning"
				disabled={props.book.swap.shipped}
				onClick={() => {
					props.shipped(props.book._id);
				}}
			>
				Shipped
			</Button>
			<Button
				id="cancel-button"
				color="danger"
				onClick={() => {
					props.cancel(props.book._id);
				}}
			>
				Cancel
			</Button>
		</td>
	</tr>
);

const PSent = (props) => (
	<tr className="psent_table">
		<td>
			{props.book._id.substring(
				props.book._id.length - 3,
				props.book._id.length
			)}
		</td>
		<td>{props.book.swap.request_date.substring(0, 10)}</td>
		<td>{props.book.posting_user}</td>
		<td>{props.book.title}</td>
		<td>
			<Button id="shipped-button" color="info" disabled={true}>
				Pending
			</Button>
		</td>
	</tr>
);

const ASent = (props) => (
	<tr className="asent_table">
		<td>
			{props.book._id.substring(
				props.book._id.length - 3,
				props.book._id.length
			)}
		</td>
		<td>{props.book.swap.request_date.substring(0, 10)}</td>
		<td>
			{"Posting User: " + props.book.posting_user} <br />
			{"Requesting User: " + props.book.swap.requesting_user} <br />
			{"Book Title: " + props.book.title} <br />
			{"Mailing Address: " + props.user.mailing_address}
		</td>
		<td>
			<Button
				id="received-button"
				color="warning"
				disabled={props.book.swap.received}
				onClick={() => {
					props.received(props.book._id);
				}}
			>
				Received
			</Button>
		</td>
	</tr>
);

export class ManageRequests extends Component {

	constructor(props) {
		super(props);

		this.acceptRequest = this.acceptRequest.bind(this);
		this.rejectRequest = this.rejectRequest.bind(this);
		this.shipped = this.shipped.bind(this);
		this.received = this.received.bind(this);
		this.cancel = this.cancel.bind(this);

		this.state = {
			books: [],
			users: [],
			user: [],
		};
	}

	async componentWillMount() {
		await this.setState({ username: UserStore.username});
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/books/")
			.then((response) => {
				this.setState({ books: response.data });
			})
			.catch((error) => {
				console.log(error);
			});

		axios
			.get("http://localhost:5000/users/")
			.then((response) => {
				this.setState({ users: response.data });
				this.setState({
					user: this.state.users.filter((user) => user.username === this.state.username)[0],
				});
			})
			.catch((error) => {
				console.log(error);
			});

	}

	acceptRequest(id) {
		alert(
			"You have accepted the swap request!\nYou can cancel this request under the accepted tab."
		);
		const book = {
			// Get book field for this id
			books: this.state.books.filter((x) => x._id === id)[0],
		};
		console.log(book.books); // prints field of current book

		book.books.swap.accepted = true; // Set accepted to true

		// Update book's "accepted" field with true
		axios
			.post("http://localhost:5000/books/update/" + id, book.books)
			.then((response) => {
				console.log(response.data);
			});

		// Remove this specific request from pending table
		this.setState({
			books: this.state.books.filter((el) => el._id !== id),
		});

		window.location.reload(true); //upload the page immediately in accepted tab
	}

	rejectRequest(id) {
		alert(
			"You have rejected the swap request. Don't worry, no transaction will occur."
		);
		const book = {
			// Get book field for this id
			books: this.state.books.filter((x) => x._id === id)[0],
		};
		console.log(book.books); // prints field of current book

		book.books.swap.rejected = true; // Set rejected to true

		//get requesting user info from books table
		const req_user_books = book.books.swap.requesting_user;
		console.log(req_user_books);
		//find the requesting user from users table
		const req_user_users = this.state.users.filter(
			(user) => user.username === req_user_books
		)[0];

		console.log(req_user_users);
		//I'm the user - posting_user - nothing happens
		//requesting user - give back points: pending - subtract, points - add
		req_user_users.pending_points =
			req_user_users.pending_points + book.books.book_points;
		req_user_users.points = req_user_users.points + book.books.book_points;

		console.log("requesting user:", req_user_users);

		// Update book's "accepted" field with true
		axios
			.all([
				axios.post("http://localhost:5000/books/update/" + id, book.books),
				axios.post("http://localhost:5000/users/update/" + req_user_users._id, req_user_users),
			])
			.then(
				axios.spread((book_update, req_user_update) =>
					console.log(
						"book update:",
						book_update,
						"req user update:",
						req_user_update
					)
				)
			)
			.catch((errors) => {
				console.log(errors);
			});

		// Remove this specific request from pending table
		this.setState({
			books: this.state.books.filter((el) => el._id !== id),
		});

		window.location.reload(true); //upload the page immediately
	}

	shipped(id) {
		alert("You have let the requesting user know that the book has shipped!");
		const book = {
			// Get book field for this id
			books: this.state.books.filter((x) => x._id === id)[0],
		};

		book.books.swap.shipped = true; // Set shipped to true

		// Update book's "accepted" field with true
		axios
			.post("http://localhost:5000/books/update/" + id, book.books)
			.then((response) => {
				console.log(response.data);
			});

		window.location.reload(true); //upload the page immediately
	}

	//posting user - someone else (book.posting_user)
	//receiving user - me (book.swap.requesting_user)
	received(id) {
		alert(
			"You have let the posting user know that the book has been received!"
		);
		const book = {
			// Get book field for this id
			books: this.state.books.filter((x) => x._id === id)[0],
		};

		book.books.swap.received = true; // Set received to true

		//get requesting user info from books table
		const req_user_books = book.books.swap.requesting_user;
		//find the requesting user from users table
		const req_user_users = this.state.users.filter(
			(user) => user.username === req_user_books
		)[0];

		//get posting user info frm books table
		const posting_user_books = book.books.posting_user;
		//find posting user from users table
		const posting_user_users = this.state.users.filter(
			(user) => user.username === posting_user_books
		)[0];

		console.log(posting_user_users);
		console.log(req_user_users);
		//I'm the user - requesting_user - my pending points are updated (added)
		//sending user - posting user - subtract pending points, add to points
		req_user_users.pending_points =
			req_user_users.pending_points + book.books.book_points;

		posting_user_users.pending_points =
			posting_user_users.pending_points - book.books.book_points;
		posting_user_users.points =
			posting_user_users.points + book.books.book_points;

		console.log("posting user:", posting_user_users);
		console.log("requesting user:", req_user_users);
		axios
			.all([
				axios.post("http://localhost:5000/books/update/" + id, book.books),
				axios.post(
					"http://localhost:5000/users/update/" + req_user_users._id,
					req_user_users
				),
				axios.post(
					"http://localhost:5000/users/update/" + posting_user_users._id,
					posting_user_users
				),
			])
			.then(
				axios.spread((book_update, req_user_update, posting_user_update) =>
					console.log(
						"book update:",
						book_update,
						"req user update:",
						req_user_update,
						"posting_user_update",
						posting_user_update
					)
				)
			)
			.catch((errors) => {
				console.log(errors);
			});
		window.location.reload(true); //upload the page immediately
	}

	cancel(id) {
		const book = {
			// Get book field for this id
			books: this.state.books.filter((x) => x._id === id)[0],
		};
		console.log(book.books); // prints field of current book

		book.books.swap.rejected = true; // Set rejected to true
		book.books.swap.accepted = false; // Set accepted to false

		const posting_user_books = book.books.posting_user;
		const posting_user_users = this.state.users.filter(
			(user) => user.username === posting_user_books
		)[0];
		console.log(posting_user_users.points);

		posting_user_users.points = posting_user_users.points + 1;
		console.log(posting_user_users.points);
		// Update book's "accepted" field with true
		axios
			.all([
				axios.post("http://localhost:5000/books/update/" + id, book.books),
				axios.post(
					"http://localhost:5000/users/update/" + posting_user_users._id,
					posting_user_users
				),
			])
			.then(
				axios.spread((book_update, posting_user_update) =>
					console.log(
						"book update:",
						book_update,
						"posting user update:",
						posting_user_update
					)
				)
			)
			.catch((errors) => {
				console.log(errors);
			});

		// Remove this specific request from pending table
		this.setState({
			books: this.state.books.filter((el) => el._id !== id),
		});
	}

	// Populate table for pending received tab
	pReceivedList() {
		return this.state.books.map((currentrequest) => {
			if (
				currentrequest.swap.requested == true &&
				currentrequest.swap.accepted == false &&
				currentrequest.swap.rejected == false &&
				currentrequest.posting_user == this.state.username
			)

				return (
					<PReceived
						book={currentrequest}
						acceptRequest={this.acceptRequest}
						rejectRequest={this.rejectRequest}
						key={currentrequest._id}
					/>
				);
				console.log(this.state.username);
		});
	}

	// Populate table for accepted received tab
	aReceivedList() {
		return this.state.books.map((currentrequest) => {
			const req_user = {
				user: this.state.users.filter((x) => (x.username === currentrequest.swap.requesting_user) &&
			x.username !== this.state.username),
			}
			//console.log("USER", req_user.user[0])
			if (
				currentrequest.swap.accepted == true &&
				currentrequest.posting_user == this.state.username
			)
				return (
					<AReceived
						user={req_user.user[0]}
						book={currentrequest}
						shipped={this.shipped}
						cancel={this.cancel}
						key={currentrequest._id}
					/>
				);
		});
	}

	// Populate table for pending sent tab
	pSentList() {
		return this.state.books.map((currentrequest) => {
			if (
				currentrequest.swap.requested == true &&
				currentrequest.swap.accepted == false &&
				currentrequest.swap.rejected == false &&
				currentrequest.swap.requesting_user == this.state.username
			)
				return <PSent book={currentrequest} key={currentrequest._id} />;
		});
	}

	// Populate table for accepted sent tab (received button)
	aSentList() {
		return this.state.books.map((currentrequest) => {
			if (
				currentrequest.swap.accepted == true &&
				currentrequest.swap.rejected == false &&
				currentrequest.swap.requesting_user == this.state.username
			)
				return (
					<ASent
						user={this.state.user}
						book={currentrequest}
						received={this.received}
						key={currentrequest._id}
					/>
				);
		});
	}

	render() {
		const pendingReceivedHeader = () => {
			let headerElement = ["id", "date", "requesting-user", "book", "action"];
			let hoverElement = [
				"Unique request number.",
				"Date the swap request was requested.",
				"Name of person requesting book.",
				"Book being requested.",
				'Click "Accept" to accept swap. Click "Reject" to reject swap.',
			];
			return headerElement.map((key, index) => {
				return (
					<th id={key} key={index}>
						{key.toUpperCase()}
						<span id={key + "-text"}>{hoverElement[index]}</span>
					</th>
				);
			});
		};

		const pendingSentHeader = () => {
			let headerElement = ["id", "date", "posting-user", "book", "action"];
			let hoverElement = [
				"Unique request number.",
				"Date the swap request was requested.",
				"Name of person you are requesting book from.",
				"Book being requested.",
				"Your request is currently pending.",
			];
			return headerElement.map((key, index) => {
				return (
					<th id={key} key={index}>
						{key.toUpperCase()}
						<span id={key + "-text"}>{hoverElement[index]}</span>
					</th>
				);
			});
		};

		const acceptedReceivedHeader = () => {
			let headerElement = ["id", "date", "details", "action"];
			let hoverElement = [
				"Unique request number.",
				"Date the swap request was requested.",
				"Provides name of requester, name of poster, book being requested, and mailing address to ship to.",
				'Click "Shipped" when you have shipped the book.\
        Click "Cancel request" if you want to cancel this request.',
			];
			return headerElement.map((key, index) => {
				return (
					<th id={key} key={index}>
						{key.toUpperCase()}
						<span id={key + "-text"}>{hoverElement[index]}</span>
					</th>
				);
			});
		};

		const acceptedSentHeader = () => {
			let headerElement = ["id", "date", "details", "action"];
			let hoverElement = [
				"Unique request number.",
				"Date the swap request was requested.",
				"Provides name of poster, name of requester, book being requested, and mailing address to ship to.",
				'Click "Received" when you have received the book.',
			];
			return headerElement.map((key, index) => {
				return (
					<th id={key} key={index}>
						{key.toUpperCase()}
						<span id={key + "-text"}>{hoverElement[index]}</span>
					</th>
				);
			});
		};

		return (
			<div>
				<Jumbotron style={{  padding: "30px 30px", background: "linear-gradient(to right, #57d073, #0054d6)", color: "white", textAlign: "center"}}>
					<h1>Manage Requests</h1>
					<p >
					Note: Hover over each feature/action to get quick description of what
					it does or shows.
					</p>					
				</Jumbotron>

				{/*pending and accepted tab*/}
				<div style={{paddingBottom:"20%"}}>
				<Tabs className="top">
					{/*pending tab*/}
					<Tab eventKey="pending" title="Pending">
						<Tab.Container id="pendingRequest" defaultActiveKey="received">
							<Row>
								<Col sm={2}>
									<Nav variant="pills" className="flex-column">
										<Nav.Item>
											<Nav.Link eventKey="received">Received</Nav.Link>
										</Nav.Item>
									</Nav>
								</Col>
								<Col sm={2}>
									<Nav variant="pills" className="flex-column">
										<Nav.Item>
											<Nav.Link eventKey="sent">Sent</Nav.Link>
										</Nav.Item>
									</Nav>
								</Col>
							</Row>
							<Tab.Content>
								<Tab.Pane eventKey="received">
									<Table className="pr-requests">
										<thead>
											<tr>{pendingReceivedHeader()}</tr>
										</thead>
										<tbody>{this.pReceivedList()}</tbody>
									</Table>
								</Tab.Pane>
								<Tab.Pane eventKey="sent">
									<Table className="ps-requests">
										<thead>
											<tr>{pendingSentHeader()}</tr>
										</thead>
										<tbody>{this.pSentList()}</tbody>
									</Table>
								</Tab.Pane>
							</Tab.Content>
						</Tab.Container>
					</Tab>{" "}
					{/*pending tab END*/}
					{/*accepted tab*/}
					<Tab eventKey="accepted" title="Accepted">
						<Tab.Container id="acceptedRequest" defaultActiveKey="received">
							<Row>
								<Col sm={2}>
									<Nav variant="pills" className="flex-column">
										<Nav.Item>
											<Nav.Link eventKey="received">Received</Nav.Link>
										</Nav.Item>
									</Nav>
								</Col>
								<Col sm={2}>
									<Nav variant="pills" className="flex-column">
										<Nav.Item>
											<Nav.Link eventKey="sent">Sent</Nav.Link>
										</Nav.Item>
									</Nav>
								</Col>
							</Row>
							<Tab.Content>
								<Tab.Pane eventKey="received">
									<Table className="ar-requests">
										<thead>
											<tr>{acceptedReceivedHeader()}</tr>
										</thead>
										<tbody>{this.aReceivedList()}</tbody>
									</Table>
								</Tab.Pane>
								<Tab.Pane eventKey="sent">
									<Table className="as-requests">
										<thead>
											<tr>{acceptedSentHeader()}</tr>
										</thead>
										<tbody>{this.aSentList()}</tbody>
									</Table>
								</Tab.Pane>
							</Tab.Content>
						</Tab.Container>
					</Tab>{" "}
					{/*accepted tab END*/}
				</Tabs>{" "}
				{/*pending and accepted tab tag END*/}
				</div> 
			</div>
		);
	}
}
