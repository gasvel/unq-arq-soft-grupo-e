import React from 'react';
import {Card,Container,Spinner,Button,ListGroup,Col,Row,InputGroup,Form} from 'react-bootstrap';
import { getAuth } from "@firebase/auth";

class InfoCarrito extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            cart: [],
            formaPago:"Cash"
        }
        this.handlePaymentChanged = this.handlePaymentChanged.bind(this);
    }

    purchaseProducts= () =>{
        let userId = localStorage.getItem("user");
        let cartItems = JSON.parse(localStorage.getItem("cart")).map( (prod) => {return {cantidadProductos: prod.cantidad, productId: prod.product._id}});
        let sell = {products: cartItems,costoTotal: this.state.cart.reduce((prev,prod) => {return prev + (prod.cantidad * prod.product.valor)},0),buyer: userId,formaPago:this.state.formaPago};
        this.setState({ ...this.state,error: null,isLoaded: false });
        getAuth().currentUser.getIdToken(true).then((idToken) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + idToken },
                body: JSON.stringify(sell)
            };
            console.log(requestOptions.body);
    
            let url = 'https://arq1-meli-grupo-e.herokuapp.com/sales';
            fetch(url, requestOptions)
                .then(data => {
                    console.log(data);
                    if(data.status == 200){
                        this.setState({ ...this.state,error: null,isLoaded: true });
                        this.props.onSellCreated();
                    }
                    else{
                        alert(data.statusText)
                        this.setState({ ...this.state,error: data.statusText,isLoaded: true });
                    }
                    
                
                })
                .catch(err => {console.log(JSON.stringify(err));alert("Ocurrió un error al realizar la compra");this.setState({ ...this.state
                ,error: err,isLoaded: true })});
        })
    }

    handlePaymentChanged(event){
        this.setState({...this.state,formaPago: event.target.value});
        console.log(event.target.value);
    }

    componentDidMount(){
        let cart = JSON.parse(localStorage.getItem("cart"));
        this.setState({
            isLoaded: true,
            cart: cart
        });
        
    }

    render(){
        if(this.state.isLoaded){
            if(this.state.cart){
            return(
                <Container>
        <Card className="text-center">
                <Card.Header>Tu carrito</Card.Header>
          <Card.Body>
          <ListGroup variant="flush">
          {this.state.cart.map(item => (
            <ListGroup.Item key={item.product._id}>
                <Row>
                    <Col>
                        <p>Producto: {item.product.nombre}</p>
                        <p>Precio por unidad: ${item.product.valor}</p>
                    </Col>
                    <Col>
          <p>Cantidad: {item.cantidad}</p>
                    </Col>
                </Row>
            </ListGroup.Item>))}
            </ListGroup>
          <Card.Text>Total: ${this.state.cart.reduce((prev,prod) => {return prev + (prod.cantidad * prod.product.valor)},0)}</Card.Text>
            <InputGroup className="mb-3">
                <Form.Select aria-label="Medio de pago" onChange={this.handlePaymentChanged} defaultValue="Cash">
                <option>-No seleccionado-</option>
                <option value="Cash">Efectivo</option>
                <option value="Card">Tarjeta</option>
                <option value="MercadoPago">MercadoPago</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Otros">Otros</option>
                </Form.Select>
            </InputGroup>
            <Button variant="primary" onClick={this.purchaseProducts}>Comprar</Button>
          </Card.Body>
        </Card>
                </Container>)
        }
        else{
            return( <Container>
                <Card className="text-center" id="emptyCart">
                        <Card.Header>Su carrito esá vacío</Card.Header>
                  <Card.Body>
                  </Card.Body>
                </Card>
                        </Container>)
        }
    }

        else{
            return(<Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>)
        }

    }
}

export default InfoCarrito;