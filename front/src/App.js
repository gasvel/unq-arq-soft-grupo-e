import React from 'react';
import Listado from './listado/Listado';
import CrearProducto from './crearProducto/CrearProducto';
import Header from './header/Header';
import './App.css';
import RegistrarUsuario from './registerUser/RegistrarUsuario';
import Login from './login/Login';
import UserListado from './productosUsuario/UserListado';
import { getAuth } from '@firebase/auth';
import InfoProducto from './infoProducto/InfoProducto';
import VentasUser from './ventasUser/VentasUser';
import InfoCarrito from './InfoCarrito/InfoCarrito';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        screen: 'list'
    }

}

  handleSearchCategory = (category) => {
    this.setState({screen: 'list',category:category})
  }

  handleSearchProduct = (text) => {
    this.setState({screen: 'list',searchText: text})
  }

  handleProductCreation = () => {
    alert('Producto Creado');
  }

  handleLogin = () =>{
    this.setState({screen: 'list'})
  }

  handleUserLogin = () =>{
    this.setState({screen: 'login'})
  }

  handleCreationScreen = () => {
    this.setState({screen: 'createProduct'});
  }

  handleProductEdit = (prod) => {
    this.setState({screen: 'editProduct',product: prod});
  }

  handleProductBuy = (prod) => {
    this.setState({screen: 'productInfo',product: prod});
  }

  handleSellCreated = () => {
    alert("Compra realizada con éxito!");
    localStorage.removeItem("cart")
    this.setState({screen: 'list'})
  }

  handleHomeScreen = () => {
    this.setState({screen: 'login'});
  }

  handleRegisterScreen = () => {
    this.setState({screen: 'createUser'});
  }

  handleUserProductsScreen = () => {
    this.setState({screen: 'userProducts'});
  }

  handleUserSales = () => {
    this.setState({screen: 'userSales'});
  }

  handleUserCart = () => {
    this.setState({screen: 'userCart'})
  }

  render(){
    let mainContent;
    switch(this.state.screen){
      case 'createProduct':
        mainContent = <CrearProducto onProductCreated={this.handleProductCreation}/>;
        break;
      case 'createUser':
        mainContent = <RegistrarUsuario onUserCreated={this.handleHomeScreen}/>;
        break
      case 'list':
        mainContent = <Listado search={this.state.searchText} category={this.state.category} onProductBuy={this.handleProductBuy}/>;
        break
      case 'userProducts':
        mainContent = <UserListado onProductEdit={this.handleProductEdit}/>;
        break;
      case 'editProduct':
        mainContent = <CrearProducto onProductCreated={this.handleProductCreation} product={this.state.product}/>
        break;
      case 'productInfo':
        mainContent = <InfoProducto productId={this.state.product} onSellCreated={this.handleSellCreated}/>
        break;
      case 'userSales':
        mainContent = <VentasUser/>
        break;
      case 'userCart':
        mainContent = <InfoCarrito onSellCreated={this.handleSellCreated}/>
        break;
      default:
        mainContent = <Login onUserLogin={this.handleLogin}/>;
        break;

    }
    return (
    <div className="App" data-testid="App">
      <Header onProductCreationEvent={this.handleCreationScreen} onLogin={this.handleUserLogin} onHome={this.handleHomeScreen} onRegister={this.handleRegisterScreen} onUserProducts={this.handleUserProductsScreen}
      onCategory={this.handleSearchCategory} onSearchProduct={this.handleSearchProduct} onUserSales={this.handleUserSales} onUserCart={this.handleUserCart}/>
      {mainContent}

    </div>
  );
  }
}

export default App;
