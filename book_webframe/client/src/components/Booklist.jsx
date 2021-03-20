import React, { Component } from "react";
import {
	Jumbotron,
	Container,
	Button,
	Form,
	Label,
	Input,
	Row,
	Col,
	Card, CardBody, CardTitle, CardImg, CardSubtitle, CardText
} from "reactstrap";
import axios from "axios";
import "../App.css";
import UserStore from '../userStore/userStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

//final db
// const user_id = "5fb885beded3a615b4f96aa9";
//test db
// const user_id = "5fac8ee81577ff48d4652a82";

export class Booklist extends Component {
	constructor(props) {
		super(props);
		this.state = { books: [], available_books: [], users: [], user: [], search: null };
		this.searchSpace = this.searchSpace.bind(this)
	}

	async componentWillMount() {
		await this.setState({ username: UserStore.username});
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/books/")
			.then((response) => {
				this.setState({ books: response.data });
				this.setState({ available_books: this.state.books.filter(book => book.available === true)})
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
				console.log(this.state.user)
			})
			.catch((error) => {
				console.log(error);
			});
	}

	JumboStyle = {
		padding: "30px 30px",
		background: "linear-gradient(to right, #57d073, #0054d6)",
		color: "white",
		textAlign: "center"
	};

	searchSpace(event) {
		event.preventDefault();
		let keyword = event.target.value;
		this.setState({search:keyword})
	}

	render() {
		const items = this.state.available_books.filter((data)=>{
			if (this.state.search == null) {
				return data;
			} else if (data.title.toLowerCase().includes(this.state.search.toLowerCase()) || 
				data.author.toLowerCase().includes(this.state.search.toLowerCase()) ||
				data.posting_user.toLowerCase().includes(this.state.search.toLowerCase()) ||
				data.book_points.toString().includes(this.state.search.toLowerCase()) ||
				data.isbn.toLowerCase().includes(this.state.search.toLowerCase()) ||
				data.condition.toLowerCase().includes(this.state.search.toLowerCase())) {
				return data;
			}
		}).map(data=>{
			return(
				data.available && (data.posting_user !== this.state.username) && <Col lg={3} md={4} className="d-flex my-4" key={data._id} >
				<Card body className="text-center">
					<CardImg className="mx-auto"  src={data.image} style={{width: "128px", height: "165px"}} alt="Not Available" onError={(e)=>{e.target.src="http://zldzksk1.dothome.co.kr/image/noimage.jpg"}}/>
					<CardBody className="d-flex flex-column flex-fill">
						<CardTitle tag="h5">{data.title}</CardTitle>
						<CardSubtitle tag="h6" className="mb-2">By {data.author}</CardSubtitle>
						<CardText>{data.book_points} Points</CardText>
						<Button
							className="btn btn-dark mt-auto algin-self-end"
							onClick={() => {
								this.props.history.push({
									pathname: `/Request`,
									state: { data },
									
								});
							}}
							>
							Request
						</Button>	
					</CardBody>
				</Card>
			</Col>
			)
		})
		return (
			<div>
				<Jumbotron style={this.JumboStyle} fluid>
						<h1>Book List</h1>
						<p>Please select book you would like to request.</p>
				</Jumbotron>

				<Form inline style={{justifyContent: "center"}} >
					<Label><FontAwesomeIcon icon={faSearch} />&nbsp;&nbsp;&nbsp;</Label>
					<Input
						type="text"
						className="input"
						id="search"
						className="mr-sm-2 w-50"
						placeholder="Search by ISBN, title, author, posting user, book points, or condition"
						
						onChange={(e)=>this.searchSpace(e)}
					/>
				</Form>

				<div style={{overflow:"auto"}}>
				<Container>
					<Row className="my-4">
						{/* {this.state.search && <FilterResults value={this.state.search} data={book}
						renderResults={results=> (
							this.renderData()
						)}
						/>} */}
						{/* {this.renderData()}
						 */}
						{items}
					</Row>
				</Container> 
				</div>
			</div>
		);
	}
}
