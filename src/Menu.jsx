import React from "react";
import Container from "react-bootstrap/esm/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router';


export const Menu = ({ categorias, directores }) => {



    return (
        <Navbar bg="light" expand='md' data-bs-theme="light" sticky="top" className="justify-content-start">
            <Container>
                <Navbar.Brand as={Link} to={'/'}>Peliculas</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" bg="light" className="me-auto bg-secondary"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Categorías" id="categorias">
                            {categorias
                                && categorias.map((categoria, index) =>
                                    <NavDropdown.Item key={index} as={Link} to={`/categoria/${categoria}`}>{categoria}</NavDropdown.Item>
                                )
                            }
                        </NavDropdown>
                        <NavDropdown title="Directores" id="directores">
                            {directores
                                && directores.map((director, index) =>
                                    <NavDropdown.Item key={index} as={Link} to={`/director/${director}`}>{director}</NavDropdown.Item>
                                )
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>


            </Container>
        </Navbar >
    );
}