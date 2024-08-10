import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Zapato from './components/Zapato';
import references from './assets/references/references.json';
import { useState } from 'react';
import Image from 'react-bootstrap/esm/Image';
import Badge from 'react-bootstrap/Badge';

function App() {
  const zapatos = references["zapatos"];
  const initialTalles = new Set([35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]);
  //const initialTipos = new Set(['Bota', 'Sandalia', 'Zapatos', 'Zapatilla', 'Mocasin']);
  const [selectedGender, setSelectedGender] = useState('ambos');
  const [selectedTalle, setSelectedTalle] = useState(new Set(initialTalles));
  //const [selectedTipos, setSelectedTipos] = useState(new Set(initialTipos));

  const handleChange = (event) => {
    setSelectedGender(event.target.value);
  };

  /*const handleChangeTipos = (event) => {
    const value = event.target.value;
    const updatedTipos = new Set(selectedTipos);
  
    if (value === "todos") {
      if (selectedTipos.size === initialTipos.size) {
        updatedTipos.clear();
      } else {
        initialTipos.forEach(tipos => updatedTipos.add(tipos));
      }
    } else {
      const tipoValue = Number(value);
      if (updatedTipos.has(tipoValue)) {
        updatedTipos.delete(tipoValue);
      } else {
        updatedTipos.add(tipoValue);
      }
    }
 
    setSelectedTipos(updatedTipos);
  };
  */

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

  //(selectedTipos.has(zapato.tipo)) &&
  let filteredZapatos = zapatos.filter(zapato =>
    (selectedGender === 'ambos' || zapato.genero.toLowerCase() === selectedGender) &&
    
    (selectedTalle.size === 0 ||
      (Math.max(...zapato.talles) <= Math.max(...selectedTalle) &&
        Math.min(...zapato.talles) >= Math.min(...selectedTalle)))
  );

  const listItems = filteredZapatos.map((zapato, index) => (
    <Zapato
      key={zapato.nombre}
      nombre={zapato.nombre}
      colores={zapato.colores}
      talles={zapato.talles}
      genero={zapato.genero}
      tipo={zapato.tipo}
      material_interno={zapato.material_interno}
      material_externo={zapato.material_externo}
      descripcion={zapato.descripcion}
      nombre_color_estandar={zapato.nombre_color_estandar} />
  ));

  /** tipos
   * 
   *                   <!--
                  <div className='mt-3'>
                    <h5>Tipos</h5>
                    <div className="position-sticky">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="todos"
                          value="todos"
                          checked={selectedTipos.size === initialTipos.size}
                          onChange={handleChangeTipos}
                        />
                        <label className="form-check-label" htmlFor="todos">
                          Todos
                        </label>
                      </div>
                      {['Bota', 'Sandalia', 'Zapatos', 'Zapatilla', 'Mocasin'].map(tipo => (
                        <div className="form-check" key={tipo}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={tipo}
                            value={tipo}
                            checked={selectedTipos.has(tipo)}
                            onChange={handleChangeTipos}
                          />
                          <label className="form-check-label" htmlFor={tipo}>
                            {tipo}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
   */


  /** tipos sidebar             <div className='mt-3'>
    <h5>Tipos</h5>
    <div className="position-sticky">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="todos"
          value="todos"
          checked={selectedTipos.size === initialTipos.size}
          onChange={handleChangeTipos}
        />
        <label className="form-check-label" htmlFor="todos">
          Todos
        </label>
      </div>
      {['Bota', 'Sandalia', 'Zapatos', 'Zapatilla', 'Mocasin'].map(tipo => (
        <div className="form-check" key={tipo}>
          <input
            className="form-check-input"
            type="checkbox"
            id={tipo}
            value={tipo}
            checked={selectedTipos.has(tipo)}
            onChange={handleChangeTipos}
          />
          <label className="form-check-label" htmlFor={tipo}>
            {tipo}
          </label>
        </div>
      ))}
    </div>
  </div> */

  function itemsObtenidos() {
    if (listItems === null || listItems.length === 0 || selectedTalle.size === 0) {
      return (
        <div className="d-flex flex-column align-items-start justify-content-center" style={{ zIndex: 1000 }}>
          <h1>
            <Badge bg="white" text="dark">No se encontraron resultados</Badge>
          </h1>
          <Image
            src={require(`./assets/images/no-resultados.jpg`)}
            fluid
            style={{ zIndex: 1000, height: '500px', width: '500px' }}
          />
          <div className='text-secondary'>
            Imagen de <a href="https://www.freepik.es/vector-gratis/dibujado-mano-ilustracion-datos_49342678.htm#query=no%20hay%20resultados&position=0&from_view=keyword&track=ais_hybrid&uuid=d88a0c34-3987-47f3-b725-d3e8cd952811">Freepik</a>
          </div>
        </div>
      );
    }
    return listItems;
  }

  return (
    <div className="container-fluid">
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand d-flex align-items-center justify-content-center w-100 p-0 m-0" style={{ 'maxHeight': '126px' }}>
            <Image
              src={require(`./assets/images/logo.jpg`)}
              fluid
            />
          </div>
          <div className='w-100 d-flex justify-content-center mt-3 bg-dark text-white'>
            <h1>Catálogo</h1>
          </div>
          <button className="navbar-toggler d-md-none mt-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
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
                <div className="position-sticky">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="ambos"
                      value="ambos"
                      name="gender_f"
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
                      name="gender_f"
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
                      name="gender_f"
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
        <div className="col-12 col-md-10">
          <div className='container-fluid'>
            <div className="row">
              {itemsObtenidos()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
