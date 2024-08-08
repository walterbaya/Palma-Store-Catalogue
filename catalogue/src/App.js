import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Zapato from './components/Zapato';
import references from './assets/references/references.json';
import { useState } from 'react';
import Badge from 'react-bootstrap/Badge';

function App() {
  const zapatos = references["zapatos"];
  const initialTalles = new Set([35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]);
  const [selectedGender, setSelectedGender] = useState('ambos');
  const [selectedTalle, setSelectedTalle] = useState(new Set(initialTalles));

  const handleChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleChangeTalle = (event) => {
    const value = event.target.value;
    const updatedTalle = new Set(selectedTalle);

    if (value === "todos") {
      if (selectedTalle.size === initialTalles.size) {
        updatedTalle.clear();
      } else {
        initialTalles.forEach(talle => updatedTalle.add(talle));
      }
    } else {
      const talleValue = Number(value);
      if (updatedTalle.has(talleValue)) {
        updatedTalle.delete(talleValue);
      } else {
        updatedTalle.add(talleValue);
      }
    }

    setSelectedTalle(updatedTalle);
  };

  let filteredZapatos = zapatos.filter(zapato =>
    (selectedGender === 'ambos' || zapato.genero.toLowerCase() === selectedGender) &&
    (selectedTalle.size === 0 || zapato.talles.some(talle => selectedTalle.has(talle)))
  );

  const listItems = filteredZapatos.map(zapato => (
    <Zapato
      key={zapato.nombre}
      nombre={zapato.nombre}
      colores={zapato.colores}
      talles={zapato.talles}
      genero={zapato.genero}
      descripcion={zapato.descripcion}
      nombre_color_estandar={zapato.nombre_color_estandar}
    />
  ));

  function itemsObtenidos() {
    if (listItems === null || listItems.length === 0 || selectedTalle.size === 0) {
      return <h1><Badge bg="light" text="dark">
        No se encontraron resultados que cumplan con los criterios seleccionados
      </Badge></h1>;
    }
    return listItems;
  }

  return (
    <div className="container">
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand"><h1 className='text-secondary'>Catálogo Palma Store</h1></div>
          <button className="navbar-toggler d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <div className='col-12 col-md-2'>
              <nav id="sidebar">
                <div className="position-sticky p-5 justify-content-around d-md-none">
                  <h1 className="bg-light">Filtros</h1>
                  <div className='mt-3'>
                    <h5>Género</h5>
                    <div className="position-sticky">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="ambos"
                          value="ambos"
                          name="gender"
                          checked={selectedGender === 'ambos'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="ambos">
                          Ambos
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="hombre"
                          value="hombre"
                          name="gender"
                          checked={selectedGender === 'hombre'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="hombre">
                          Hombre
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="mujer"
                          value="mujer"
                          name="gender"
                          checked={selectedGender === 'mujer'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="mujer">
                          Mujer
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className='mt-3'>
                    <h5>Talles</h5>
                    <div className="position-sticky">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="todos"
                          value="todos"
                          checked={selectedTalle.size === initialTalles.size}
                          onChange={handleChangeTalle}
                        />
                        <label className="form-check-label" htmlFor="todos">
                          Todos
                        </label>
                      </div>
                      {[35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46].map(talle => (
                        <div className="form-check" key={talle}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={talle}
                            value={talle}
                            checked={selectedTalle.has(talle)}
                            onChange={handleChangeTalle}
                          />
                          <label className="form-check-label" htmlFor={talle}>
                            {talle}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </nav>
            </div>
          </div>
        </div>
      </nav>

      <div className="row">
        <div className='col-12 col-md-2 d-md-block d-none'>
          <nav id="sidebar">
            <div className="d-flex flex-row flex-md-column position-sticky p-5 justify-content-around">
              <h1 className="bg-light">Filtros</h1>
              <div className='mt-3'>
                <h5>Género</h5>
                <div className="d-flex flex-row flex-md-column position-sticky">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="ambos"
                      value="ambos"
                      name="gender_n"
                      checked={selectedGender === 'ambos'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="ambos">
                      Ambos
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="hombre"
                      value="hombre"
                      name="gender_n"
                      checked={selectedGender === 'hombre'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="hombre">
                      Hombre
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="mujer"
                      value="mujer"
                      name="gender_n"
                      checked={selectedGender === 'mujer'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="mujer">
                      Mujer
                    </label>
                  </div>
                </div>
              </div>

              <div className='mt-3'>
                <h5>Talles</h5>
                <div className="d-flex flex-row flex-md-column position-sticky">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="todos"
                      value="todos"
                      checked={selectedTalle.size === initialTalles.size}
                      onChange={handleChangeTalle}
                    />
                    <label className="form-check-label" htmlFor="todos">
                      Todos
                    </label>
                  </div>
                  {[35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46].map(talle => (
                    <div className="form-check" key={talle}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={talle}
                        value={talle}
                        checked={selectedTalle.has(talle)}
                        onChange={handleChangeTalle}
                      />
                      <label className="form-check-label" htmlFor={talle}>
                        {talle}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </nav>
        </div>

        <div className="col-12 col-md-10 p-5">
          <div className="row">
            {itemsObtenidos()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
