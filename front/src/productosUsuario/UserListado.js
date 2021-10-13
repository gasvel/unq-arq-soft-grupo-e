import React from 'react';
import './UserListado.css';

class UserListado extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
        // this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete = (prodId) => {
        this.setState({ ...this.state,isLoaded: false })
        const requestOptions = {
            method: 'DELETE'
        };
        fetch('https://arq1-meli-grupo-e.herokuapp.com/products/' + prodId, requestOptions)
            .then(data => {
                console.log(data);
                this.setState({ ...this.state,error: null,isLoaded: true });
                this.componentDidMount();
            
            })
            .catch(err => {this.setState({ ...this.state,error: err,isLoaded: true })});
    }

    handleEdit = (prod) => {
        this.props.onProductEdit(prod);
    }

    componentDidMount(){
        fetch("https://arq1-meli-grupo-e.herokuapp.com/products/" +localStorage.getItem("user")).then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render(){
        const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Cargando...</div>;
    } else {
      return (
          <div>
          {this.state.items.map(item => (
            <div key={item._id} className="product-card">
              <div className="product-image"><img src={item.photo} height="100px"/></div>
              <div className="product-content">
              <h2>{item.nombre}</h2>
              <p>{item.descripcion}</p>
              $ {item.valor}
                </div>  
                <div className="footer">
                    <button title="Borrar" onClick={() => {this.handleDelete(item._id)}}>Eliminar</button>   
                    <br/>
                    <button title="Editar" onClick={() => {this.handleEdit(item)}}>Editar</button> 
                </div>
            </div>
          ))}
          </div>
      );
    }
  }
    
}
export default UserListado;