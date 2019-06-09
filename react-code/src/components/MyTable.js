import React from 'react';
import{Table,Dropdown} from "react-bootstrap"
import axios from "axios"
export default class MyTable extends React.Component{

    constructor(params){
        super(params)
        this.state = {
            persons: []
          }
    }
componentDidMount(){
    axios.get(`http://localhost:5000/api/`)
    .then(res => {
      const persons = res.data;
      this.setState({ persons });
    })}

    render(){
        return(
            <div>
<Table varient="dark" striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Body</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  { this.state.persons.map(person => <tr><td>{person.data.id}</td><td>{person.data.title}</td><td>{person.data.body}</td><td><Dropdown>
  <Dropdown.Toggle variant="dark" id="dropdown-basic">
    Action
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown></td></tr>)}
    
  </tbody>
</Table>
            </div>
        )
    }
}

