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
      const response = await fetch('/peliculas.json');
      const data = await response.json();
      console.log(data);
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

        <Route 
        path="/" 
        element={<ListaPeliculas dataPeliculas={dataPeliculas} />} 
        />

        <Route
          path={'/categoria/:categoriaId'}
          element={<ListaPeliculas dataPeliculas={dataPeliculas} />}
        />

        <Route
          path={'/director/:directorId'}
          element={<ListaPeliculas dataPeliculas={dataPeliculas} />}
        />
      
      </Routes>



    </BrowserRouter>
  )
}

export default App
