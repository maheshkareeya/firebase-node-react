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



loadAllItems(){
    axios.get(`http://localhost:5000/api/`)
    .then(res => {
      const persons = res.data;
      this.setState({ persons });
    })
}
componentDidMount(){
this.loadAllItems();
}
    handleDelete = (memo) =>{
       
   
       axios.get(`http://localhost:5000/api/delete/`+memo)
          .then(res => {
            // console.log(res);
            if(res.data.message === "deleted"){
                axios.get(`http://localhost:5000/api/`)
                .then(res => {
                  const persons = res.data;
                  this.setState({ persons });
                })
            }else{
                console.log("notok");
            }
          })
          .catch((err)=>console.log(err))
     

      }

      
    render(){
        return(
            <div>
<Table >
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
   
    <Dropdown.Item onClick={this.handleEdit}>Edit</Dropdown.Item>
    <Dropdown.Item onClick={this.handleDelete.bind(this, person.id)}>Delete</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown></td></tr>)}
    
  </tbody>
</Table>
            </div>
        )
    }
}

