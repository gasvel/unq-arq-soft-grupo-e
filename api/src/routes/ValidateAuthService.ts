import admin from "../firebaseAdmin";

class ValidateAuthService {
    validateAuth = async (req,res) =>{
        const bearerHeader = req.headers['authorization'];
    
        if (bearerHeader) {
          const bearer = bearerHeader.split(' ');
          const bearerToken = bearer[1];
          console.log(bearerToken)
          let user = await admin.auth().verifyIdToken(bearerToken)
          return user.uid
          
        } else {
          // Forbidden
          return null
        }
    }
}

export default new ValidateAuthService()