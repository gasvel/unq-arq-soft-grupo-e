import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import CrearProducto from './CrearProducto';

test("crear un producto", () =>{
    const mockedProductCreation = jest.fn();
    const appComponent = shallow(<CrearProducto onProductCreated={mockedProductCreation}/>);
    appComponent.setState({ product:{
        nombre: "testing prdo",
        descripcion: "",
        valor: 20,
        stock: 1,
        categoria: "Agro"
        
    },error: null,isLoaded: true });
    appComponent.setProps({onProductCreated: mockedProductCreation})
    const handleSubmitMock = jest.fn().mockImplementation( () => {
        appComponent.instance().props.onProductCreated()
    })
    appComponent.instance().handleSubmit = handleSubmitMock;
    appComponent.instance().handleSubmit();
    expect(handleSubmitMock).toBeCalled();
    expect(mockedProductCreation).toBeCalled();
})