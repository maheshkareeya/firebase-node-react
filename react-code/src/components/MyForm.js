import React from 'react';
import axios from 'axios';

export default class MyForm extends React.Component {
  state = {
    id: '',
    title: '',
    body: '',
  }

  handleid = event => {
    this.setState({ id: event.target.value });
  }
  handletitle = event => {
    this.setState({ title: event.target.value });
  }
    handlebody = event => {
    this.setState({ body: event.target.value });
  }
  handleSubmit = event => {
    event.preventDefault();

    const user = {"userId": 3,"id": this.state.id,"title": this.state.title,"body": this.state.body}

    axios.post(`http://localhost:5000/api/`, user)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err)=>console.log(err));
  }

  render() {
    return (
      <div>
        <form className="form-inline" onSubmit={this.handleSubmit}>
            <input className="form-control ml-4" type="text" name="id" onChange={this.handleid} />
            <input className="form-control ml-4" type="text" name="title" onChange={this.handletitle} />
            <input className="form-control ml-4" type="text" name="body" onChange={this.handlebody} />
            <button className="btn btn-dark ml-4" type="submit">Add</button>
        </form>
      </div>
    )
  }
}