import { render, screen } from '@testing-library/react';
import App from './App';
import Login from './login/Login';
import { shallow } from 'enzyme';
import CrearProducto from './crearProducto/CrearProducto';
import InfoProducto from './infoProducto/InfoProducto';
import RegistrarUsuario from './registerUser/RegistrarUsuario';
import UserListado from './productosUsuario/UserListado';

test('renders homePage', () => {
  render(<App />);
  const linkElement = screen.getByTestId(/App/i);
  const homeElement = screen.getByTestId(/Listado/i);
  expect(linkElement).toBeInTheDocument();
  expect(homeElement).toBeInTheDocument();

  
});

test('renders login page', () => {
  const appComponent = shallow(<App />);
  appComponent.setState({ screen: 'login' });
  expect(appComponent.find(Login).length).toBe(1);
  
});

test('renders createProduct page', () => {
  const appComponent = shallow(<App />);
  appComponent.setState({ screen: 'createProduct' });
  expect(appComponent.find(CrearProducto).length).toBe(1);
  
});

test('renders editProduct page', () => {
  const appComponent = shallow(<App />);
  appComponent.setState({ screen: 'editProduct' });
  expect(appComponent.find(CrearProducto).length).toBe(1);
  
});

test('renders productInfo page', () => {
  const appComponent = shallow(<App />);
  appComponent.setState({ screen: 'productInfo' });
  expect(appComponent.find(InfoProducto).length).toBe(1);
  
});
test('renders createUser page', () => {
  const appComponent = shallow(<App />);
  appComponent.setState({ screen: 'createUser' });
  expect(appComponent.find(RegistrarUsuario).length).toBe(1);
  
});
test('renders userProducts page', () => {
  const appComponent = shallow(<App />);
  appComponent.setState({ screen: 'userProducts' });
  expect(appComponent.find(UserListado).length).toBe(1);
  
});
