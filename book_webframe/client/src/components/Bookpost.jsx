import React, { Component } from "react";
import {Jumbotron, Container, Form, Row, Col, Button, Tab, Tabs } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import UserStore from '../userStore/userStore'
import Loading from "./Loading";


export class Bookpost extends Component {

	constructor(props) {
		super(props);
		this.props = props;
	}

	JumboStyle = {
		padding: "30px 30px",
		background: "linear-gradient(to right, #57d073, #0054d6)",
		color: "white",
		textAlign: "center"
	};

	image = {
		imgUrl: "http://zldzksk1.dothome.co.kr/image/howitworks3.jpg",
		imgUrl2: "http://zldzksk1.dothome.co.kr/image/howitworks4.jpg",
	};

	state = {
		googleApi: "AIzaSyBQfQo2qfxzIoUcw6fE6ShJdZFJDGBgwFU",
		bookid:"",
		button: "",
		isbnModal: false,
		book: false,
		getIsbn: "",
		bookTitle: "",
		bookAuthor: "",
		bookPublish: "",
		bookCondition: "Fair",
		bookPrice: "10",
		bookAvail: true,
		bookImg: "",
		swap: {
			requested: false,
			accepted: false,
			shipped: false,
			received: false,
			request_date: "",
			requesting_user: "",
		},
	};

	toggleisbnModal() {
		this.setState({
			isbnModal: !this.state.isbnModal,
		});
	}

	// if user didn't enter the isbn#, set the modal title as warning msg
	async getbook() {
		if (this.state.getIsbn === "") {
			this.setState({
				bookTitle: "Please enter ISBN#",
			});
		} else {
			//if user entered the correct isbn, get book infomation and set the variable accordingly 
			axios
				.get(
					"https://www.googleapis.com/books/v1/volumes?q=isbn:" +
						this.state.getIsbn +
						"&key=" +
						this.state.googleApi
				)
				.then((response) => {
					if (response.data.items[0].volumeInfo.imageLinks !== undefined) {
						this.setState({
							bookTitle: response.data.items[0].volumeInfo.title,
							bookAuthor: response.data.items[0].volumeInfo.authors[0],
							bookPublish: response.data.items[0].volumeInfo.publishedDate,
							bookImg:
								response.data.items[0].volumeInfo.imageLinks.smallThumbnail,
							button: true,
						});
					} else {
						this.setState({
							bookTitle: response.data.items[0].volumeInfo.title,
							bookAuthor: response.data.items[0].volumeInfo.authors[0],
							bookPublish: response.data.items[0].volumeInfo.publishedDate,
							bookImg: "http://zldzksk1.dothome.co.kr/image/noimage.jpg",
							button: true,
						});
					}
				})
				.catch((error) => {
					this.setState({
						bookTitle:
							"Something went wrong, please check your ISBN#. If you are continuously getting this error, please contact us",
						bookImg: "http://zldzksk1.dothome.co.kr/image/noimage.jpg",
					});
				});
		}
	}

	async componentWillMount() {
		await this.setState({ username: UserStore.username});
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/users/")
			.then((response) => {
				this.setState({ users: response.data });
				this.setState({
					user: this.state.users.filter((user) => user.username === this.state.username)[0],
				});
				console.log(this.state.user, "user");
			})
			.catch((error) => {
				console.log(error);
			})

	}

	fillForm() {
		this.setState({
			isbnModal: false,
			book: true,
			button: "",
		});
	}

	//evaluate the bookd price
	onChangeCondition(e) {
		if (e.target.value === "As New") {
			this.setState({
				bookCondition: e.target.value,
				bookPrice: "30",
            });
		}

		if (e.target.value === "Very Good") {
			this.setState({
				bookCondition: e.target.value,
				bookPrice: "25",
			});
		}

		if (e.target.value === "Good") {
			this.setState({
				bookCondition: e.target.value,
				bookPrice: "20",
			});
		}

		if (e.target.value === "Fair") {
			this.setState({
				bookCondition: e.target.value,
			});
		}
	}

	onSubmit(e) {
		e.preventDefault();

		if(window.confirm("Are you sure to post your book?")){
			const book = {
				isbn: this.state.getIsbn,
				title: this.state.bookTitle,
				author: this.state.bookAuthor,
				publishing_date: this.state.bookPublish,
				posting_user: this.state.username, 
				condition: this.state.bookCondition,
				book_points: this.state.bookPrice,
				available: this.state.bookAvail,
				image: this.state.bookImg,
				swap: {
					requested: this.state.swap.requested,
					accepted: this.state.swap.accepted,
					shipped: this.state.swap.requested,
					received: this.state.swap.requested,
					request_date: this.state.swap.requested,
					requesting_user: this.state.swap.requested,
				},
			};
			//console.log(book);

			const user = this.state.user;
			console.log("points:", user.points);
			user.points = user.points + 1;
			console.log("points after:", user.points)
			axios
				.post("http://localhost:5000/books/add", book)
				.then((res) => {
					console.log("Book added");
					//console.log(res.data._id);
					const text = res.data._id;
					this.setState({bookid:UserStore.Delbookid}, ()=>{ UserStore.Delbookid = this.state.bookid})
					UserStore.Delbookid = "teste"
				})
				.then(
					this.setState({
						isbn: "",
					})
				).catch((error) => {
					console.log(error);
				});

			axios.post('http://localhost:5000/users/update/'+ user._id, user)
				.then(response => { console.log(response.data)})
				.catch((error) => {
					console.log(error);
				});

			window.location = "/PostConfirm";
		} else{
			window.location.reload()
		}


	}

	isQnaSection() {
		return (
			<Tabs className="top-accountpage" defaultActiveKey="question">
				{/*my books tab*/}
				<Tab eventKey="question" title="How it works?">
					<Tab.Container id="question-tab" defaultActiveKey="question">

						<p style={{ padding: "10px" }}>
							<strong>BINDER works in this way!</strong>
						</p>
						<ul>
							<li><strong>Post</strong> your old book on BINDER </li>
							<li><strong>Wait</strong>  until you have a book swap request</li>
							<li><strong>Decide</strong>  whether accept the request or not </li>
							<li>Once you <strong>accept</strong> the request, <strong>send</strong> your book to the user </li>
							<li>If the user receieve the book, you will <strong>get</strong> points</li>
							<li><strong>Find</strong>  a book you want, and <strong>send</strong> a request</li>
							<li><strong>Get</strong>  your book and <strong>enjoy</strong>!!</li>
						</ul>

						<img
							src={this.image.imgUrl2}
							style={{ width: "100%", marginTop: "15px" }}
							fluid="true"
						/>
					</Tab.Container>
				</Tab>{" "}
				{/*my books tab END*/}
				{/*history tab*/}
				<Tab eventKey="faq" title="FAQ">
					<Tab.Container id="faq-tab" defaultActiveKey="question">
						<Tab.Content>
							<p style={{ padding: "10px" }}>
								<strong>It seems like you have more questions!</strong>
							</p>
							<p style={{ paddingLeft: "10px" }}>
								Please check out the "Frequently Asked Question" section in order to
								find your answer! You can click the Q&A tap on the navigation
								bar or please click the link below to access the FAQ page!
							</p>
							<a style={{ paddingLeft: "10px" }} href="/Cservice">
								Go to Q&A page
							</a>
						</Tab.Content>
					</Tab.Container>
				</Tab>
			</Tabs>
		);
	}

	render() {
		// const { user } = this.props.auth0;

		// if (typeof user !== "undefined") {
		// 	// this.setState({username: user.nickname})
		// 	this.state.username = user.nickname;
		// 	console.log(this.state.username);
		// }
		if (this.state.loading) {
			return (<Loading />);
		}
		else {
			if (!this.state.book) {
			return (
				<div fluid="true">
					<div>
						<Jumbotron style={this.JumboStyle} fluid="true">
								<h1>Post your book</h1>
								<p>
									You can post your book in public and share it with users.
									Start posting your book by entering ISBN# here!
								</p>
						</Jumbotron>
					</div>
					{/* <div>Hello {user.username}</div> */}
					<Container style={{paddingBottom:"7%"}} fluid>
					<Row >
						<Col >
						{/* it is to sparate the */}
							<Form >
								<Form.Group controlId="formBasicEmail">
									<Row style={{paddingTop:"10px"}}>
										<Col>
											<Form.Control
												type="text"
												placeholder="Please enter ISBN#"
												value={this.state.getIsbn}
												onChange={(e) => {
													let { getIsbn } = this.state;
													getIsbn = e.target.value;
													this.setState({ getIsbn });
												}}
											/>
											<Form.Text className="text-muted">
												Please enter your ISBN# without '-'.
											</Form.Text>
										</Col>
										<Col>
											<div>
												<Button
													color="primary"
													onClick={() => {
														this.toggleisbnModal();
														this.getbook();
													}}
												>
													Get book data
												</Button>
												<Modal
													isOpen={this.state.isbnModal}
													toggle={this.toggleisbnModal.bind(this)}
												>
													<ModalHeader toggle={this.toggleisbnModal.bind(this)}>
														Your Book
													</ModalHeader>
													<ModalBody>
														<div
															style={{
																float: "left",
																width: "40%",
																paddingLeft: "20px",
															}}
														>
															<img src={this.state.bookImg}></img>
														</div>
														<div style={{ float: "right", width: "60%" }}>
															<p>
																<strong>Book Info</strong>
															</p>
															<p>{this.state.bookTitle}</p>
															<p>{this.state.bookAuthor}</p>
															<p>{this.state.bookPublish}</p>
														</div>
													</ModalBody>
													<ModalFooter>
														<Button
															style={{ backgroundColor: "#dc3545" }}
															onClick={this.toggleisbnModal.bind(this)}
														>
															Cancel
														</Button>
														<Button
															color="primary"
															onClick={this.fillForm.bind(this)}
															disabled={!this.state.button}
														>
															Confirm
														</Button>{" "}
													</ModalFooter>
												</Modal>
											</div>
										</Col>
									</Row>
								</Form.Group>
							</Form>
						</Col>
						<Col>
							{this.isQnaSection()}
						</Col>
					</Row>
					</Container>
				</div>
			);
		} else if (this.state.book) {
			return (
				<div fluid="true">
					<div>
						<Jumbotron style={this.JumboStyle} fluid="true">
								<h1>Post your book</h1>
								<p>
									This is a modified jumbotron that occupies the entire
									horizontal space of its parent.
								</p>
						</Jumbotron>
					</div>
					<Container style={{paddingBottom:"7%"}} fluid>
					<Row>
						<Col style={{paddingTop:"10px"}}>
							<h2 style={{marginBottom:"35px"}}>Post Form</h2>
							<Form onSubmit={this.onSubmit.bind(this)}>
								<Form.Group as={Row}>
									<Form.Label column sm={2}>
										{" "}
										Title{" "}
									</Form.Label>
									<Col sm={8}>
										<Form.Control
											type="text"
											name="bookTitle"
											value={this.state.bookTitle}
											disabled={!this.state.button}
										/>
									</Col>
								</Form.Group>
								<Form.Group as={Row}>
									<Form.Label column sm={2}>
										{" "}
										Author{" "}
									</Form.Label>
									<Col sm={8}>
										<Form.Control
											type="text"
											name="bookTitle"
											value={this.state.bookAuthor}
											disabled={!this.state.button}
										/>
									</Col>
								</Form.Group>
								<Form.Group as={Row}>
									<Form.Label column sm={2}>
										{" "}
										Year{" "}
									</Form.Label>
									<Col sm={8}>
										<Form.Control
											type="text"
											name="bookPublish"
											value={this.state.bookPublish}
											disabled={!this.state.button}
										/>
									</Col>
								</Form.Group>
								<Form.Group as={Row}>
									<Form.Label column sm={2}>
										{" "}
										ISBN#{" "}
									</Form.Label>
									<Col sm={8}>
										<Form.Control
											type="text"
											name="getIsbn"
											value={this.state.getIsbn}
											disabled={!this.state.button}
										/>
									</Col>
								</Form.Group>
								<fieldset>
									<Form.Group as={Row}>
										<Form.Label as="legend" column sm={2}>
											Book Condition
										</Form.Label>
										<Col sm={10}>
											<Form.Check
												type="radio"
												label="As New"
												name="condition"
												id="condition1"
												value="As New"
												checked={this.state.bookCondition === "As New"}
												onChange={this.onChangeCondition.bind(this)}
											/>
											<Form.Check
												type="radio"
												label="Very Good"
												name="condition"
												id="condition2"
												value="Very Good"
												checked={this.state.bookCondition === "Very Good"}
												onChange={this.onChangeCondition.bind(this)}
											/>
											<Form.Check
												type="radio"
												label="Good"
												name="condition"
												id="condition3"
												value="Good"
												checked={this.state.bookCondition === "Good"}
												onChange={this.onChangeCondition.bind(this)}
											/>
											<Form.Check
												type="radio"
												label="Fair"
												name="condition"
												id="condition3"
												value="Fair"
												checked={this.state.bookCondition === "Fair"}
												onChange={this.onChangeCondition.bind(this)}
											/>
										</Col>
									</Form.Group>
								</fieldset>
								<Form.Group as={Row}>
									<Col sm={{ span: 10, offset: 2 }}>
										<Link to="/Home">
											<Button
												type="Button"
												style={{
													marginRight: "15px",
													backgroundColor: "#dc3545",
												}}
												onClick={(e) => {
													if(window.confirm("Are sure to cancel the posting?")){
														e.preventDefault()
														window.location.reload()}
													else{
														e.preventDefault()
													}
													}
												}
											>
												Cancel
											</Button>
										</Link>
										<Button type="submit">Post</Button>
									</Col>
								</Form.Group>
							</Form>
						</Col>
						<Col>
							{this.isQnaSection()}
						</Col>
					</Row>
					</Container>
				</div>
			);
		}}
	}
}
