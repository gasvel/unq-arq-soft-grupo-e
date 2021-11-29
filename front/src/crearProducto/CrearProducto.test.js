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

test("carga masiva productos", () =>{
    const mockedProductCreation = jest.fn();
    const appComponent = shallow(<CrearProducto onProductCreated={mockedProductCreation}/>);
    appComponent.setState({ product:{
        nombre: "testing prdo",
        descripcion: "",
        valor: 20,
        stock: 1,
        categoria: "Agro",
        csv: "TestBase64"
        
    },error: null,isLoaded: true });
    appComponent.setProps({onProductCreated: mockedProductCreation})
    const handleSubmitMock = jest.fn().mockImplementation( () => {
        appComponent.instance().props.onProductCreated()
    })
    var oMyBlob = new Blob(["test"], {type : 'text/csv'}); // the blob

    appComponent.find("#inputCsv").simulate('change',{ target: { files: [oMyBlob] } });
    appComponent.instance().submitCsv = handleSubmitMock;
    appComponent.instance().submitCsv();
    expect(handleSubmitMock).toBeCalled();
    expect(mockedProductCreation).toBeCalled();
})