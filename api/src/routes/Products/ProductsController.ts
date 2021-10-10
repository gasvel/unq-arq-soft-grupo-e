import { RequestHandler } from "express"
import Product from "./Product"
import User from "../Users/User"
import { isNullishCoalesce } from "typescript"

export const createProduct: RequestHandler = async (req, res) => {
   const prodExists = await Product.findOne({nombre: req.body.nombre}) 
   const ownerExists = await User.findById(req.body.owner) 
   
    if(prodExists || !ownerExists)
        return res.status(303).json({message: 'This product already exists or owner does not exist'})

    const prod = new Product(req.body)
    const savedProd = await prod.save()
    res.json(savedProd)
}

export const getProduct: RequestHandler = async (req, res) => {
    const prodFound = await Product.findById(req.params.id)
    if (!prodFound) return res.status(404).json({message: 'Product not found'})
    return res.json(prodFound)
}

export const getProducts: RequestHandler = async (req, res) => {
    try{
        const query = {}
        const paginate = (req.query.limit != undefined && req.query.page != undefined) ? getLimitSkip(req.query) : {}

        if(req.query.valor != undefined)
            query['valor'] = req.query.valor

        if(req.query.gte != undefined)
            query['valor'] = { $gte: req.query.gte}

        if(req.query.lte != undefined)
            query['valor'] = { $lte: req.query.lte}  
        
        if(req.query.categoria != undefined)
            query['categoria'] = req.query.categoria

        if(req.query.nombre != undefined)
            query['nombre'] = req.query.nombre

        const allProds = await Product.find(query, null, paginate)
        return res.json(allProds)
    }catch(error){
        return res.json(error)
    }
}

export const getProductsFromOwner: RequestHandler = async (req, res) => {
    try{

        const paginate = (req.query.limit != undefined && req.query.page != undefined) ? getLimitSkip(req.query) : {}

        const allProds = await Product.find({owner: req.params.owner}, null, paginate)
        return res.json(allProds)
    }catch(error){
        return res.json(error)
    }
}

export const getCategories: RequestHandler = async (req, res) => {
    const categories = Product.schema.path('categoria').options.enum.values
    return res.json(categories)
}

export const deleteProduct: RequestHandler = async (req, res) => {
    const prodToDelete = await Product.findByIdAndDelete(req.params.id)
    if (!prodToDelete) return res.status(404).json({message: 'Product not found'})
    return res.status(200).json({message: 'Product deleted'})
}

export const updateProduct: RequestHandler = async (req, res) => {
    const prodUpdated = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if (!prodUpdated) return res.status(404).json({message: 'Product not found'})
    return res.json(prodUpdated)
}

function getLimitSkip(queryParams){
    const paginate = {}

    const page = parseInt(queryParams.page)
    const limit = parseInt(queryParams.limit)
    
    paginate['limit'] = limit
    paginate['skip'] = page > 0 ? (page - 1) * limit : 0
    return paginate
}