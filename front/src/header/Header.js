import React from 'react';
import './Header.css';
import logo from '../ml.png';
import search from '../lupa.png';
import {Nav,Navbar,NavDropdown,Container, Button,Form,FormControl} from 'react-bootstrap';


class CrearProducto extends React.Component{

  constructor(props){
    super(props);
    this.state = {searchTxt: ""}
    this.handleSearchChanged = this.handleSearchChanged.bind(this);
  }


  handleSearchChanged(event){
    this.setState({searchTxt: event.target.value});
  }

  openCategory = (event) =>{
    this.props.onCategory(event.target.name);
  }

  searchProduct = () => {
    console.log(this.state.searchTxt);
    this.props.onSearchProduct(this.state.searchTxt);
  }

    goToCreation = () =>{
      this.props.onProductCreationEvent();
    }

    goHome = () => {
      this.props.onHome();
    }

    handleLogin = () => {
      this.props.onLogin();
    }

    goToRegister = () =>{
      this.props.onRegister();
    }

    goToUserProducts = () =>{
      this.props.onUserProducts();
    }

    goToUserSales = () =>{
      this.props.onUserSales();
    }

    signOut = () =>{
      localStorage.clear();
      this.goHome();
    }

    openCart = () => {
      this.props.onUserCart();
    }

    render(){
      let userId = localStorage.getItem("user");
      let username = localStorage.getItem("username");
      let seller = localStorage.getItem("seller") === "true";
      let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).length : 0;
      let crearProducto;
      let misProductos;
      let misVentas;
      let registerOrSignOut = <Nav>
        <Nav.Link onClick={this.handleLogin}> Iniciar sesión </Nav.Link>
        <Nav.Link onClick={this.goToRegister}>Registrarme</Nav.Link>
      </Nav>;
      if(userId !== null){
        registerOrSignOut = <Nav>
          <Nav.Link onClick={this.openCart}>Carrito ({cart})</Nav.Link>
          <Nav.Link onClick={this.signOut}>{username} ,Salir</Nav.Link>
          </Nav>;
        if(seller){
        crearProducto = <Nav.Link onClick={this.goToCreation}>Publicar</Nav.Link>;
        misProductos = <Nav.Link onClick={this.goToUserProducts}>Mis productos</Nav.Link>
        misVentas = <Nav.Link onClick={this.goToUserSales}>Mis ventas</Nav.Link>
        }
      }
        return(
          <Navbar variant="dark" bg="dark" expand="lg">
  <Container fluid>
      <Navbar.Brand href="" onClick={this.goHome}>
        <img
          alt="mtLogo"
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      MercadoTrucho
      </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbar-dark-example" />
    <Navbar.Collapse id="navbar-dark-example">
      <Nav>
        {crearProducto}
        {misProductos}
        {misVentas}
        <NavDropdown
          id="nav-dropdown-dark-example"
          title="Categorías"
          menuVariant="dark"
        >
          <NavDropdown.Item name="Agro" onClick={this.openCategory}>Agro</NavDropdown.Item>
          <NavDropdown.Item name="Alimentos" onClick={this.openCategory}>Alimentos</NavDropdown.Item>
          <NavDropdown.Item name="Arte" onClick={this.openCategory}>Arte</NavDropdown.Item>
          <NavDropdown.Item name="Colleciones" onClick={this.openCategory}>Colecciones</NavDropdown.Item>
          <NavDropdown.Item name="Deportes" onClick={this.openCategory}>Deportes</NavDropdown.Item>
          <NavDropdown.Item name="Inmuebles" onClick={this.openCategory}>Inmuebles</NavDropdown.Item>
          <NavDropdown.Item name="Mascotas" onClick={this.openCategory}>Mascotas</NavDropdown.Item>
          <NavDropdown.Item name="Tecnologia" onClick={this.openCategory}>Técnologia</NavDropdown.Item>
          <NavDropdown.Item name="Vehiculos" onClick={this.openCategory}>Vehículos</NavDropdown.Item>
          <NavDropdown.Item name="Vestimenta" onClick={this.openCategory}>Vestimenta</NavDropdown.Item>

        </NavDropdown>
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Buscar"
          className="me-2"
          aria-label="Search"
          onChange={this.handleSearchChanged}
        />
        <Button variant="outline-success" onClick={this.searchProduct}>Buscar</Button>
      </Form>
      {registerOrSignOut}
    </Navbar.Collapse>
  </Container>
</Navbar>
      )
    }
}
export default CrearProducto;