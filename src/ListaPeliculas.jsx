
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import { Pelicula } from './Pelicula';
import { useParams } from 'react-router';







export const ListaPeliculas = ({ dataPeliculas }) => {
    const [selectedPelicula, setSelectedPelicula] = useState(null);
    const [filteredPeliculas, setFilteredPeliculas] = useState(null);



    // Filtros
    const { categoriaId, directorId } = useParams();

    useEffect(() => {
        if (dataPeliculas.length > 0) {
        const newFilteredPeliculas = dataPeliculas.filter(pelicula =>
            categoriaId ? // filtro de categoria si existe categoriaId
                (Array.isArray(pelicula.categoria) ? pelicula.categoria.includes(categoriaId) : pelicula.categoria == categoriaId)
                : directorId ? // filtro director si existe directorId
                    pelicula.director == directorId
                    : pelicula // si no existe ni directorId ni categoriaId se incluiran todas las peliculas
        )
        console.log(newFilteredPeliculas)
        setFilteredPeliculas(newFilteredPeliculas);

        // Actualizar pelicula selecionada
        if (newFilteredPeliculas.length > 0) {
            setSelectedPelicula(newFilteredPeliculas[0]);
          } else {
            setSelectedPelicula(null); // Por si ninguna pelicula cumpliera con el filtro (en este caso no es posible)
          }
    }

    }, [dataPeliculas, categoriaId, directorId]);







    return (
        <>
            <h1 className="display-1 text-center mb-5 font-weight-bold">{categoriaId ? categoriaId : directorId ? directorId : "Peliculas"}</h1>
            {selectedPelicula && (
                <Container >
                    <Row>
                        <Col md={8} className='d-flex'>
                            <Image className='w-100' alt='Imagen Película' src={'/imagenes/' + selectedPelicula.foto} fluid thumbnail />
                        </Col>
                        <Col md={4} className='d-flex flex-column'>
                            <Table className='h-100 w-100' striped >
                                <thead>
                                    <tr>
                                        <td colSpan={2} align='center' className='align-middle'><h1>{selectedPelicula.titulo}</h1></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td align='left' className='align-middle'><h2>Director:</h2></td>
                                        <td align='right' className='align-middle'>{selectedPelicula.director}</td>
                                    </tr>
                                    <tr>
                                        <td align='left' className='align-middle'><h2>Actores:</h2></td>
                                        <td align='right' className='align-middle'>
                                            <ListGroup>
                                                {selectedPelicula.actoresPrincipales.map((actor, index) =>
                                                    <ListGroupItem key={index}>{actor}</ListGroupItem>
                                                )}
                                            </ListGroup>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} align='center' className='align-middle'>{selectedPelicula.sinopsis}</td>
                                    </tr>
                                </tbody>


                            </Table>
                        </Col>
                    </Row>
                    <Row className='mt-4' >
                        {filteredPeliculas && (filteredPeliculas.map((dataPelicula, index) => (
                            <Col key={index} sm={12} md={4} lg={3} className='mb-4 d-flex'>
                                <Pelicula data={dataPelicula} setSelectedPelicula={setSelectedPelicula} />
                            </Col>
                        ))
                        )}


                    </Row>

                </Container>
            )
            }

        </>
    )
}

