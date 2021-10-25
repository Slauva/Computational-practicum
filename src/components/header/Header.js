import React, {Component} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

export default class Header extends Component{
    render(){
        return (
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Computational Practicum</Navbar.Brand>
                    <Nav className="me-auto">
                        <LinkContainer to={"/"}>
                            <Nav.Link>Solutions of the equations</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={"/lte"}>
                            <Nav.Link>LTE</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={"/gte"}>
                            <Nav.Link>GTE</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Container>
            </Navbar>
        );
    }
}