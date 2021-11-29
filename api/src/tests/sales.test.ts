import app from '../app'
import request from 'supertest'
import User from '../routes/Users/User'
import Product from '../routes/Products/Product'
import Sale from '../routes/Sales/Sales'
import WrapperProduct from '../routes/WrapperProducts/WrapperProduct'
import ValidateAuthService from '../routes/ValidateAuthService'

describe('create sale', () => {

    beforeAll(async () => {
        User.findById = jest.fn().mockReturnValue({
            wallet: 0,
            _id: "6150d5b7f3a8afa65c28d633",
            nombre: 'hello world user1',
            apellido: 'apellido test',
            username: 'username2',
            password: 'password1',
            seller: true,
            email: 'email2',
            razonSocial: '1',
            emailCorporativo: 'emailC2'
        })
        Product.find = jest.fn().mockReturnValue({populate: () => {
            var res : any[] = []
            const newProd = new Product({
                _id: "6150d62cf3a8afa65c28d642",
                nombre: 'Test',
                descripcion: 'test desc',
                valor: 50,
                stock: 24,
                owner: new User({
                    wallet: 0,
                    _id: "6150d616f3a8afa65c28d63c",
                    nombre: 'cambia nombre opa',
                    apellido: 'apellido test',
                    username: 'username1',
                    password: 'password1',
                    seller: true,
                    email: 'email1',
                    razonSocial: '12',
                    emailCorporativo: 'emailC1'
                }),
                categoria: 'Mascotas'
            })
            res.push(newProd)
            return res
         } })
        ValidateAuthService.validateAuth = jest.fn().mockReturnValue(1)

    });


    test('post new sale returning status 200', async () => {

        WrapperProduct.prototype.save = jest.fn().mockImplementation( () => {
            
            const savedWrapperProd =  new WrapperProduct({
                nombre: 'Test',
                valor: 50,
                owner: {
                  wallet: 0,
                  _id: "6150d616f3a8afa65c28d63c",
                  nombre: 'cambia nombre opa',
                  apellido: 'apellido test',
                  username: 'username1',
                  password: 'password1',
                  seller: true,
                  email: 'email1',
                  razonSocial: '12',
                  emailCorporativo: 'emailC1'
                },
                categoria: 'Mascotas',
                _id: "61a28f721d4f8f11155b28bc"
              })

            return savedWrapperProd
        })
        
        Product.prototype.save = jest.fn().mockImplementation( () => {
            
            const prod =  new Product({
                nombre: 'Test',
                descripcion: 'test desc',
                valor: 50,
                stock: 21,
                owner: {
                  wallet: 0,
                  _id: "6150d616f3a8afa65c28d63c",
                  nombre: 'cambia nombre opa',
                  apellido: 'apellido test',
                  username: 'username1',
                  password: 'password1',
                  seller: true,
                  email: 'email1',
                  razonSocial: '12',
                  emailCorporativo: 'emailC1'
                },
                categoria: 'Mascotas',
                _id: "6150d62cf3a8afa65c28d642"
              })

            return prod
        })

        Sale.prototype.save = jest.fn().mockImplementation( () => {
            
            const sale =  new Sale({
                costoTotal: 66,
                buyer: "6150d5b7f3a8afa65c28d633",
                seller: [
                    {
                        wallet: 0,
                        _id: "6150d616f3a8afa65c28d63c",
                        nombre: "cambia nombre opa",
                        apellido: "apellido test",
                        username: "username1",
                        password: "password1",
                        seller: true,
                        email: "email1",
                        razonSocial: "12",
                        emailCorporativo: "emailC1",
                        createdAt: "2021-09-26T20:20:38.907Z",
                        updatedAt: "2021-09-26T20:20:50.038Z"
                    }
                ],
                products: [
                    {
                        cantidadProductos: 1,
                        productId: "6150d62cf3a8afa65c28d642",
                        _id: "61a28b9217a539b69737940b"
                    }
                ],
                wrapperProduct: [
                    "61a28b9217a539b697379409"
                ],
                formaPago: "Card",
                _id: "61a28b9217a539b69737940a"
            })

            return sale
        })
        
        const response = await request(app).post('/sales').send({
            costoTotal: 66,
            products: [
                {
                    productId: "6150d62cf3a8afa65c28d642",
                    cantidadProductos: 1
                }
            ],
            buyer: "6150d5b7f3a8afa65c28d633",
            formaPago: "Card"
        })

        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        expect(response.statusCode).toBe(200)
    })

    test('post new sale without costototal returning status 400 missing required fields', async () => {
        
        const response = await request(app).post('/sales').send({
            products: [
                {
                    productId: "6150d62cf3a8afa65c28d642",
                    cantidadProductos: 1
                }
            ],
            buyer: "6150d5b7f3a8afa65c28d633",
            formaPago: "Card"
        })

        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        expect(response.statusCode).toBe(400)
        expect(response.text).toEqual(expect.stringContaining('Missing required field, check formaPago products buyer and costoTotal products should not be empty.'))
    })
})
/*
describe('get sale', () => {

    beforeAll(async () => {
        ValidateAuthService.validateAuth = jest.fn().mockReturnValue(1)
    });


    test('get sales returning status 200', async () => {

        const idSale = '6150d62cf3a8afa65c28d642'

        Sale.find = jest.fn().mockReturnValue({populate: () => {
            var res : any[] = []
            const newSale = new Sale({
                _id: idSale,
                costoTotal: 66,
                buyer: {
                wallet: 0,
                _id: "6150d5b7f3a8afa65c28d633",
                nombre: "hello world user1",
                apellido: "apellido test",
                username: "username2",
                password: "password1",
                seller: true,
                email: "email2",
                razonSocial: "1",
                emailCorporativo: "emailC2"
                },
                seller: [
                {
                    wallet: 0,
                    _id: "6150d616f3a8afa65c28d63c",
                    nombre: "cambia nombre opa",
                    apellido: "apellido test",
                    username: "username1",
                    password: "password1",
                    seller: true,
                    email: "email1",
                    razonSocial: "12",
                    emailCorporativo: "emailC1"
                }
                ],
                products: [
                {
                    cantidadProductos: 1,
                    productId: "6150d62cf3a8afa65c28d642",
                    _id: "61a33040abb4ebd8549da413"
                }
                ],
                wrapperProduct: [
                {
                    _id: "61a33040abb4ebd8549da40f",
                    nombre: "Test",
                    valor: 50,
                    owner: "6150d616f3a8afa65c28d63c",
                    categoria: "Mascotas"
                }
                ],
                formaPago: "Card"
            })
            res.push(newSale)
            return res
        }})
        
        const response = await request(app).get('/sales').send()

        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        expect(response.statusCode).toBe(200)
    })

    test('get sale returning status 200', async () => {

        const idSale = '6150d62cf3a8afa65c28d642'

        Sale.findById = jest.fn().mockReturnValue({populate: () => {
            var res : any[] = []
            const newSale = new Sale({
                _id: idSale,
                costoTotal: 66,
                buyer: {
                wallet: 0,
                _id: "6150d5b7f3a8afa65c28d633",
                nombre: "hello world user1",
                apellido: "apellido test",
                username: "username2",
                password: "password1",
                seller: true,
                email: "email2",
                razonSocial: "1",
                emailCorporativo: "emailC2"
                },
                seller: [
                {
                    wallet: 0,
                    _id: "6150d616f3a8afa65c28d63c",
                    nombre: "cambia nombre opa",
                    apellido: "apellido test",
                    username: "username1",
                    password: "password1",
                    seller: true,
                    email: "email1",
                    razonSocial: "12",
                    emailCorporativo: "emailC1"
                }
                ],
                products: [
                {
                    cantidadProductos: 1,
                    productId: "6150d62cf3a8afa65c28d642",
                    _id: "61a33040abb4ebd8549da413"
                }
                ],
                wrapperProduct: [
                {
                    _id: "61a33040abb4ebd8549da40f",
                    nombre: "Test",
                    valor: 50,
                    owner: "6150d616f3a8afa65c28d63c",
                    categoria: "Mascotas"
                }
                ],
                formaPago: "Card"
            })
            res.push(newSale)
            return res
        }})
        
        const response = await request(app).get('/sale/' + idSale).send()

        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        expect(response.statusCode).toBe(200)
    })
})*/

describe('delete sale', () => {

    beforeAll(async () => {
        ValidateAuthService.validateAuth = jest.fn().mockReturnValue(1)
    });

    test('delete sale returning status 200', async () => {

        const idSale = '6150d62cf3a8afa65c28d642'

        Sale.findByIdAndDelete = jest.fn().mockReturnValue({
            _id: idSale,
            costoTotal: 66,
            buyer: {
              wallet: 0,
              _id: "6150d5b7f3a8afa65c28d633",
              nombre: "hello world user1",
              apellido: "apellido test",
              username: "username2",
              password: "password1",
              seller: true,
              email: "email2",
              razonSocial: "1",
              emailCorporativo: "emailC2"
            },
            seller: [
              {
                wallet: 0,
                _id: "6150d616f3a8afa65c28d63c",
                nombre: "cambia nombre opa",
                apellido: "apellido test",
                username: "username1",
                password: "password1",
                seller: true,
                email: "email1",
                razonSocial: "12",
                emailCorporativo: "emailC1"
              }
            ],
            products: [
              {
                cantidadProductos: 1,
                productId: "6150d62cf3a8afa65c28d642",
                _id: "61a33040abb4ebd8549da413"
              }
            ],
            wrapperProduct: [
              {
                _id: "61a33040abb4ebd8549da40f",
                nombre: "Test",
                valor: 50,
                owner: "6150d616f3a8afa65c28d63c",
                categoria: "Mascotas"
              }
            ],
            formaPago: "Card"
        })
        
        const response = await request(app).delete('/sales/' + idSale).send()
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        expect(response.statusCode).toBe(200)
        expect(response.text).toEqual(expect.stringContaining('Sale deleted'))
    })
})

describe('update sale', () => {

    beforeAll(async () => {
        ValidateAuthService.validateAuth = jest.fn().mockReturnValue(1)
    });

    test('update sale returning status 200', async () => {

        const idSale = '6150d62cf3a8afa65c28d642'

        Sale.findByIdAndUpdate = jest.fn().mockReturnValue({
            _id: idSale,
            costoTotal: 66,
            buyer: {
              wallet: 0,
              _id: "6150d5b7f3a8afa65c28d633",
              nombre: "hello world user1",
              apellido: "apellido test",
              username: "username2",
              password: "password1",
              seller: true,
              email: "email2",
              razonSocial: "1",
              emailCorporativo: "emailC2"
            },
            seller: [
              {
                wallet: 0,
                _id: "6150d616f3a8afa65c28d63c",
                nombre: "cambia nombre opa",
                apellido: "apellido test",
                username: "username1",
                password: "password1",
                seller: true,
                email: "email1",
                razonSocial: "12",
                emailCorporativo: "emailC1"
              }
            ],
            products: [
              {
                cantidadProductos: 1,
                productId: "6150d62cf3a8afa65c28d642",
                _id: "61a33040abb4ebd8549da413"
              }
            ],
            wrapperProduct: [
              {
                _id: "61a33040abb4ebd8549da40f",
                nombre: "Test",
                valor: 50,
                owner: "6150d616f3a8afa65c28d63c",
                categoria: "Mascotas"
              }
            ],
            formaPago: "Card"
        })
        
        const response = await request(app).put('/sales/' + idSale).send()
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        expect(response.statusCode).toBe(200)
    })
})