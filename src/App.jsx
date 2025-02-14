import { useEffect, useState } from 'react';
import { ListaPeliculas } from './ListaPeliculas';
import { Menu } from './Menu';
import { BrowserRouter, Route, Routes } from 'react-router';






function App() {
  const [dataPeliculas, setDataPeliculas] = useState([]);
  const [categorias, setCategorias] = useState(null);
  const [directores, setDirectores] = useState(null);

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

// useEfect para listar directores y categorías
  useEffect(() => {
    if (dataPeliculas.length > 0) {

      //obtener un set de directores y pasar a lista
      const newDirectores = [...new Set(dataPeliculas.map(pelicula => pelicula.director))];
      setDirectores(newDirectores);


      // obtener un set de Categorías 
      // como hay array y tambien valores individuales hay que usar flatmap y controlar que los valores individuales se devuelvan tambien como array
      const newCategorias = [
        ...new Set(
          dataPeliculas.flatMap(pelicula =>
            Array.isArray(pelicula.categoria) ? pelicula.categoria : [pelicula.categoria]
          )
        )
      ]
      setCategorias(newCategorias);

    }

  }, [dataPeliculas]);


  return (
    <BrowserRouter>
      <Menu categorias={categorias} directores={directores} />
      <Routes>
        {/*-------------------Home----------------------*/}

        <Route path="/" element={<ListaPeliculas dataPeliculas={dataPeliculas} />} />

        {/*---------Listado y filtrado de categorías---------*/}

        {categorias && (categorias.map(categoria =>
          <Route key={categoria} path={`/${categoria}`}
            element={
              <ListaPeliculas
                dataPeliculas={dataPeliculas.filter(
                  pelicula => Array.isArray(pelicula.categoria) ? pelicula.categoria.includes(categoria) : pelicula.categoria == categoria
                )}
              />
            }
          />
        ))
        }

        {/*---------Listado y Filtrado de directores---------*/}

        {directores && (directores.map(director =>
          <Route key={director} path={`/${director}`}
            element={
              <ListaPeliculas dataPeliculas={dataPeliculas.filter(pelicula => pelicula.director == director)}/>
            }
          />
        ))

        }
      </Routes>



    </BrowserRouter>
  )
}

export default App
