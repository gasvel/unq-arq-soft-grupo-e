import React from 'react';
import './UserListado.css';
import { getAuth} from "@firebase/auth";
import {Card,Container,Row,Col} from 'react-bootstrap';



class UserListado extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
        // this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete = (prodId) => {
        this.setState({ ...this.state,isLoaded: false })
        getAuth().currentUser.getIdToken(true).then((idToken) => {
            const requestOptions = {
                method: 'DELETE',
                headers: {'Authorization' : "Bearer " + idToken}
            };
            fetch('https://arq1-meli-grupo-e.herokuapp.com/products/' + prodId, requestOptions)
                .then(data => {
                    console.log(data);
                    this.setState({ ...this.state,error: null,isLoaded: true });
                    this.componentDidMount();
                
                })
                .catch(err => {this.setState({ ...this.state,error: err,isLoaded: true })});
        });
    }

    handleEdit = (prod) => {
        this.props.onProductEdit(prod);
    }

    componentDidMount(){
        if(getAuth().currentUser == null){
            alert("Su sesión expiró, vuelva a identificarse")
            return;
        }
        getAuth().currentUser.getIdToken(true).then((idToken) => {
            const requestOptions = {
                method: 'GET',
                headers: {'Authorization' : "Bearer " + idToken}
            };
            fetch("https://arq1-meli-grupo-e.herokuapp.com/products/" +localStorage.getItem("user"),requestOptions).then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
        });
        
    }

    render(){
        const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Cargando...</div>;
    } else {
      return (
        <Container fluid="lg" style={{padding: '1%'}}>
        <Row>
        {items.map(item => (
          <Col key={item._id}>
          <Card  style={{ width: '18rem', height: '500px'}}>
          <Card.Img variant="top" src={item.photo} />
          <Card.Body>
            <Card.Title>{item.nombre}</Card.Title>
            <Card.Text>
            {item.descripcion}
            </Card.Text>
          </Card.Body>
          <Card.Text>$ {item.valor}</Card.Text>
          <Card.Link onClick={() => {this.handleDelete(item._id)}}>Eliminar</Card.Link>
        <Card.Link onClick={() => {this.handleEdit(item)}}>Editar</Card.Link>
        </Card>
        </Col>
         
        ))}
        </Row>
      </Container>
      );
    }
  }
    
}
export default UserListado;