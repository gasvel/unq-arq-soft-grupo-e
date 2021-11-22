import { RequestHandler } from "express"
import Product from "../Products/Product"
import WrapperProduct from "../WrapperProducts/WrapperProduct"
import User from "../Users/User"
import Sale from "./Sales"
import ValidateAuthService from "../ValidateAuthService"

export const createSale: RequestHandler = async (req, res) => {
    let uid = await ValidateAuthService.validateAuth(req,res)
    if(!uid){
        return res.status(403).json({message: "Unauthorized"})
    }
    if(!req.body.formaPago || !req.body.product || !req.body.buyer || !req.body.taxes)
        return res.status(400).json({message: 'Missing required field, check formaPago product buyer and taxes should not be empty.'})
   
    const buyerExists = await User.findById(req.body.buyer)
    const productExists = await Product.findById(req.body.product)
   
    if(!buyerExists || !productExists)
        return res.status(400).json({message: 'Buyer or product does not exist for this sale.'})

    const sellerExists = await User.findById(productExists.get('owner'))
    if(!sellerExists || !sellerExists.get('seller'))
        return res.status(400).json({message: 'Owner of the product is not a seller or does not exist.'})

    const wrapperProd = new WrapperProduct({
        nombre: productExists.get('nombre'),
        valor: productExists.get('valor'),
        owner: productExists.get('owner'),
        categoria: productExists.get('categoria')
    })
    const savedWrapperProd = await wrapperProd.save()
    let sale = new Sale(req.body)
    sale.set({ wrapperProduct: savedWrapperProd.get('_id') })
    sale.set({ seller: productExists.get('owner') })
    const savedSale = await sale.save()
    res.json(savedSale)
}

export const getSale: RequestHandler = async (req, res) => {
    let uid = await ValidateAuthService.validateAuth(req,res)
    if(!uid){
        return res.status(403).json({message: "Unauthorized"})
    }
    const saleFound = await Sale.findById(req.params.id)
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