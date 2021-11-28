import { RequestHandler } from "express"
import Product from "../Products/Product"
import WrapperProduct from "../WrapperProducts/WrapperProduct"
import User from "../Users/User"
import Sale from "./Sales"
import ValidateAuthService from "../ValidateAuthService"
import { ObjectId } from "mongoose"

const checkProducts = (products, idProdsCantidad) => {
    const result = {}
    result['stock'] = false
    result['owner'] = false
    for(var product of products){
        result['stock'] = result['stock'] || product.get('stock') < idProdsCantidad[product.get('_id')]
        result['owner'] = result['owner'] || !product.get('owner').get('seller')
    }
    return result
}

export const createSale: RequestHandler = async (req, res) => {
    let uid = await ValidateAuthService.validateAuth(req,res)
    if(!uid){
        return res.status(403).json({message: "Unauthorized"})
    }
    if(!req.body.formaPago || !req.body.buyer || !req.body.costoTotal || !req.body.products)
        return res.status(400).json({message: 'Missing required field, check formaPago products buyer and costoTotal products should not be empty.'})
   
    var prodIds : ObjectId[] = []
    var prodIdCantidad = {}
    
    req.body.products.forEach(function (prodSchema) {
        prodIds.push(prodSchema.productId)
        prodIdCantidad[prodSchema.productId] = prodSchema.cantidadProductos
    })
    const buyerExists = await User.findById(req.body.buyer)
    let allProducts = await Product.find({
        '_id':{ $in: prodIds }
    }).populate('owner')

    const resultCheck = checkProducts(allProducts, prodIdCantidad)
    
    if(!buyerExists || resultCheck['stock'])
        return res.status(400).json({message: 'Buyer or one of the products does not exist for this sale or product is out of stock.'})

    if(resultCheck['owner'])
        return res.status(400).json({message: 'Owner of one of the product is not a seller or does not exist.'})

    var wrappersId : ObjectId[] = []
    var ownerIds : ObjectId[] = []
    var processProduct = new Promise<void>( (resolve, reject) => { 
        allProducts.forEach(async function (prod, index, array) {
            const wrapperProd = new WrapperProduct({
                nombre: prod.get('nombre'),
                valor: prod.get('valor'),
                owner: prod.get('owner'),
                categoria: prod.get('categoria')
            })
            const savedWrapperProd = await wrapperProd.save()

            wrappersId.push(savedWrapperProd.get('_id'))
            ownerIds.push(prod.get('owner'))
    
            prod.set({ stock: prod.get('stock') - prodIdCantidad[prod.get('_id')] })
            await prod.save()
            if(index === array.length - 1) resolve()
        })
    })
    
    processProduct.then( async () => {
        let sale = new Sale(req.body)
        sale.set({ wrapperProduct: wrappersId })
        sale.set({ seller: ownerIds })
        const savedSale = await sale.save()
        res.json(savedSale)
    })
}

export const getSale: RequestHandler = async (req, res) => {
    let uid = await ValidateAuthService.validateAuth(req,res)
    if(!uid){
        return res.status(403).json({message: "Unauthorized"})
    }
    const saleFound = await Sale.findById(req.params.id).populate('buyer').populate('seller').populate('wrapperProduct')
    if (!saleFound) return res.status(404).json({message: 'Sale not found'})
    return res.json(saleFound)
}

export const getSales: RequestHandler = async (req, res) => {
    let uid = await ValidateAuthService.validateAuth(req,res)
    if(!uid){
        return res.status(403).json({message: "Unauthorized"})
    }
    try{
        const query = {}
        const paginate = (req.query.limit != undefined && req.query.page != undefined) ? getLimitSkip(req.query) : {}
        if(req.query.buyer != undefined)
            query['buyer'] = req.query.buyer

        if(req.query.seller != undefined)
            query['seller'] = req.query.seller

        const allSales = await Sale.find(query, null, paginate).populate('buyer').populate('seller').populate('wrapperProduct')
        return res.json(allSales)
    }catch(error){
        return res.json(error)
    }
}

export const deleteSale: RequestHandler = async (req, res) => {
    let uid = await ValidateAuthService.validateAuth(req,res)
    if(!uid){
        return res.status(403).json({message: "Unauthorized"})
    }
    const saleToDelete = await Sale.findByIdAndDelete(req.params.id)
    if (!saleToDelete) return res.status(404).json({message: 'Sale not found'})
    return res.status(200).json({message: 'Sale deleted'})
}

export const updateSale: RequestHandler = async (req, res) => {
    let uid = await ValidateAuthService.validateAuth(req,res)
    if(!uid){
        return res.status(403).json({message: "Unauthorized"})
    }
    const saleUpdated = await Sale.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if (!saleUpdated) return res.status(404).json({message: 'Sale not found'})
    return res.json(saleUpdated)
}

function getLimitSkip(queryParams){
    const paginate = {}

    const page = parseInt(queryParams.page)
    const limit = parseInt(queryParams.limit)
    
    paginate['limit'] = limit
    paginate['skip'] = page > 0 ? (page - 1) * limit : 0
    return paginate
}