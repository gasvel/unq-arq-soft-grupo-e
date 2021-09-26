import React from 'react';
import './RegistrarUsuario.css';

class RegistrarUsuario extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: true,
            user: {
                nombre: "",
                apellido: "",
                email: "",
                esVendedor: false,
                razonSocial: "",
                emailCorpo: "",
                password: ""

            }
        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFieldChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
            ...this.state,
            user:{
                ...this.state.user,[name]: value
            }
          
        });
      }

      handleSubmit(event) {
        console.log('Usuario: ' + JSON.stringify(this.state.user));
        event.preventDefault();
        this.setState({ ...this.state,isLoaded: false })
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.user)
        };
        fetch('https://arq1-meli-grupo-e.herokuapp.com/users', requestOptions)
            .then(data => {
                this.setState({ user: {
                    nombre: "",
                    apellido: "",
                    email: "",
                    esVendedor: false,
                    razonSocial: "",
                    emailCorpo: "",
                    password: ""
    
                },error: null,isLoaded: true });
                if(data.status === 200){
                    this.props.onUserCreated();
                }
                else{
                    alert("Ocurrió un error en el registro. Por favor intente nuevamente: " + data.statusText);
                }


            
            })
            .catch(err => {this.setState({ user: {
                nombre: "",
                apellido: "",
                email: "",
                esVendedor: false,
                razonSocial: "",
                emailCorpo: "",
                password: ""

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
                            <input name="emailCorpo" type="email" value={user.emailCorpo} onChange={this.handleFieldChange}></input>
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
                            <input type="checkbox" name="esVendedor" checked={user.esVendedor} onChange={this.handleFieldChange}></input>
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