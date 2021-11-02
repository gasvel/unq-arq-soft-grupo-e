import admin from "../firebaseAdmin";

class ValidateAuthService {
    validateAuth = (req,res) =>{
        const bearerHeader = req.headers['authorization'];
    
        if (bearerHeader) {
          const bearer = bearerHeader.split(' ');
          const bearerToken = bearer[1];
          admin.auth().verifyIdToken(bearerToken)
          .then((decodedToken) => {
            return decodedToken.uid;
          })
          .catch((error) => {
            return null
          });
        } else {
          // Forbidden
          return null
        }
    }
}

export default new ValidateAuthService()