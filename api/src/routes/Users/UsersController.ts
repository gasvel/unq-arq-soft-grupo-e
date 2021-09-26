import { RequestHandler } from "express"
import User from './User'

export const createUser: RequestHandler = async (req, res) => {
    const userExists = await User.findOne({ $or: [
        {username: req.body.username},
        {email: req.body.email},
        {emailCorporativo: req.body.emailCorporativo},
        {razonSocial: req.body.razonSocial}
    ]})
     if(userExists)
         return res.status(303).json({message: 'This user already exists'})
 
     const user = new User(req.body)
     const savedUser = await user.save()
     res.json(savedUser)
 }

 export const getUser: RequestHandler = async (req, res) => {
    const userFound = await User.findOne({username: req.params.username, password: req.params.password}) 
    if (!userFound) return res.status(404).json({message: 'User not found'})
    return res.json(userFound)
}

export const getUsers: RequestHandler = async (req, res) => {
    try{
        const allUsers = await User.find()
        return res.json(allUsers)
    }catch(error){
        return res.json(error)
    }
}

export const deleteUser: RequestHandler = async (req, res) => {
    const userToDelete = await User.findByIdAndDelete(req.params.id)
    if (!userToDelete) return res.status(404).json({message: 'Uer not found'})
    return res.status(200).json({message: 'User deleted'})
}

export const updateUser: RequestHandler = async (req, res) => {
    const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if (!userUpdated) return res.status(404).json({message: 'User not found'})
    return res.json(userUpdated)
}