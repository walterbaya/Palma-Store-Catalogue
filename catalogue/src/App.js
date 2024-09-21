import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Zapato from './components/Zapato';
import references from './assets/references/references.json';
import { useState } from 'react';
import Image from 'react-bootstrap/esm/Image';
import Badge from 'react-bootstrap/Badge';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faSquareInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';


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
        zapato.colores.map((color, index) =>
            <Zapato key={zapato.nombre + color}
                nombre={zapato.nombre}
                colores={zapato.colores}
                talles={zapato.talles}
                genero={zapato.genero}
                tipo={zapato.tipo}
                material_interno={zapato.material_interno}
                material_externo={zapato.material_externo}
                descripcion={zapato.descripcion}
                nombre_color_estandar={zapato.nombre_color_estandar}
                nombre_color_seleccionado={color} />))
    );

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


    function renderCarousel() {
        return (
            <Carousel indicators={false} controls={false} fade={true} interval={5000} className="carousel-height" >
                <Carousel.Item>
                    <picture>
                        <img className="img-fluid w-100 d-block carousel-main-image-height" src={require('./assets/images/shoe1.jpg')} alt="Shoe1" />
                    </picture>

                </Carousel.Item>
                <Carousel.Item>
                    <picture>
                        <img className="img-fluid w-100 d-block carousel-main-image-height" src={require('./assets/images/shoe2.jpg')} alt="Shoe2" />
                    </picture>
                </Carousel.Item>
                <Carousel.Item>
                    <picture>
                        <img className="img-fluid w-100 d-block carousel-main-image-height" src={require('./assets/images/shoe3.jpg')} alt="Shoe3" />
                    </picture>
                </Carousel.Item>
            </Carousel>
        );
    }

    return (
        <div className="container-fluid mx-0 px-0 ">
            <nav className="navbar navbar-light py-0 shadow-sm d-flex align-items-center row fixed-top bg-white">
                {/* Toggler Button for Mobile it should open a modal*/}
                <button className="col-2 bg-white border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="col-8 justify-content-center text-center">
                    {/* Logo or Branding */}
                    <div className="navbar-brand p-3">
                        <h1 className="m-0 anton-regular  p-2 rounded underline">Catálogo {new Date().getFullYear()}</h1>
                    </div>
                </div>
                <div className="col-2"></div>
                {/* Navbar Links and Content */}
                <div className="collapse navbar-collapse px-2 py-4 col-12 border-top border-3" id="navbarNav">
                    <ul className="btn-group btn-group-toggle px-5 py-0 m-0 w-100" data-toggle="buttons">
                        <label className={`btn  ${selectedGender === 'ambos' ? 'bg-dark text-white' : 'bg-white border'}`}>
                            <input id="ambos"
                                value="ambos"
                                name="gender"
                                onChange={handleChange} type="radio" /> Ambos

                        </label>
                        <label className={`btn  ${selectedGender === 'hombre' ? 'bg-dark text-white' : 'bg-white border'}`}>
                            <input id="hombre"
                                value="hombre"
                                name="gender"
                                onChange={handleChange}
                                type="radio" /> Hombre
                        </label>

                        <label className={`btn  ${selectedGender === 'mujer' ? 'bg-dark text-white' : 'bg-white border'}`}>
                            <input type="radio"
                                id="mujer"
                                value="mujer"
                                name="gender"
                                onChange={handleChange} /> Mujer
                        </label>
                    </ul>

                </div>
            </nav >


            <div className="jumbotron jumbotron-fluid bg-white separate-navbar d-none">
                <section className="p-0">
                    <h1 id="titulo-principal" className="display-4 p-3">Fluid jumbotron</h1>
                    <p className="lead px-3">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                </section>
                <div className='py-2'>{renderCarousel()}</div>
            </div>

            <div className="container mt-5">
                <section className="row pt-5 px-2">
                    {itemsObtenidos()}
                </section>
            </div>

            <footer className="row bg-dark-brown w-100 mx-0 contact-us py-2  my-0 d-none">
                <div className="col-12 py-2 bg-white">
                    <div className="d-flex flex-row justify-content-center px-4 ">
                        <h3 className="text-center display-4" id="contacto-underline">Contactanos</h3>
                    </div>
                    <ul className="list-group d-flex flex-row text-white  justify-content-evenly py-5">
                        <li className="list-group-item border-0 rounded"><a href="https://github.com/walterbaya"><FontAwesomeIcon icon={faWhatsapp} size="2xl" bounce style={{ color: "#63E6BE", }} /></a></li>
                        <li className="list-group-item border-0 rounded"><a href="https://github.com/walterbaya"><FontAwesomeIcon icon={faTiktok} size="2xl" style={{ color: "#000000" }} bounce /></a></li>
                        <li className="list-group-item border-0 rounded"><a href="mailto:walterbaya1996@gmail.com"><FontAwesomeIcon icon={faFacebook} size="2xl" bounce style={{ color: "#3b5998", }} /></a></li>
                        <li className="list-group-item border-0 rounded"><a href="mailto:walterbaya1996@gmail.com"> <FontAwesomeIcon icon={faSquareInstagram} size="2xl" bounce style={{ color: "#ff00c8", }} /> </a></li>
                    </ul>
                </div>
            </footer>
        </div >
    );
}

export default App;
