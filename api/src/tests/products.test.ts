import app from '../app'
import request from 'supertest'
import User from '../routes/Users/User'
import Product from '../routes/Products/Product'
import ValidateAuthService from '../routes/ValidateAuthService'


describe('create product', () => {
    
    beforeAll(async () => {
        User.findById = jest.fn().mockReturnValue({
            _id: '6150d616f3a8afa65c28d63c',
            nombre: 'cambia nombre opa',
            apellido: 'apellido test',
            username: 'username1',
            password: 'password1',
            seller: true,
            email: 'email1',
            razonSocial: '12',
            emailCorporativo: 'emailC1',
        })
        ValidateAuthService.validateAuth = jest.fn().mockReturnValue(1)

    });


    test('post new product returning status 200', async () => {

        Product.prototype.save = jest.fn().mockImplementation( () => {
            
            const prod =  new Product({
                nombre: 'test owner multle3',
                descripcion: 'test desc',
                valor: '1',
                stock: '1',
                owner: '6150d616f3a8afa65c28d63c',
                categoria: 'Mascotas',
                _id:'617db9d6c48f06aa4808096e'
            })

            return prod
        })
        
        const response = await request(app).post('/products').send({
            nombre: 'test owner multle2',
            descripcion:'test desc',
            valor: '1',
            stock: '1',
            owner: '6150d616f3a8afa65c28d63c',
            categoria: 'Mascotas'
        })

        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        expect(response.statusCode).toBe(200)
    })

    test('post new product without name returning status 400 missing required fields', async () => {
        
        const response = await request(app).post('/products').send({
            descripcion:'test desc',
            valor: '1',
            stock: '1',
            owner: '6150d616f3a8afa65c28d63c',
            categoria: 'Mascotas'
        })

        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        expect(response.statusCode).toBe(400)
        expect(response.text).toEqual(expect.stringContaining('Missing required field, check name value stock and owner should not be empty.'))
    })
})

describe('get product', () => {
    beforeAll(async () => {
        ValidateAuthService.validateAuth = jest.fn().mockReturnValue(1)

    })
    
    test('get product should return 200 status', async () => {
        
        const idProd = '6150d62cf3a8afa65c28d642'

        Product.findById = jest.fn().mockReturnValue({
            _id: idProd,
            nombre: "Test",
            descripcion: "test desc",
            valor: 50,
            stock: 1,
            owner: "6150d616f3a8afa65c28d63c",
            categoria: "Mascotas"
          })

        const response = await request(app).get("/product/" + idProd).send()
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        expect(response.statusCode).toBe(200)
    })

    test('get products should return 200 status', async () => {
        
        const expected = [
            {
            _id: "6150d62cf3a8afa65c28d642",
            nombre: "Test",
            descripcion: "test desc",
            valor: 50,
            stock: 1,
            owner: "6150d616f3a8afa65c28d63c",
            categoria: "Mascotas"
          },
          {
            _id: "6150d62cf3a8afa65c28d632",
            nombre: "Test2",
            descripcion: "test2 desc",
            valor: 50,
            stock: 1,
            owner: "6150d616f3a8afa65c28d63c",
            categoria: "Mascotas"
          }
        ]

        Product.find = jest.fn().mockReturnValue(expected)

        const response = await request(app).get("/products").send()
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        expect(response.body).toEqual(expected)
        expect(response.statusCode).toBe(200)
    })

    test('get products from owner should return 200 status', async () => {
        
        const idOwner = '6150d616f3a8afa65c28d63c'

        Product.find = jest.fn().mockReturnValue({
            _id: "6150d62cf3a8afa65c28d642",
            nombre: "Test",
            descripcion: "test desc",
            valor: 50,
            stock: 1,
            owner: "6150d616f3a8afa65c28d63c",
            categoria: "Mascotas"
          })

        const response = await request(app).get("/products/" + idOwner).send()
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        expect(response.statusCode).toBe(200)
    })
})

describe('delete product', () => {
    
    beforeAll(async () => {
        ValidateAuthService.validateAuth = jest.fn().mockReturnValue(1)

    })
    test('delete product should return 200 status', async () => {
    
        const idProd = '6150d616f3a8afa65c28d63c'

        Product.findByIdAndDelete = jest.fn().mockReturnValue({
            _id: "6150d616f3a8afa65c28d63c",
            nombre: "Test",
            descripcion: "test desc",
            valor: 50,
            stock: 1,
            owner: "6150d62cf3a8afa65c28d642",
            categoria: "Mascotas"
        })

        const response = await request(app).delete("/products/" + idProd).send()
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        expect(response.statusCode).toBe(200)
        expect(response.text).toEqual(expect.stringContaining('Product deleted'))
    })
})

describe('update product', () => {
    beforeAll(async () => {
        ValidateAuthService.validateAuth = jest.fn().mockReturnValue(1)

    })
    
    test('update product should return 200 status', async () => {
    
        const idProd = '6150d616f3a8afa65c28d63c'

        Product.findByIdAndUpdate = jest.fn().mockReturnValue({
            _id: "6150d616f3a8afa65c28d63c",
            nombre: "Test",
            descripcion: "test desc",
            valor: 50,
            stock: 1,
            owner: "6150d62cf3a8afa65c28d642",
            categoria: "Mascotas"
        })

        const response = await request(app).put("/products/" + idProd).send()
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        expect(response.statusCode).toBe(200)
    })
})