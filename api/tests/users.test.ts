import app from '../src/app'
import request from 'supertest'
import User from '../src/routes/Users/User'

describe('create user', () => {

    test('post new user returning status 200', async () => {

        User.findOne = jest.fn().mockReturnValue(null)

        User.prototype.save = jest.fn().mockImplementation( () => {
            
            const user =  new User({
                _id: "6150d5b7f3a8afa65c28d634",
                nombre: "hello world user2",
                apellido: "apellido test2",
                username: "username3",
                password: "password1",
                seller: true,
                email: "email3",
                razonSocial: "123",
                emailCorporativo: "emailC3"
            })

            return user
        })
        
        const response = await request(app).post('/users').send({
            _id: "6150d5b7f3a8afa65c28d634",
            nombre: "hello world user2",
            apellido: "apellido test2",
            username: "username3",
            password: "password1",
            seller: true,
            email: "email3",
            razonSocial: "123",
            emailCorporativo: "emailC3"
          })

        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        expect(response.statusCode).toBe(200)
    })

    test('post new user returning status 400 missing required fields', async () => {

        User.findOne = jest.fn().mockReturnValue({
            _id: '6150d616f3a8afa65c28d63c',
            nombre: 'cambia nombre opa',
            apellido: 'apellido test',
            username: 'username1',
            password: 'password1',
            seller: true,
            email: 'email1',
            razonSocial: '12',
            emailCorporativo: 'emailC1'
        })
        
        User.prototype.save = jest.fn().mockImplementation( () => {
            
            const user =  new User({
                _id: "6150d5b7f3a8afa65c28d633",
                nombre: "hello world user1",
                apellido: "apellido test",
                username: "username2",
                password: "password1",
                seller: true,
                email: "email2",
                razonSocial: "1",
                emailCorporativo: "emailC2"
              })

            return user
        })
        
        const response = await request(app).post('/users').send({
            _id: "6150d5b7f3a8afa65c28d633",
            apellido: "apellido test",
            username: "username2",
            password: "password1",
            seller: true,
            email: "email2",
            razonSocial: "1",
            emailCorporativo: "emailC2"
          })

        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        expect(response.statusCode).toBe(400)
        expect(response.text).toEqual(expect.stringContaining('Missing required field, check name lastname username password seller and email should not be empty.'))
    })
})

describe('get users', () => {
    
    test('get user should return 200 status', async () => {

        const userUsername = "username3"
        const userPassword = "password1"

        User.findOne = jest.fn().mockReturnValue({
            _id: "6150d5b7f3a8afa65c28d634",
            nombre: "hello world user2",
            apellido: "apellido test2",
            username: userUsername,
            password: userPassword,
            seller: true,
            email: "email3",
            razonSocial: "123",
            emailCorporativo: "emailC3"
        })

        const response = await request(app).get("/users/" + userUsername + "&" + userPassword).send()
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        expect(response.statusCode).toBe(200)
    })

    test('get users should return 200 status', async () => {
        
        const expected = [
            {
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
            {
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
        ]

        User.find = jest.fn().mockReturnValue(expected)

        const response = await request(app).get("/users").send()
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        expect(response.body).toEqual(expected)
        expect(response.statusCode).toBe(200)
    })
})

describe('delete user', () => {
    
    test('delete user should return 200 status', async () => {
    
        const idUser = '6150d5b7f3a8afa65c28d634'

        User.findByIdAndDelete = jest.fn().mockReturnValue({
            _id: "6150d5b7f3a8afa65c28d634",
            nombre: "hello world user2",
            apellido: "apellido test2",
            username: "username3",
            password: "password1",
            seller: true,
            email: "email3",
            razonSocial: "123",
            emailCorporativo: "emailC3"
        })

        const response = await request(app).delete("/users/" + idUser).send()
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        expect(response.statusCode).toBe(200)
        expect(response.text).toEqual(expect.stringContaining('User deleted'))
    })
})

describe('update user', () => {
    
    test('update user should return 200 status', async () => {
    
        const idUser = '6150d5b7f3a8afa65c28d634'

        User.findByIdAndUpdate = jest.fn().mockReturnValue({
            _id: "6150d5b7f3a8afa65c28d634",
            nombre: "hello world user2",
            apellido: "apellido test2",
            username: "username3",
            password: "password1",
            seller: true,
            email: "email3",
            razonSocial: "123",
            emailCorporativo: "emailC3"
        })

        const response = await request(app).put("/users/" + idUser).send()
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        expect(response.statusCode).toBe(200)
    })
})