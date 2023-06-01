import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import { AuthContext } from '../store/auth-context';

const NavbarHeader = () => {
  const authCtx=useContext(AuthContext)
  const isLoggedIn=authCtx.isLoggedIn

  return (
    <Navbar bg="light" expand="lg">
    <Container fluid>
      <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="#action2">Link</Nav.Link>
                    <Nav.Link href="#" >
            Link
          </Nav.Link>
          </Nav>
          <Nav>        
            {!isLoggedIn && (<li><Nav.Link href="/login">LOGIN</Nav.Link></li>)}      
            {isLoggedIn && (<li><Nav.Link href='/profile'>Profile</Nav.Link></li>)}
            {isLoggedIn &&(<li><Button variant='info'>Logout</Button></li>)}       
          </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavbarHeader