import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Table from "react-bootstrap/esm/Table";
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import Button from 'react-bootstrap/Button';



export const Pelicula = ({ data, setSelectedPelicula }) => {
    const [mas, setMas] = useState(false);

    const handleClickMas = () => {
        setMas((prevState) => !prevState);
    }


    return (
        <Card >
            <Card.Img variant="top" src={`./imagenes/${data.foto}`} alt={`Imagen ${data.titulo}`} />
            <Card.Body>
                <Card.Title align='center'>{data.titulo}</Card.Title>

                <Table borderless className='h-100' striped >
                    <tbody>
                        <tr>
                            <td align='left'>Director:</td>
                            <td align='right'>{data.director}</td>
                        </tr>
                        <tr>
                            <td align='left' colSpan={2}>Actores:</td>
                        </tr>

                        <tr>
                            <td align='center' colSpan={2}>
                                <ListGroup>
                                    {data.actoresPrincipales.map((actor, index) =>
                                        <ListGroupItem key={index}>{actor}</ListGroupItem>
                                    )}
                                </ListGroup>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div className="d-flex justify-content-between mt-3">
                    <Button className="w-100 me-1" variant="info" onClick={handleClickMas}>
                        {mas ? "Menos" : "Más"}
                    </Button>
                    <Button className="w-100 ms-1" variant="light" onClick={()=>setSelectedPelicula(data)}>
                        Seleccionar
                    </Button>
                </div>

                {mas && (<Card.Text className="mt-3">{data.sinopsis}</Card.Text>)}


            </Card.Body>
        </Card>

    );
};