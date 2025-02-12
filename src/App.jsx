import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import { Pelicula } from './Pelicula';
import { Menu } from './Menu';






function App() {
  const [dataPeliculas, setDataPeliculas] = useState([]);
  const [selectedPelicula, setSelectedPelicula] = useState(null);

  // funcion obtención datos
  const fetchPeliculas = async () => {
    try {
      const response = await fetch('peliculas.json');
      const data = await response.json();
      setDataPeliculas(data);
    } catch (error) {
      console.error('Error al cargar las películas:', error);
    }
  };


  useEffect(() => {
    fetchPeliculas();

  }, []);

  useEffect(() => {
    if (dataPeliculas.length > 0) {
      setSelectedPelicula(dataPeliculas[0]);
    }

  }, [dataPeliculas]);




  return (
    <>
    <Menu dataPeliculas={dataPeliculas}/>
      <h1 className="display-1 text-center mb-5 font-weight-bold">Peliculas</h1>
      {selectedPelicula && (
        <Container >
          <Row>
            <Col md={8} className='d-flex'>
              <Image className='w-100' alt='Imagen Película' src={'/imagenes/' + selectedPelicula.foto} fluid thumbnail />
            </Col>
            <Col md={4} className='d-flex flex-column'>
              <Table className='h-100'striped >
                <thead>
                  <tr>
                    <td colSpan={2} align='center'><h1>{selectedPelicula.titulo}</h1></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td align='left'><h2>Director:</h2></td>
                    <td align='right'>{selectedPelicula.director}</td>
                  </tr>
                  <tr>
                    <td align='left'><h2>Actores:</h2></td>
                    <td align='right'>
                      <ListGroup>
                        {selectedPelicula.actoresPrincipales.map((actor, index) =>
                          <ListGroupItem key={index}>{actor}</ListGroupItem>
                        )}
                      </ListGroup>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} align='center'>{selectedPelicula.sinopsis}</td>
                  </tr>
                </tbody>


              </Table>
            </Col>
          </Row>
          <Row className='mt-4'>
            {dataPeliculas && ( dataPeliculas.map((dataPelicula, index)=>(
              <Col key={index} sm={12} md={4} lg={3} className='mb-4'>
                <Pelicula data={dataPelicula} setSelectedPelicula={setSelectedPelicula}/>
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

export default App
