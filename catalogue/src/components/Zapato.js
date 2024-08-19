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
        return <ul id="talles" className="list-group list-group-flush d-flex flex-row justify-content-center text-center m-0 p-0">{talleMin} al {talleMax}</ul>;
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
            <div className="col-xl-3 col-md-4 col-6 mb-5 m-0 p-1 border-0 shoe">
                <Card className="border-card">
                    <Carousel interval={null} indicators={false} data-bs-theme="dark">
                        {this.render_carousel_items()}
                    </Carousel>

                    {/* Colores */}
                    <Card.Body>
                        {this.render_colores()}
                    </Card.Body>

                    <Card.Body>
                        <Card.Text className="shoe-name" >Articulo {this.capitalizeFirstLetter(this.state.nombre)}</Card.Text>
                        <Card.Text className="text-secondary">Color: {this.render_text_color()}</Card.Text>
                        <ul className="list-group list-group-flush m-0 p-0">
                            <li className="list-group-item list-group-item-action border-0 p-0">Tipo: {this.state.tipo}</li>
                            <li className="list-group-item list-group-item-action border-0 p-0">Material Interno: {this.state.material_interno}</li>
                            <li className="list-group-item list-group-item-action border-0 p-0">Material Externo: {this.state.material_externo}</li>
                        </ul>
                    </Card.Body>

                    {/* Género */}
                    <Card.Body className="text-center border-top">
                        <Card.Text>{this.state.genero}</Card.Text>
                    </Card.Body>

                    {/* Talles */}
                    <Card.Body className="text-center border-top">
                        {this.render_talles()}
                    </Card.Body>
                </Card>

                {/* Modal para mostrar la imagen a pantalla completa */}
                <Modal show={this.state.showModal} onHide={this.handleClose} centered size="lg">
                    <Modal.Body>
                        <Image src={this.state.selectedImage} fluid />
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
