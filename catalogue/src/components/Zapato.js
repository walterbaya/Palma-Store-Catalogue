import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from "react";
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
        this.setState({url_actual: this.loadImage(this.state.nombre, color, 'imagen1')});
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
        <div className="col-xl-3 col-md-4 col-6 m-0 p-2 border-0">
            <Card className="border-card shoe-hover">
                <picture key={this.state.nombre} className="main-image-container d-block" >
                    <Image
                        className="main-image"
                        src={this.loadImage(this.state.nombre, this.state.nombre_color_seleccionado, 'imagen1')}
                        fluid
                        onClick={() => this.handleImageClick(this.state.urls_imagenes[0])}
                        style={{ cursor: 'pointer' }}
                    />
                </picture>
                <Card.Body>
                    <Card.Text onClick={() => this.handleImageClick(this.state.urls_imagenes[0])} className="text-dark shoe-name text-decoration-none nombre_articulo">
                        <strong>Articulo {this.capitalizeFirstLetter(this.state.nombre)}</strong> <br />
                        <span className="shoe-color-name"> <strong>Color: </strong> {((this.state.nombre_color_seleccionado === 'estandar') ? this.state.nombre_color_estandar : this.state.nombre_color_seleccionado)} </span>
                    </Card.Text>

                </Card.Body>

            </Card>

            {/* Modal para mostrar la imagen a pantalla completa */}
            <Modal show={this.state.showModal} onHide={this.handleClose} centered fullscreen={true}>
                <Modal.Header className="d-flex justify-content-end modal-header">
                    <button className="col-2 bg-white border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="col-8 justify-content-center text-center">
                        <div className="navbar-brand">
                            <h1 className="m-0 anton-regular py-2 rounded underline">Catálogo {new Date().getFullYear()}</h1>
                        </div>
                    </div>
                    <div className="col-2"></div>

                    <Button variant="white" onClick={this.handleClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body className="py-0 my-0">
                    <div className="row d-flex align-items-start">
                        {this.render_carousel_md()}
                        <Carousel interval={null} controls={false} indicators={true} data-bs-theme="dark" className="d-sm-none col-12 p-3 bg-grey">
                            {this.render_carousel_items()}
                        </Carousel>

                        <picture key={this.state.nombre} className="d-none d-md-flex col-4 px-0 ">
                            <Image
                                className="w-100 carousel-image"
                                src={this.state.url_actual}
                                fluid
                                style={{ cursor: 'pointer' }}
                            />
                        </picture>

                        <Card.Body className="d-flex flex-column col-sm-6 col-12 px-3 py-0">
                            <Card.Title className="fw-light text-secondary border-bottom p-0 mt-3">
                                <h2 className="p-0 m-0 klee-one-semibold big-letter text-dark py-4">Artículo {this.capitalizeFirstLetter(this.state.nombre)}</h2>
                            </Card.Title>

                            <div className="d-flex justify-content-start py-4">{this.render_colores()}</div>
                            <ul className="list-group">

                                <li className="list-group-item border-0 p-0 klee-one-regular">
                                    <strong>Color:</strong> {this.render_text_color()}
                                </li>

                                <li className="list-group-item border-0 p-0 klee-one-regular">
                                    <strong>Género:</strong> {this.state.genero}
                                </li>


                                <li className="list-group-item border-0 p-0 klee-one-regular">
                                    <strong>Talles:</strong> {this.render_talles()}
                                </li>


                                <li className="list-group-item border-0 p-0 klee-one-regular">
                                    <strong>Tipo:</strong> {this.state.tipo}
                                </li>

                                <li className="list-group-item border-0 p-0 klee-one-regular">
                                    <strong>Material Interno:</strong> {this.state.material_interno}
                                </li>

                                <li className="list-group-item border-0 p-0 klee-one-regular">
                                    <strong>Material Externo:</strong> {this.state.material_externo}
                                </li>
                            </ul>
                        </Card.Body>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
}

export default Zapato;
