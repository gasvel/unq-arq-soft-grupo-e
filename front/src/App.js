import React from 'react';
import Listado from './listado/Listado';
import CrearProducto from './crearProducto/CrearProducto';
import Header from './header/Header';
import './App.css';
import RegistrarUsuario from './registerUser/RegistrarUsuario';
import Login from './login/Login';
import UserListado from './productosUsuario/UserListado';
import { getAuth } from '@firebase/auth';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        screen: 'list'
    }

}

  componentDidUpdate(){
    console.log(getAuth().currentUser)
    if(getAuth().currentUser == null){
      localStorage.clear();
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
    let mainContent;
    switch(this.state.screen){
      case 'createProduct':
        mainContent = <CrearProducto onProductCreated={this.handleProductCreation}/>;
        break;
      case 'createUser':
        mainContent = <RegistrarUsuario onUserCreated={this.handleHomeScreen}/>;
        break
      case 'list':
        mainContent = <Listado search={this.state.searchText} category={this.state.category}/>;
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
      <Header onProductCreationEvent={this.handleCreationScreen} onLogin={this.handleUserLogin} onHome={this.handleHomeScreen} onRegister={this.handleRegisterScreen} onUserProducts={this.handleUserProductsScreen}
      onCategory={this.handleSearchCategory} onSearchProduct={this.handleSearchProduct}/>
      {mainContent}

    </div>
  );
  }
}

export default App;
