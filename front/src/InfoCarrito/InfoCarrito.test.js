import { shallow } from 'enzyme';
import { ListGroup } from 'react-bootstrap';
import InfoCarrito from './InfoCarrito'

beforeAll(async () => {localStorage.clear()})

test("mostrar carrito", () => {
    localStorage.setItem("cart",JSON.stringify([{cantidad: 2, product:{_id: 1,valor:20,nombre:"Prod prueba"}},{cantidad: 1, product:{_id: 2,valor:10,nombre:"Prod prueba2"}}]))
    const appComponent = shallow(<InfoCarrito></InfoCarrito>)
    expect(appComponent.state().cart.length).toBe(2)
    expect(appComponent.find(ListGroup.Item).length).toBe(2)
})

test("comprar carrito", () => {
    const mockedSellCreation = jest.fn();
    localStorage.setItem("cart",JSON.stringify([{cantidad: 2, product:{_id: 1,valor:20,nombre:"Prod prueba"}},{cantidad: 1, product:{_id: 2,valor:10,nombre:"Prod prueba2"}}]))
    const appComponent = shallow(<InfoCarrito></InfoCarrito>)
    expect(appComponent.state().cart.length).toBe(2)
    appComponent.setProps({onSellCreated: mockedSellCreation})
    const handleSubmitMock = jest.fn().mockImplementation( () => {
        appComponent.instance().props.onSellCreated()
    })
    appComponent.instance().purchaseProducts = handleSubmitMock;
    appComponent.instance().purchaseProducts();
    expect(handleSubmitMock).toBeCalled();
    expect(mockedSellCreation).toBeCalled();
})

test("mostrar carrito vacio", () => {
    localStorage.clear()
    const appComponent = shallow(<InfoCarrito></InfoCarrito>)
    expect(appComponent.state().cart).toBe(null)
    expect(appComponent.find("#emptyCart").length).toBe(1)
})