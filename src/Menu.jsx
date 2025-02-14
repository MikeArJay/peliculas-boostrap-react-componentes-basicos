import React from "react";
import Container from "react-bootstrap/esm/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router';


export const Menu = ({ categorias, directores }) => {



    return (
        <Navbar bg="light" data-bs-theme="light" sticky="top">
            <Container>
                <Link  to='/'><Navbar.Brand>Peliculas</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="me-auto">
                        <NavDropdown title="Categorías" id="categorias">
                            {categorias && categorias.map( (categoria, index) =>
                                <NavDropdown.Item key={index}><Link to={`/${categoria}`}>{categoria}</Link></NavDropdown.Item>
                            )
                            }
                        </NavDropdown>
                        <NavDropdown title="Directores" id="directores">
                            {directores && directores.map( (director, index) =>
                                <NavDropdown.Item key={index}><Link to={`/${director}`}>{director}</Link></NavDropdown.Item>
                            )
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>


            </Container>
        </Navbar >
    );
}