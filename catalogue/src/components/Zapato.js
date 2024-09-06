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
            color_actual: "estandar",
            nombre_color_estandar: props.nombre_color_estandar || "",
            urls_imagenes: this.getImageUrls(props.nombre, "estandar"),
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
    }

    handleMouseLeave(color) {
        this.setState({ color_actual: color });
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

    render_colores() {
        const listItems = this.state.colores.map((color, index) => (
            <picture key={color}>
                <Image
                    onClick={() => this.change_color(color)}
                    src={this.loadImage(this.state.nombre, color, 'imagen1')}
                    alt={`Color ${color}`}
                    onMouseEnter={() => this.handleMouseLeave(color)}
                    className="mx-1 color-images"
                    style={{
                        cursor: 'pointer',
                    }}
                    fluid
                />
            </picture>
        ));

        return <div id="colores" className="d-flex flex-row justify-content-center">{listItems}</div>;
    }

    render_carousel_items() {
        return this.state.urls_imagenes.map((imagen_url, index) => (
            <Carousel.Item key={index}>
                <picture key={this.state.nombre} className="image-container d-block" >
                    <Image
                        className="carousel-image"
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
            this.state.color_actual === "estandar" ? this.state.nombre_color_estandar : this.state.color_actual
        );
    }

    handleImageClick = (image) => {
        this.setState({ showModal: true, selectedImage: image });
    }

    handleClose = () => {
        this.setState({ showModal: false, selectedImage: "" });
    }

    render() {
        return (
            <div className="col-xl-3 col-md-4 col-6 mb-5 m-0 p-2 border-0 shoe">
                <Card className="border-card">
                    <picture key={this.state.nombre} className="main-image-container d-block" >
                        <Image
                            className="main-image"
                            src={this.loadImage(this.state.nombre, 'estandar', 'imagen1')}
                            fluid
                            onClick={() => this.handleImageClick(this.state.urls_imagenes[0])}
                            style={{ cursor: 'pointer' }}
                        />
                    </picture>
                    <Card.Body>
                        <Card.Text><a onClick={() => this.handleImageClick(this.state.urls_imagenes[0])} href="#" className="text-dark shoe-name text-decoration-none">Articulo {this.capitalizeFirstLetter(this.state.nombre)}</a> </Card.Text>
                    </Card.Body>

                </Card>

                {/* Modal para mostrar la imagen a pantalla completa */}
                <Modal show={this.state.showModal} onHide={this.handleClose} centered size="xl" id="shoe-modal">
                    <Modal.Body className="d-flex">
                        <Carousel interval={null} indicators={false} data-bs-theme="dark" className="w-50">
                            {this.render_carousel_items()}
                        </Carousel>

                        <Card.Body className="d-flex flex-column p-5 w-50">
                            {this.render_colores()}
                            <Card.Text className="text-dark bg-light fw-light p-1 rounded text-center">
                                Artículo {this.capitalizeFirstLetter(this.state.nombre)}
                            </Card.Text>
                            <ul className="list-group">
                                <li className="list-group-item border-0 p-0">
                                    <strong>Color:</strong> {this.render_text_color()}
                                </li>
                                <li className="list-group-item border-0 p-0">
                                    <strong>Tipo:</strong> {this.state.tipo}
                                </li>
                                <li className="list-group-item border-0 p-0">
                                    <strong>Material Interno:</strong> {this.state.material_interno}
                                </li>
                                <li className="list-group-item border-0 p-0">
                                    <strong>Material Externo:</strong> {this.state.material_externo}
                                </li>
                                <li className="list-group-item border-0 p-0">
                                    <strong>Género:</strong> {this.state.genero}
                                </li>
                                <li className="list-group-item border-0 p-0">
                                    <strong>Talles:</strong> {this.render_talles()}
                                </li>
                            </ul>
                        </Card.Body>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Zapato;
