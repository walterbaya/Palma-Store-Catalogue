import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Zapato from './components/Zapato';
import references from './assets/references/references.json';
import { useState } from 'react';
import { Container, Row, Col, Image, Badge, Carousel, Navbar, Nav, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faTiktok, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function App() {
    const zapatos = references["zapatos"];
    const [selectedGender, setSelectedGender] = useState('ambos');

    const handleGenderChange = (gender) => {
        setSelectedGender(gender);
    };

    const filteredZapatos = zapatos.filter(zapato =>
        selectedGender === 'ambos' || zapato.genero.toLowerCase() === selectedGender
    );

    const listItems = filteredZapatos.map((zapato) => (
        zapato.colores.map((color) => (
            <Zapato 
                key={`${zapato.nombre}-${color}`}
                {...zapato}
                nombre_color_seleccionado={color}
            />
        ))
    ));

    const renderNoResults = () => (
        <div className="no-results-container text-center py-5">
            <Image
                src={require('./assets/images/no-resultados.jpg')}
                fluid
                className="no-results-image"
            />
            <h2 className="mt-4 text-muted">No encontramos resultados</h2>
            <p className="text-secondary">
                Imagen de <a href="https://www.freepik.es" target="_blank" rel="noopener noreferrer">Freepik</a>
            </p>
        </div>
    );

    const renderCarousel = () => (
        <Carousel fade controls={false} indicators className="hero-carousel">
            {[1, 2, 3].map((num) => (
                <Carousel.Item key={num}>
                    <div className="carousel-image-container">
                        <Image
                            src={require(`./assets/images/shoe${num}.jpg`)}
                            className="carousel-image"
                            alt={`Modelo ${num}`}
                            fluid
                        />
                        <div className="carousel-overlay">
                            <h2 className="carousel-title">Colección {new Date().getFullYear()}</h2>
                            <p className="carousel-subtitle">Calzado premium en cuero genuino</p>
                        </div>
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );

    return (
        <div className="app-container">
            {/* Navbar Mejorado */}
            <Navbar expand="lg" fixed="top" className="main-navbar shadow-sm">
                <Container>
                    <Navbar.Brand className="navbar-brand">
                        <span className="brand-text">CALZADOS PALMA SHOES</span>
                        <span className="brand-year">{new Date().getFullYear()}</span>
                    </Navbar.Brand>
                    
                    <Navbar.Toggle aria-controls="main-nav">
                        <FontAwesomeIcon icon={faBars} className="navbar-toggle-icon" />
                    </Navbar.Toggle>
                    
                    <Navbar.Collapse id="main-nav">
                        <Nav className="filter-controls mx-auto">
                            {['ambos', 'hombre', 'mujer'].map((gender) => (
                                <button
                                    key={gender}
                                    className={`filter-btn ${selectedGender === gender ? 'active' : ''}`}
                                    onClick={() => handleGenderChange(gender)}
                                >
                                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                                </button>
                            ))}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <section className="hero-section">
                {renderCarousel()}
            </section>

            {/* Product Grid */}
            <main className="product-grid-section">
                <Container>
                    <Row className="g-4 py-5">
                        {listItems.length > 0 ? listItems : renderNoResults()}
                    </Row>
                </Container>
            </main>

            {/* Footer Mejorado */}
            <footer className="main-footer bg-dark text-light py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} className="text-center">
                            <h3 className="footer-title mb-4">Seguinos en redes</h3>
                            <div className="social-icons d-flex justify-content-center gap-4">
                                <a href="#" className="social-link whatsapp">
                                    <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                                </a>
                                <a href="#" className="social-link instagram">
                                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                                </a>
                                <a href="#" className="social-link tiktok">
                                    <FontAwesomeIcon icon={faTiktok} size="2x" />
                                </a>
                                <a href="#" className="social-link facebook">
                                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                                </a>
                            </div>
                            <p className="copyright mt-4 mb-0">
                                © {new Date().getFullYear()} Calzados Palma Shoes.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
}

export default App;