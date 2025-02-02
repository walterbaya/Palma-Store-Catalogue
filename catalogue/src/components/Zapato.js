import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import React from "react";
import "./Zapato.css";


class Zapato extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: props.nombre || "",
            genero: props.genero || "",
            talles: props.talles || [],
            colores: props.colores || [],
            material_interno: props.material_interno || "",
            material_externo: props.material_externo || "",
            tipo: props.tipo || "",
            color_actual: props.nombre_color_seleccionado,
            nombre_color_estandar: props.nombre_color_estandar,
            nombre_color_seleccionado: props.nombre_color_seleccionado || "",
            urls_imagenes: this.getImageUrls(props.nombre, props.nombre_color_seleccionado),
            url_actual: this.getImageUrls(props.nombre, props.nombre_color_seleccionado)[0],
            showModal: false,
            selectedImage: "", // Añadido para el manejo del modal
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.color_actual !== this.state.color_actual) {
            this.setState({
                urls_imagenes: this.getImageUrls(this.props.nombre, this.state.color_actual)
            });
        }
    }

    /**
     * Obtiene las urls de las 3 imagenes asociadas al zapato con nombre y color pasados por parametro.
     *
     * @param {string} nombre
     * @param {string} color_actual
     * @private
     */

    getImageUrls(nombre, color_actual) {
        const imageNames = ['imagen1', 'imagen2', 'imagen3'];
        const extensions = ['.jpg', '.JPG'];
        const urls = [];

        imageNames.forEach((imageName) => {
            extensions.forEach((extension) => {
                try {
                    const imageUrl = require(`../assets/images/zapatos/${nombre}/${color_actual}/${imageName}${extension}`);
                    urls.push(imageUrl); // Agrega la imagen a la lista si se carga correctamente
                    return; // Detiene la búsqueda de otras extensiones para esta imagen
                } catch (error) {
                    // No hacer nada si ocurre un error, intentar con la siguiente extensión
                }
            });
        });

        return urls;
    }

    render_talles() {
        const [talleMin, talleMax] = this.state.talles;
        return <span>{talleMin} al {talleMax}</span>;
    }

    capitalizeFirstLetter(str) {
        if (!str) return str; // Maneja el caso de cadenas vacías o nulas
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    change_color = (color) => {
        this.setState({ color_actual: color });
        this.setState({ url_actual: this.loadImage(this.state.nombre, color, 'imagen1') });
    }

    loadImage(nombre, color, imageName) {
        const extensions = ['.jpg', '.JPG'];
        for (const ext of extensions) {
            try {
                // Intenta requerir la imagen con cada extensión
                return require(`../assets/images/zapatos/${nombre}/${color}/${imageName}${ext}`);
            } catch (error) {
                // Si ocurre un error, intenta la siguiente extensión
            }
        }

        // Devuelve una imagen de reemplazo si ninguna extensión está disponible (opcional)
        return null;
    }

    change_url = (url) => {
        this.setState({ url_actual: url })
    }


    render_colores() {
        const listItems = this.state.colores.map((color, index) => (
            <picture key={color} >
                <Image
                    onClick={() => this.change_color(color)}
                    src={this.loadImage(this.state.nombre, color, 'imagen1')}
                    alt={`Color ${color}`}
                    className={`me-2 color-images border shoe-hover rounded ${(color === this.state.color_actual) ? 'border-secondary border-1' : ''}`}
                    style={{
                        cursor: 'pointer',
                    }}

                    fluid
                />
            </picture>
        ));

        return <div id="colores" className="d-flex flex-row justify-content-center">{listItems}</div>;
    }

    render_carousel_md() {
        const items = this.state.urls_imagenes.map((imagen_url, index) => (
            <picture key={index} className="carousel-small-image">
                <Image
                    src={imagen_url}
                    fluid
                    onClick={() => this.change_url(imagen_url)}
                    style={{ cursor: 'pointer' }}
                />
            </picture>
        ));


        return <div className="d-none d-md-flex flex-column justify-content-evenly align-items-end py-5 col-2 col-md-0">{items}</div>;
    }

    render_carousel_items() {
        return this.state.urls_imagenes.map((imagen_url, index) => (
            <Carousel.Item key={index} className="px-3 pb-3">
                <picture key={this.state.nombre}>
                    <Image
                        className="w-100 carousel-image"
                        src={imagen_url}
                        fluid
                        onClick={() => this.handleImageClick(imagen_url)}
                        style={{ cursor: 'pointer' }}
                    />
                </picture>
            </Carousel.Item >
        ));
    }


    render_text_color() {
        return this.capitalizeFirstLetter(
            this.state.color_actual
        );
    }

    handleImageClick = (image) => {
        this.setState({ showModal: true, selectedImage: image });
    }

    handleClose = () => {
        this.setState({ showModal: false, selectedImage: "" });
        this.change_color(this.state.nombre_color_seleccionado);
    }


    render() {
        return (
            <div className="col-xl-3 col-md-4 col-6 mb-4">
                <Card className="product-card shadow-hover">
                    <div className="card-image-container">
                        <img
                            src={this.loadImage(this.state.nombre, this.state.nombre_color_seleccionado, 'imagen1')}
                            alt={this.state.nombre}
                            className="card-image"
                            onClick={() => this.handleImageClick(this.state.urls_imagenes[0])}
                        />
                        <div className="image-overlay">
                            <div className="product-info">
                                <h3 className="product-title">{this.capitalizeFirstLetter(this.state.nombre)}</h3>
                                <p className="product-color">{this.state.nombre_color_seleccionado}</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Modal
                    show={this.state.showModal}
                    onHide={this.handleClose}
                    centered
                    size="xl"
                    className="premium-modal"
                    fullscreen="lg-down"
                >
                    <Modal.Header className="border-bottom-0 px-4 pt-4">
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <div className="branding">
                                <h2 className="modal-title mb-0 playfair-font">{this.capitalizeFirstLetter(this.state.nombre)}</h2>
                                <small className="text-muted">COLECCIÓN {new Date().getFullYear()}</small>
                            </div>
                            <button
                                type="button"
                                className="btn-close-custom"
                                onClick={this.handleClose}
                                aria-label="Close"
                            >
                                &times;
                            </button>
                        </div>
                    </Modal.Header>

                    <Modal.Body className="px-4 pb-4 pt-0">
                        <div className="row gx-5">
                            {/* Galería lateral */}
                            <div className="col-lg-2 d-none d-lg-block">
                                <div className="sticky-gallery pe-3">
                                    {this.state.urls_imagenes.map((url, index) => (
                                        <div
                                            key={index}
                                            className={`gallery-thumbnail mb-3 position-relative ${url === this.state.url_actual ? 'active' : ''}`}
                                            onClick={() => this.change_url(url)}
                                        >
                                            <img
                                                src={url}
                                                alt={`Vista ${index + 1}`}
                                                className="img-fluid rounded-sm"
                                            />
                                            <div className="thumbnail-overlay"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Imagen principal - Más grande */}
                            <div className="col-lg-7 col-md-8">
                                <div className="main-image-container position-relative bg-light h-100">
                                    <div className="image-magnifier h-100">
                                        <img
                                            src={this.state.url_actual}
                                            alt="Vista principal"
                                            className="main-image img-fluid w-100 h-100 object-fit-cover"
                                        />
                                    </div>
                                    <div className="badge-premium">CUERO VACUNO</div>
                                </div>
                            </div>

                            {/* Detalles del producto - Más compacto */}
                            <div className="col-lg-3 col-md-4 mt-md-0 mt-4">
                                <div className="product-details ps-lg-4 h-100">
                                    <div className="color-selector-section mb-4">
                                        <h5 className="section-title mb-3">COLORES</h5>
                                        <div className="d-flex flex-wrap gap-2">
                                            {this.state.colores.map((color) => (
                                                <div
                                                    key={color}
                                                    className="color-item position-relative"
                                                    onClick={() => this.change_color(color)}
                                                >
                                                    <div
                                                        className={`color-swatch ${color === this.state.color_actual ? 'active' : ''}`}
                                                        style={{
                                                            backgroundImage: `url(${this.loadImage(this.state.nombre, color, 'imagen1')})`
                                                        }}
                                                    >
                                                        {color === this.state.color_actual &&
                                                            <div className="selected-indicator"></div>
                                                        }
                                                    </div>
                                                    <span className="color-name">{color}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="specs-section pt-4">
                                        <h5 className="section-title mb-3">DETALLES</h5>
                                        <dl className="specs-grid">
                                            <div className="spec-item">
                                                <dt>Estilo:</dt>
                                                <dd>{this.state.tipo}</dd>
                                            </div>
                                            <div className="spec-item">
                                                <dt>Tallas:</dt>
                                                <dd>{this.render_talles()}</dd>
                                            </div>
                                            <div className="spec-item">
                                                <dt>Forro:</dt>
                                                <dd>{this.state.material_interno}</dd>
                                            </div>
                                            <div className="spec-item">
                                                <dt>Exterior:</dt>
                                                <dd>{this.state.material_externo}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default Zapato;
