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
            selectedImage: ""
        };
    }

    componentDidUpdate(prevProps, prevState) {
        // Actualizar las imágenes si `color_actual` cambia
        if (prevState.color_actual !== this.state.color_actual) {
            this.setState({
                urls_imagenes: this.getImageUrls(this.props.nombre, this.state.color_actual)
            });
        }
    }

    getImageUrls(nombre, color_actual) {
        return [
            require(`../assets/images/zapatos/${nombre}/${color_actual}/imagen1.jpg`),
            require(`../assets/images/zapatos/${nombre}/${color_actual}/imagen2.jpg`),
            require(`../assets/images/zapatos/${nombre}/${color_actual}/imagen3.jpg`)
        ];
    }

    render_talles() {
        const listItems = this.state.talles;
        return <ul id="talles" className="list-group list-group-flush d-flex flex-row justify-content-center text-center m-0 p-0">{listItems[0]} al {listItems[1]}</ul>;
    }

    capitalizeFirstLetter(str) {
        if (!str) return str; // Maneja el caso de cadenas vacías o nulas
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    change_color = (color) => {
        this.setState({ color_actual: color }, () => {
            // Actualiza las URLs de las imágenes después de cambiar el color
            this.setState({ urls_imagenes: this.getImageUrls(this.state.nombre, color) });
        });
    }

    render_colores() {
        const listItems = this.state.colores.map(color =>
            <Image
                key={color}
                onClick={() => this.change_color(color)}
                src={require(`../assets/images/zapatos/${this.state.nombre}/${color}/imagen1.jpg`)}
                alt={`Color ${color}`}
                className="mx-1 color-images" // Añadido para agregar margen horizontal
                style={{ cursor: 'pointer' }}
                fluid
            />
        );
        return <div id="colores" className="d-flex flex-row justify-content-center">{listItems}</div>;
    }

    render_carousel_items() {
        const listItems = this.state.urls_imagenes.map((imagen_url, index) => (
            <Carousel.Item key={index}>
                <Image
                    src={imagen_url}
                    fluid
                    onClick={() => this.handleImageClick(imagen_url)} // Manejar clic para agrandar la imagen
                    style={{ cursor: 'pointer' }}
                />
            </Carousel.Item>
        ));
        return listItems;
    }

    render_text_color() {
        if (this.state.color_actual === "estandar") {
            return this.capitalizeFirstLetter(this.state.nombre_color_estandar)
        }
        else {
            return this.capitalizeFirstLetter(this.state.color_actual);
        }
    }

    handleImageClick = (image) => {
        this.setState({ showModal: true, selectedImage: image });
    }

    handleClose = () => {
        this.setState({ showModal: false, selectedImage: "" });
    }

    render() {
        return (
            <div className="col-xl-3 col-sm-6  col-12 mb-5">
                <Card>
                    <Carousel interval={null} indicators={false} data-bs-theme="dark">
                        {this.render_carousel_items()}
                    </Carousel>

                    {/* Colores */}
                    <Card.Body>
                        {this.render_colores()}
                    </Card.Body>

                    <Card.Body>
                        <Card.Title>{this.capitalizeFirstLetter(this.state.nombre)}</Card.Title>
                        <Card.Text className="text-secondary">Color:  {this.render_text_color()}</Card.Text>
                        <ul className="list-group list-group-flush m-0 p-0">
                            <li className="list-group-item list-group-item-action border-0 p-0">Tipo: {this.state.tipo}</li>
                            <li className="list-group-item list-group-item-action border-0 p-0">Material Interno: {this.state.material_externo}</li>
                            <li className="list-group-item list-group-item-action border-0 p-0">Material Externo: {this.state.material_interno}</li>
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
