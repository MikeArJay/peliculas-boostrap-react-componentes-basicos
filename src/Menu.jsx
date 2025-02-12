import React from "react";
import Container from "react-bootstrap/esm/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export const Menu = ({ categorias, directores }) => {



    return (
        <Navbar bg="light" data-bs-theme="light" sticky="top">
            <Container>
                <Navbar.Brand>Peliculas</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Categorías" id="categorias">
                            {categorias && categorias.map( (categoria, index) =>
                                <NavDropdown.Item key={index}>{categoria}</NavDropdown.Item>
                            )
                            }
                        </NavDropdown>
                        <NavDropdown title="Directores" id="directores">
                            {directores && directores.map( (director, index) =>
                                <NavDropdown.Item key={index}>{director}</NavDropdown.Item>
                            )
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>


            </Container>
        </Navbar >
    );
}