import React from 'react';
import './CrearProducto.css';

class CrearProducto extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: true,
            product: {
                nombre: "",
                descripcion: "",
                valor: 0
            }
        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFieldChange(event) {
        const target = event.target;
        const name = target.name;
    
        this.setState({
            ...this.state,
            product:{
                ...this.state.product,[name]: target.value
            }
          
        });
      }

      handleSubmit(event) {
        console.log('Producto: ' + JSON.stringify(this.state.product));
        event.preventDefault();
        this.setState({ ...this.state,isLoaded: false })
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.product)
        };
        fetch('https://arq1-meli-grupo-e.herokuapp.com/products', requestOptions)
            .then(data => {
                this.setState({ product:{
                    nombre: "",
                    descripcion: "",
                    valor: 0
                },error: null,isLoaded: true });
                this.props.onProductCreated();
            
            })
            .catch(err => {this.setState({ product:{
                nombre: "",
                descripcion: "",
                valor: 0
            },error: err,isLoaded: true })});
      }

    render(){
        const { error, isLoaded } = this.state;
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
                            <input type="text" name="nombre" value={this.state.product.nombre} onChange={this.handleFieldChange}></input>
                        </label>
                    </div>
                    <div className="form-field">
                        <label>
                            Descripción:
                            <textarea name="descripcion" value={this.state.product.descripcion} onChange={this.handleFieldChange}/>
                        </label>
                    </div>
                    <div className="form-field">
                        <label>
                            Valor:
                            $<input name="valor" type="number" value={this.state.product.valor} onChange={this.handleFieldChange}></input>
                        </label>
                    </div>
                    <div className="form-field">
                        <button type="submit" title="Crear producto">Crear producto</button>
                    </div>
                </form>
                </div>
        );
        }
    }
}

export default CrearProducto;