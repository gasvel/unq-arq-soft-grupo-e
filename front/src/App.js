import React from 'react';
import Listado from './listado/Listado';
import CrearProducto from './crearProducto/CrearProducto';
import Header from './header/Header';
import './App.css';
import RegistrarUsuario from './registerUser/RegistrarUsuario';
import Login from './login/Login';
import app from './firebase';
import UserListado from './productosUsuario/UserListado';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        screen: 'login'
    }

}

  componentDidMount = () => {
    app();
  }

  handleProductCreation = () => {
    alert('Producto Creado');
  }

  handleLogin = () =>{
    this.setState({screen: 'list'})
  }

  handleCreationScreen = () => {
    this.setState({screen: 'createProduct'});
  }

  handleProductEdit = (prod) => {
    this.setState({screen: 'editProduct',product: prod});
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

  render(){
    if(this.state.screen === 'login' && localStorage.getItem("user") !== null){
      this.setState({screen: "list"});
    }
    let mainContent;
    switch(this.state.screen){
      case 'createProduct':
        mainContent = <CrearProducto onProductCreated={this.handleProductCreation}/>;
        break;
      case 'createUser':
        mainContent = <RegistrarUsuario onUserCreated={this.handleHomeScreen}/>;
        break
      case 'list':
        mainContent = <Listado/>;
        break
      case 'userProducts':
        mainContent = <UserListado onProductEdit={this.handleProductEdit}/>;
        break;
      case 'editProduct':
        mainContent = <CrearProducto onProductCreated={this.handleProductCreation} product={this.state.product}/>
        break;
      default:
        mainContent = <Login onUserLogin={this.handleLogin}/>;
        break;

    }
    return (
    <div className="App" data-testid="App">
      <Header onProductCreationEvent={this.handleCreationScreen} onHome={this.handleHomeScreen} onRegister={this.handleRegisterScreen} onUserProducts={this.handleUserProductsScreen}/>
      {mainContent}

    </div>
  );
  }
}

export default App;
