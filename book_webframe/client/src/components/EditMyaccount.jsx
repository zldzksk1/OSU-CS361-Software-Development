import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditMyaccount extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeDOB = this.onChangeDOB.bind(this);
    this.onChangeMailingAddress = this.onChangeMailingAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      first_name: '',
      last_name: '',
      password: '',
      dob: new Date(),
      mailing_address: '',
      points: 0,
      pending_points: 0,
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/'+ this.props.match.params.id)
      .then(response => {
        this.setState({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          password: response.data.password,
          dob: new Date(response.data.dob),
          mailing_address: response.data.mailing_address,
          points: response.data.points,
          pending_points: response.data.pending_points
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeFirstName(e) {
    this.setState({
      first_name: e.target.value
    })
  }

  onChangeLastName(e) {
    this.setState({
      last_name: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeDOB(date) {
    this.setState({
      dob: date
    })
  }

  onChangeMailingAddress(e) {
    this.setState({
      mailing_address: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      password: this.state.password,
      dob: this.state.dob,
      mailing_address: this.state.mailing_address,
      points: this.state.points, // here to make sure it doesn't reset to 0
      pending_points: this.state.pending_points // here to make sure it doesn't reset to 0
    }

    console.log("edit-user",user);

    axios.post('http://localhost:5000/users/update/' + this.props.match.params.id, user)
      .then(res => console.log(res.data));

    window.location = '/';
    window.alert("Your profile has been updated.")
  }

  render() {
    return (
    <div>
      <div style={{textAlign: "center", padding: "20px"}}>
        <h3 style={{marginTop: 20}}>Edit Personal Info</h3>
        <p style={{marginBottom: 20}}>You can edit your name, password, date of birth and/or mailing address.</p>
      </div>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>First Name: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.first_name}
              onChange={this.onChangeFirstName}>
          </input>
        </div>
        <div className="form-group">
          <label>Last Name: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.last_name}
              onChange={this.onChangeLastName}>
          </input>
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input ref="userInput"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}>
          </input>
        </div>

        <div className="form-group">
          <label>Date of Birth: </label>
          <div>
            <DatePicker
              selected={this.state.dob}
              onChange={this.onChangeDOB}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Mailing Address: </label>
          <input ref="userInput"
              required
              className="form-control"
              value={this.state.mailing_address}
              onChange={this.onChangeMailingAddress}>
          </input>
        </div>

        <div className="form-group">
          <input style={{marginBottom: 30}} type="submit" value="Done" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
