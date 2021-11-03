import React from 'react';
import './Login.css';
import Button from 'react-bootstrap/Button';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: true,
            user: {
                username: "",
                password: ""
            }
        }
        this.handleGoogleSignIn = this.handleGoogleSignIn.bind(this)
    }

      handleGoogleSignIn(event){
        this.setState({ ...this.state,isLoaded: false })
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // The signed-in user info.
            const user = result.user;
            user.getIdToken(/* forceRefresh */ true).then((idToken) => {
                const requestOptions = {
                    method: 'GET',
                    headers: { 
                                "Authorization": "Bearer " + idToken,
                                "Accept": 'application/json'
                            }
                };
                console.log(idToken);
                fetch('https://arq1-meli-grupo-e.herokuapp.com/users/login', requestOptions)
                .then((res) => {
                    console.log(res.status);
                    if(res.status === 403)
                    {
                        alert("Autenticación inválida");
                        return null;
                    }
                    else if(res.status === 404){
                        alert("Usuario no registrado. Por favor, proceda a realizar el registro de su cuenta");
                        return null;
                    }
                    return res.json()
                }).then(data => {
                    console.log(data)
                    if(data){
                    this.setState({ error: null,isLoaded: true });
                    localStorage.setItem("user",data._id);
                    localStorage.setItem("username",data.username);
                    localStorage.setItem("seller",data.seller.toString());
                    this.props.onUserLogin();
                    }
                    else{
                        this.setState({isLoaded: true })
                        alert("Ocurrió un error en el ingreso. Por favor intente nuevamente");
                    }
                })
                .catch(err => {this.setState({error: err,isLoaded: true });console.log(JSON.stringify(err));alert("Ocurrió un error en el ingreso Por favor intente nuevamente ");});
              }).catch(function(error) {
                // Handle error
              });

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            alert(errorMessage);
            // ...
        });
    }

    render(){
        const { error, isLoaded,user } = this.state;
        if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Cargando...</div>;
        } else {
        return (
            <div className="product-form">
                <Button onClick={this.handleGoogleSignIn} variant="success">Ingresear con Google</Button>
                </div>
        );
        }
    }

}
export default Login;