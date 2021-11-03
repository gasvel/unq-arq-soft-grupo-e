import React from 'react';
import {Card,Container,Row,Col} from 'react-bootstrap';

class Listado extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            products: []
        }
    }


    getSnapshotBeforeUpdate(prevProps) {
      return { notifyRequired: prevProps.search !== this.props.search || prevProps.category !== this.props.category };
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
      if (snapshot.notifyRequired) {
      let params = []
      if(this.props.category != null){
        params.push("categoria="+this.props.category)
      }
      if(this.props.search != null){
        params.push("nombre="+this.props.search)
      }
      if(params.length > 0){
        params = params.join('&');
        this.getProducts(params)
      }
      }
    }


    componentDidMount(){
      let params = []
      if(this.props.category != null){
        params.push("categoria="+this.props.category)
      }
      if(this.props.search != null){
        params.push("nombre="+this.props.search)
      }
      if(params.length > 0){
        params = params.join('&');
        this.getProducts(params)
      }
      this.getProducts();
    }

    getProducts(params){
      let filter = "";
      if(params){
        filter = "?"+params;
      }
      console.log(filter);
      fetch("https://arq1-meli-grupo-e.herokuapp.com/products" + filter).then(res => res.json())
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
          </Card>
          </Col>
           
          ))}
          </Row>
        </Container>
      );
    }
  }
    
}
export default Listado;