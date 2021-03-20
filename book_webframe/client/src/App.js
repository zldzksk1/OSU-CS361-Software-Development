import "./App.css";
import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import { Home } from "./components/Home";
import { Bookswap } from "./components/Bookswap";
import { Myaccount } from "./components/Myaccount";
import EditMyaccount from "./components/EditMyaccount";
import { Cservice } from "./components/Cservice";
import { Booklist } from "./components/Booklist";
import { Request } from "./components/Request";
import { RequestConfirmation } from "./components/RequestConfirmation";
import { Nomatch } from "./components/Nomatch";
import { ManageRequests } from "./components/ManageRequests";
import { Bookpost } from "./components/Bookpost";
import { PostConfirm } from "./components/PostConfirm";
import { Login } from "./components/Login";
import { Signin } from "./components/Signin";
import {Footer} from "./components/Footer";


class App extends Component {
	state = {
		logoUrl: "http://zldzksk1.dothome.co.kr/image/binder_log_resize.png",
		bannerUrl: "",
	};

	imgStyle = {
		marginLeft: "auto",
		marginRight: "auto",
		display: "block",
	};

	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<div id="head">
						<img
							src={this.state.logoUrl}
							style={this.imgStyle}
							alt=""
							className="img-fluid"
						/>
					</div>
					<Navigation />
					<Switch>
						<Route path="/" component={Home} exact />
						<Route path="/Home" component={Home} exact />
						<Route path="/bookswap" component={Bookswap} exact />
						<Route path="/Myaccount" component={Myaccount} exact />
						<Route path="/EditMyaccount/:id" component={EditMyaccount} />
						<Route path="/Cservice" component={Cservice} exact />
						<Route path="/Booklist" component={Booklist} exact />
						<Route path="/Request" component={Request} exact />
						<Route
							path="/RequestConfirmation"
							component={RequestConfirmation}
							exact
						/>
						<Route path="/ManageRequests" component={ManageRequests} exact />
						<Route path="/Bookpost" component={Bookpost} exact />
						<Route path="/PostConfirm" component={PostConfirm} exact />
						<Route path="/Login" component={Login} exact />
						<Route path="/Signin" component={Signin} exact />
						<Route component={Nomatch} />
					</Switch>
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
