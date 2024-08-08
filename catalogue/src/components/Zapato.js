import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import React from "react";

class Zapato extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: props.nombre || "",
            genero: props.genero || "",
            descripcion: props.descripcion || "",
            talles: props.talles || [],
            colores: props.colores || [],
            color_actual: "estandar",
            urls_imagenes: this.getImageUrls(props.nombre, "estandar")
        };
    }

    componentDidUpdate(prevProps, prevState) {
        // Actualizar las imágenes si `color_actual` cambian
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
        const listItems = this.state.talles.map(talle =>
            <li key={talle} className="list-group-item border-0 w-100">{talle}</li>
        );
        return <ul id="talles" className="list-group list-group-flush d-flex flex-row justify-content-center text-center">{listItems}</ul>;
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
                className="mx-1" // Añadido para agregar margen horizontal
                style={{ cursor: 'pointer', height: '80px' }}
                fluid
            />
        );
        return <div id="colores" className="d-flex flex-row justify-content-center text-center my-2">{listItems}</div>;
    }

    render_carousel_items() {
        const listItems = this.state.urls_imagenes.map((imagen_url, index) => (
            <Carousel.Item key={index}>
                <Image src={imagen_url} fluid />
            </Carousel.Item>
        ));
        return listItems;
    }

    render() {
        return (
            <div className="col-xl-3 col-md-4 col-6 my-2">
                <Card>
                    <Carousel interval={null} indicators={false} data-bs-theme="dark">
                        {this.render_carousel_items()}
                    </Carousel>

                    <Card.Body>
                        <Card.Title>{this.capitalizeFirstLetter(this.state.nombre)}</Card.Title>
                        <Card.Text>{this.state.descripcion}</Card.Text>
                    </Card.Body>

                    {/* Colores */}
                    <Card.Body className="text-center">
                        {this.render_colores()}
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
            </div>
        );
    }
}

export default Zapato;
