import React from 'react';
import './RegistrarUsuario.css';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import Button from 'react-bootstrap/Button';
import logo from '../google-logo.png';
import { Container } from 'react-bootstrap';


class RegistrarUsuario extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: true,
            screen: 'auth',
            token: null,
            user: {
                nombre:"",
                apellido:"",
                username:"",
                seller:false,
                email:"",
                razonSocial:"",
                emailCorporativo:"",
                uid: ""

            }
        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGoogleSignIn = this.handleGoogleSignIn.bind(this);
    }
    

    handleGoogleSignIn(event){
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // The signed-in user info.
            const user = result.user;
            user.getIdToken(true).then((idToken) => {
                this.setState({...this.state, token : idToken,screen: "form", user: {...this.state.user,uid: user.uid, nombre: user.displayName.split(' ')[0],email: user.email}})

            })
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    handleFieldChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

    
        this.setState({
            ...this.state,
            user:{
                ...this.state.user,[name]: value
            }
          
        });
      }

      handleSubmit(event) {
        event.preventDefault();
        this.setState({ ...this.state,isLoaded: false })
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'http://localhost:3000',
                        'Authorization': 'Bearer ' + this.state.token
        },
            body: JSON.stringify(this.state.user)
        };
        fetch('https://arq1-meli-grupo-e.herokuapp.com/users', requestOptions)
            .then(data => {
                console.log(data.status);
                this.setState({ user: {
                    nombre:"",
                    apellido:"",
                    username:"",
                    seller:false,
                    email:"",
                    razonSocial:"",
                    emailCorporativo:""
    
                },error: null,isLoaded: true });
                if(data.status === 200){
                    this.props.onUserCreated();
                }
                else if(data.status === 403){
                    alert("Error en la autenticación");
                }
                else if(data.status === 303){
                    alert("Usuario ya registrado");
                }
                else if(data.status === 400){
                    alert("Error en el ingreso de campos")
                }
                else{
                    alert("Ocurrió un error en el registro. Por favor intente nuevamente: " + data.statusText);
                }


            
            })
            .catch(err => {this.setState({ user: {
                nombre:"",
                apellido:"",
                username:"",
                password:"",
                seller:false,
                email:"",
                razonSocial:"",
                emailCorporativo:""

            },error: err,isLoaded: true });alert("Ocurrió un error en el registro. Por favor intente nuevamente ");});
      }

    render(){
        const { error, isLoaded,user } = this.state;
        const auth = getAuth().currentUser;
        console.log(auth);
        let camposVendedor = <br/>
        if(auth){
            <div>
                {auth.displayName}
            </div>
        }
        if(user.seller){
            camposVendedor = <div>
                <div className="form-field">
                        <label>
                            Razón Social:
                            <input type="text" name="razonSocial" value={user.razonSocial} onChange={this.handleFieldChange}></input>
                        </label>
                    </div>
                    <div className="form-field">
                        <label>
                            Mail Corporativo:
                            <input name="emailCorporativo" type="email" value={user.emailCorporativo} onChange={this.handleFieldChange}></input>
                        </label>
                    </div>
            </div>
        }
        if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Cargando...</div>;
        } else if(this.state.screen === "auth"){
            return(<Container className="registerContainer">
                <img src={logo} width="150px"></img> <br/> <br/>
                <Button onClick={this.handleGoogleSignIn}>Registrarme con Google</Button>
                </Container>
            
            )
        }else{
        return (
            <div className="product-form">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-field">
                        <label>
                            Nombre:
                            <input type="text" name="nombre" value={user.nombre} onChange={this.handleFieldChange}></input>
                        </label>
                    </div>
                    <div className="form-field">
                        <label>
                            Apellido:
                            <input type="text" name="apellido" value={user.apellido} onChange={this.handleFieldChange}></input>
                        </label>
                    </div>
                    <div className="form-field">
                        <label>
                            Nombre de usuario:
                            <input type="text" name="username" value={user.username} onChange={this.handleFieldChange}></input>
                        </label>
                    </div>
                    <div className="form-field">
                        <label>
                            Mail:
                            <input name="email" type="email" value={user.email} onChange={this.handleFieldChange}></input>
                        </label>
                    </div>
                    <div className="form-field">
                        <label>
                            Es vendedor?:
                            <input type="checkbox" name="seller" checked={user.seller} onChange={this.handleFieldChange}></input>
                        </label>
                    </div>
                    {camposVendedor}
                    <div className="form-field">
                        <button type="submit" >Terminar registro</button>
                    </div>
                </form>
                </div>
        );
        }
    }
}
export default RegistrarUsuario;