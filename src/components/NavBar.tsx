import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {LinkContainer} from 'react-router-bootstrap';
import { Outlet, Link } from "react-router-dom";

export const NavBar: React.FC<{}> = () => {
  return (
    <>
      <br />
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Kavak</Navbar.Brand>
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to={`comprar-um-carro/`}>
              <Nav.Link>Comprar um carro</Nav.Link>
            </LinkContainer>
            <LinkContainer to={`venda-seu-carro/`}>
              <Nav.Link>Venda seu carro</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Digite o modelo ou marca"
              className="me-2"
              aria-label="Search"
            />
            <Button>Pesquisar</Button>
          </Form>
        </Container>
      </Navbar>
    </>
  );
}
