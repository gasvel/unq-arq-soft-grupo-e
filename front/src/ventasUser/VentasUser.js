import React from 'react';
import {Card,Container,Row,Col} from 'react-bootstrap';
import { getAuth} from "@firebase/auth";


class VentasUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            sells: []
        }

    }



    componentDidMount(){
      this.getProducts();
    }

    getProducts(){
        let userId = localStorage.getItem("user");
      let filter = "?seller=" + userId;
      
      console.log(filter);
      this.setState({ ...this.state,isLoaded: false })
        getAuth().currentUser.getIdToken(true).then((idToken) => {
            const requestOptions = {
                method: 'GET',
                headers: {'Authorization' : "Bearer " + idToken}
            };
            fetch("https://arq1-meli-grupo-e.herokuapp.com/sales" + filter,requestOptions).then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
                        this.setState({
                            isLoaded: true,
                            sells: result
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                );})
    }

    render(){
        const { error, isLoaded, sells } = this.state;
        let userId = localStorage.getItem("user");
    if (error) {
      return <div data-testid="Listado">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div data-testid="Listado">Cargando...</div>;
    } else {
      return (
          <Container>
          <Row>
          {sells.map(item => (
            <Col key={item._id}>
            <Card  style={{ width: '18rem', height: '300px'}}>
            <Card.Body>
              <Card.Title>Venta {item.wrapperProduct.nombre}</Card.Title>
            </Card.Body>
            <Card.Text>Categoría {item.wrapperProduct.categoria}</Card.Text>
            <Card.Text> Fecha {new Date(item.createdAt).toLocaleString()}</Card.Text>
            <Card.Text> Comprado por {item.buyer.username}</Card.Text>
            <Card.Text>Método de pago: {item.formaPago}</Card.Text>
            <Card.Text>$ {item.costoTotal}</Card.Text>
          </Card>
          </Col>
           
          ))}
          </Row>
        </Container>
      );
    }
  }
    
}
export default VentasUser;