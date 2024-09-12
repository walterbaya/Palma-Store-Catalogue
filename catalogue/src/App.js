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
    const [selectedGender, setSelectedGender] = useState('ambos');

    const handleChange = (event) => {
        setSelectedGender(event.target.value);
    };

    let filteredZapatos = zapatos.filter(zapato =>
        (selectedGender === 'ambos' || zapato.genero.toLowerCase() === selectedGender)
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
            <nav className="navbar navbar-light shadow-sm">
                <div className="container-fluid">
                    {/* Logo or Branding */}
                    <div className="navbar-brand w-50 p-3">
                        <h1 className="m-0 text-secondary homemade-apple text-dark  justify-content-end d-flex">Catálogo {new Date().getFullYear()}</h1>
                    </div>

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
                        <div className="mt-4">
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

            <div className="container">
                <div className="row">
                    {itemsObtenidos()}
                </div>
            </div>
        </div>
    );
}

export default App;
