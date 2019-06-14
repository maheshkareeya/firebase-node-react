import React from 'react';
import{Nav,Navbar} from "react-bootstrap"

export default class MyNavBar extends React.Component{
    render(){
        return(
            <div>
                  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Kariya</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
  
    </Nav>
  
  </Navbar>
            </div>
        )
    }
}
