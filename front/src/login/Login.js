import React from 'react';
import './Login.css';
import AES from 'crypto-js/aes';


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
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFieldChange(event) {
        const target = event.target;
        let value = target.value;
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
        fetch('https://arq1-meli-grupo-e.herokuapp.com/users/'+this.state.user.username+'&'+this.state.user.password)
            .then((res) => res.json()).then(data => {
                console.log(data);
                this.setState({ user: {
                    username:"",
                    password:""
    
                },error: null,isLoaded: true });
                if(data){
                    localStorage.setItem("user",data._id);
                    localStorage.setItem("username",data.username);
                    this.props.onUserLogin();
                }
                else{
                    alert("Ocurrió un error en el ingreso. Por favor intente nuevamente: " + data.statusText);
                }


            
            })
            .catch(err => {this.setState({ user: {
                username:"",
                password:""

            },error: err,isLoaded: true });alert("Ocurrió un error en el ingreso Por favor intente nuevamente ");});
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
                <form onSubmit={this.handleSubmit}>
                    <div className="form-field">
                        <label>
                            Nombre de usuario:
                            <input type="text" name="username" value={user.username} onChange={this.handleFieldChange}></input>
                        </label>
                    </div>
                    <div className="form-field">
                        <label>
                            Contraseña:
                            <input name="password" type="password" value={user.password} onChange={this.handleFieldChange}></input>
                        </label>
                    </div>
                    <div className="form-field">
                        <button type="submit" >Ingresar</button>
                    </div>
                </form>
                </div>
        );
        }
    }

}
export default Login;