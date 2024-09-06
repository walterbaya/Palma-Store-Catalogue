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
    //const initialTalles = new Set([35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]);
    //const initialTipos = new Set(['Bota', 'Sandalia', 'Zapatos', 'Zapatilla', 'Mocasin']);
    const [selectedGender, setSelectedGender] = useState('ambos');
    //const [selectedTalle, setSelectedTalle] = useState(new Set(initialTalles));
    //const [selectedTipos, setSelectedTipos] = useState(new Set(initialTipos));

    const handleChange = (event) => {
        setSelectedGender(event.target.value);
    };

    //(selectedTipos.has(zapato.tipo)) &&
    let filteredZapatos = zapatos.filter(zapato =>
        (selectedGender === 'ambos' || zapato.genero.toLowerCase() === selectedGender)
        /*
        &&
    
        (selectedTalle.size === 0 ||
        (Math.max(...zapato.talles) <= Math.max(...selectedTalle) &&
            Math.min(...zapato.talles) >= Math.min(...selectedTalle)))
         */
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

    //|| selectedTalle.size === 0
    function itemsObtenidos() {
        if (listItems === null || listItems.length === 0) {
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

        <div className="container-fluid mx-0 px-0">
            <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
                <div className="container-fluid">
                    {/* Logo or Branding */}
                    <a className="navbar-brand bg-dark" >
                        <h1 className="m-0 text-secondary">Catálogo <span className="text-white">{new Date().getFullYear()}</span></h1>
                    </a>

                    {/* Toggler Button for Mobile */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar Links and Content */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                            {/* Add your nav links here if needed */}
                        </ul>

                        {/* Sidebar/Filter for Mobile View */}
                        <div className="d-md-none mt-4">
                            <div className="position-sticky p-4 bg-light shadow rounded">
                                <h5 className="mb-3">Filtros</h5>
                                <div className="mb-3">
                                    <h6 className="text-muted">Género</h6>
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
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container-fluid p-0 m-0">
                <div className="row pt-3 px-0 mx-0">
                    <div className='col-12 col-md-2 d-md-flex d-none p-0 m-0'>
                        <nav className='w-100'>
                            <div className="d-flex flex-row flex-md-column position-sticky justify-content-center align-items-center">
                                <div className='mt-3'>
                                    <h5>Género</h5>
                                    <div className="position-sticky">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input "
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
                            </div>
                        </nav>
                    </div>
                    <div className="col-12 col-md-10 px-5" id="width-main-container">
                        <div className="row">
                            <h5 id="resultados">Resultados</h5>
                        </div>
                        <div className="row">
                            {itemsObtenidos()}
                        </div>
                    </div>

                </div>s
            </div>
        </div>
    );
}

export default App;