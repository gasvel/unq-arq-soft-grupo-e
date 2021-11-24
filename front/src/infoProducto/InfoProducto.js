import React from 'react';
import {Card,Container,Spinner,Button,FormControl,InputGroup,Form} from 'react-bootstrap';
import { getAuth } from "@firebase/auth";
import "./InfoProducto.css";

class InfoProducto extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            product: {},
            amount:1,
            formaPago:"Cash"
        }
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.handlePaymentChanged = this.handlePaymentChanged.bind(this);
    }

    handleChangeAmount(event){
        this.setState({...this.state,amount:event.target.value});
    }

    purchaseProduct= () =>{
        let userId = localStorage.getItem("user");

        let sell = {product: this.state.product._id,taxes: (this.state.product.valor * this.state.amount),buyer: userId,formaPago:this.state.formaPago};
        console.log(sell)
        getAuth().currentUser.getIdToken(true).then((idToken) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + idToken },
                body: JSON.stringify(sell)
            };
    
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
                .catch(err => {console.log(err);this.setState({ ...this.state
                ,error: err,isLoaded: true })});
        })
    }

    handlePaymentChanged(event){
        this.setState({...this.state,formaPago: event.target.value});
        console.log(event.target.value);
    }

    componentDidMount(){
        let productId = this.props.productId;
        this.setState({
            isLoaded: false
        });
        fetch("https://arq1-meli-grupo-e.herokuapp.com/product/" + productId).then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                this.setState({
                    isLoaded: true,
                    product: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render(){
        if(this.state.isLoaded){
            return(
                <Container>
        <Card className="text-center">
                <Card.Header>{this.state.product.nombre}</Card.Header>
          <Card.Img variant="top" className="productImg" src={this.state.product.photo} />
          <Card.Body>
            <Card.Title>$ {this.state.product.valor}</Card.Title>
            <Card.Text>
            {this.state.product.descripcion}
            </Card.Text>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Cantidad a comprar: </InputGroup.Text>
                <FormControl
                placeholder="0"
                aria-label="0"
                aria-describedby="basic-addon1"
                type="number"
                min="1"
                max={this.state.product.stock}
                value={this.state.amount}
                onChange={this.handleChangeAmount}
                />
                <Form.Select aria-label="Medio de pago" onChange={this.handlePaymentChanged} defaultValue="Cash">
                <option>-No seleccionado-</option>
                <option value="Cash">Efectivo</option>
                <option value="Card">Tarjeta</option>
                <option value="MercadoPago">MercadoPago</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Otros">Otros</option>
                </Form.Select>
            </InputGroup>
            <Button variant="primary" onClick={this.purchaseProduct}>Comprar</Button>
          </Card.Body>
          <Card.Footer className="text-muted"> Quedan disponibles: {this.state.product.stock - this.state.amount}</Card.Footer>
        </Card>
                </Container>)
        }
        else{
            return(<Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>)
        }

    }
}

export default InfoProducto;