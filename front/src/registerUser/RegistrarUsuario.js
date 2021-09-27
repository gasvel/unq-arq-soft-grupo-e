import React from 'react';
import './RegistrarUsuario.css';
import AES from 'crypto-js/aes';

class RegistrarUsuario extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: true,
            user: {
                nombre:"",
                apellido:"",
                username:"",
                password:"",
                seller:false,
                email:"",
                razonSocial:"",
                emailCorporativo:""

            }
        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'http://localhost:3000'},
            body: JSON.stringify(this.state.user.map((k,v) => {if(k==="password"){return AES.encrypt(v,'es un secreto').toString();}return v;}))
        };
        fetch('https://arq1-meli-grupo-e.herokuapp.com/users', requestOptions)
            .then(data => {
                console.log(data);
                this.setState({ user: {
                    nombre:"",
                    apellido:"",
                    username:"",
                    password:"",
                    seller:false,
                    email:"",
                    razonSocial:"",
                    emailCorporativo:""
    
                },error: null,isLoaded: true });
                if(data.status === 200){
                    this.props.onUserCreated();
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
        let camposVendedor = <br/>
        if(user.esVendedor){
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
        } else {
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
                            Contraseña:
                            <input name="password" type="password" value={user.password} onChange={this.handleFieldChange}></input>
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