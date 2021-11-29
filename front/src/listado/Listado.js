import React from 'react';
import {Card,Container,Row,Col,Accordion,InputGroup,FormControl,Button, Pagination} from 'react-bootstrap';

class Listado extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            pageItems: [],
            gte:0,lte:0,
            limit:10,page:1
        }
        this.filterProducts = this.filterProducts.bind(this);
        this.handleChangeGte = this.handleChangeGte.bind(this);
        this.handleChangeLte = this.handleChangeLte.bind(this);
    }


    handleChangeGte(event) {
      const target = event.target;
      let value =parseInt(target.value);
  
      this.setState({
          ...this.state,gte:value
      });
    }

    handleChangeLte(event) {
      const target = event.target;
      let val =parseInt(target.value);
  
      this.setState({
          ...this.state,
          lte:val
        
      });
    }

    changePage = (event) => {
      let newPage = event.target.textContent;
      let limitPrev = this.state.limit * (newPage-1);
      let limitEnd = (limitPrev + this.state.limit) > this.state.items.length-1 ? this.state.items.length-1 : (limitPrev + this.state.limit);
      console.log(limitPrev);console.log(limitEnd);
      this.setState({...this.state,page: newPage,pageItems: this.state.items.slice(limitPrev, limitEnd)});
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

    handleBuy = (prod) => {
      this.props.onProductBuy(prod);
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
                    items: result,
                    pageItems: result.slice(0,this.state.limit)
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
        const { error, isLoaded, items,pageItems } = this.state;
        let userId = localStorage.getItem("user");
let paginationElems = [];
for (let number = 1; number <= Math.ceil(this.state.items.length / this.state.limit); number++) {
  paginationElems.push(
    <Pagination.Item key={number} active={number === this.state.page} onClick={this.changePage}>
      {number}
    </Pagination.Item>
  );
}
    if (error) {
      return <div data-testid="Listado">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div data-testid="Listado">Cargando...</div>;
    } else {
      return (
        <Container fluid="lg" style={{padding: '1%'}} data-testid="Listado">
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
          type="number"
          value={this.state.gte}
          onChange={this.handleChangeGte}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon2">Valor menor a: </InputGroup.Text>
        <FormControl
          placeholder="0"
          aria-label="0"
          aria-describedby="basic-addon2"
          type="number"
          value={this.state.lte}
          onChange={this.handleChangeLte}
        />
      </InputGroup>
      <Button variant="success" onClick={this.filterProducts}>Filtrar</Button>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
          <Row>
          {pageItems.map(item => (
            <Col key={item._id}>
            <Card  style={{ width: '18rem', height: '500px'}}>
            <Card.Img variant="top" src={item.photo} />
            <Card.Body>
              <Card.Title>{item.nombre}</Card.Title>
            </Card.Body>
            <Card.Text>Cantidad disponible: {item.stock}</Card.Text>
            <Card.Text>$ {item.valor}</Card.Text>
            <Button variant="primary" onClick={() => {this.handleBuy(item._id)}} disabled={userId==null}>Comprar</Button>
          </Card>
          </Col>
           
          ))}


          </Row>
          <div style={{"textAlign":"center"}}>
          <Pagination style={{"paddingLeft":"50%"}}>
            {paginationElems}
          </Pagination>
          </div>

        </Container>
      );
    }
  }
    
}
export default Listado;