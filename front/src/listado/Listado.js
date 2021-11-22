import React from 'react';
import {Card,Container,Row,Col,Accordion,InputGroup,FormControl,Button} from 'react-bootstrap';

class Listado extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            products: [],
            gte:0,lte:0
        }
        this.filterProducts = this.filterProducts.bind(this);
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
      if(this.state.lte != null && this.state.lte != 0){
        params.push("lte="+this.state.lte)
      }
      if(this.state.gte != null && this.state.gte != 0){
        params.push("gte="+this.state.gte)
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
      if(this.state.lte != null && this.state.lte != 0){
        params.push("lte="+this.state.lte)
      }
      if(this.state.gte != null && this.state.gte != 0){
        params.push("gte="+this.state.gte)
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

    filterProducts(){
      let params = []

      if(this.state.lte != null && this.state.lte != 0){
        params.push("lte="+this.state.lte)
      }
      if(this.state.gte != null && this.state.gte != 0){
        params.push("gte="+this.state.gte)
      }
      if(params.length > 0){
        this.setState({...this.state,
          isLoaded: false});
        params = params.join('&');
        this.getProducts(params)
      }
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
          <Accordion defaultActiveKey="">
  <Accordion.Item eventKey="0">
    <Accordion.Header>Filtrar resultado</Accordion.Header>
    <Accordion.Body>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Valor mayor a: </InputGroup.Text>
        <FormControl
          placeholder="0"
          aria-label="0"
          aria-describedby="basic-addon1"
          value={this.state.gte}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon2">Valor menor a: </InputGroup.Text>
        <FormControl
          placeholder="0"
          aria-label="0"
          aria-describedby="basic-addon2"
          value={this.state.lte}
        />
      </InputGroup>
      <Button variant="success" onClick={this.filterProducts}>Filtrar</Button>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
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