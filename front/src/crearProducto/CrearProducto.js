import React from 'react';
import './CrearProducto.css';
import UploadFile from '../uploadFile/UploadFile';

class CrearProducto extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: true,
            product: {
                nombre: "",
                descripcion: "",
                valor: 0,
                stock: 1,
                categoria: "Agro"
            }
        }
        console.log(this.props.product);
        if(this.props.product){
            this.state ={...this.state, product: this.props.product};
        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImgUploaded = this.handleImgUploaded.bind(this);
    }

    handleFieldChange(event) {
        const target = event.target;
        const name = target.name;
        let val = name === "valor" || name === "stock" ? parseInt(target.value) : target.value;
    
        this.setState({
            ...this.state,
            product:{
                ...this.state.product,[name]: val
            }
          
        });
      }

      handleImgUploaded(url){
          this.setState( {...this.state,
            product:{
              ...this.state.product,photo: url
          }
        }
        );
        
      }

      handleSubmit(event) {
        event.preventDefault();
        let userId = localStorage.getItem("user");
        if(!this.state.product.photo){
            alert("Debe cargar una imagen del producto para poder publicarlo.");
            return;
        }
        let product = {...this.state.product,owner: userId};
        this.setState({ ...this.state,isLoaded: false })
        const requestOptions = this.state.product._id ? {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        } : {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        };

        let url = 'https://arq1-meli-grupo-e.herokuapp.com/products';
        if(this.state.product._id){
            url = url + '/' + this.state.product._id
        }
        fetch(url, requestOptions)
            .then(data => {
                console.log(data);
                this.setState({ product:{
                    nombre: "",
                    descripcion: "",
                    valor: 0,
                    stock: 1,
                    categoria: "Agro"
                    
                },error: null,isLoaded: true });
                this.props.onProductCreated();
            
            })
            .catch(err => {this.setState({ product:{
                nombre: "",
                descripcion: "",
                valor: 0,
                stock: 1,
                categoria: "Agro"
            },error: err,isLoaded: true })});
      }

    render(){
        const { error, isLoaded } = this.state;
        let btnMsg = this.state.product._id ? "Actualizar" : "Crear producto";
        if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Cargando...</div>;
        } else {
        return (
            <div className="product-form">
                <UploadFile onImageUploaded={this.handleImgUploaded} preview={this.state.product.photo}/>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-field">
                        <label>
                            Nombre:
                            <input type="text" name="nombre" required="true" value={this.state.product.nombre} onChange={this.handleFieldChange}></input>
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
                            $<input name="valor" type="number" required="true" value={this.state.product.valor} min="1" onChange={this.handleFieldChange}></input>
                        </label>
                    </div>
                    <div className="form-field">
                        <label>
                            Stock:
                            <input name="stock" type="number" required="true" value={this.state.product.stock} min="1" onChange={this.handleFieldChange}></input>
                        </label>
                    </div>
                    <div className="form-field">
                        <label>
                            Categoria:
                            <select name="categoria" value={this.state.product.categoria} onChange={this.handleFieldChange}>
                                <option value="Agro">
                                    Agro
                                </option>
                                <option value="Alimentos">
                                    Alimentos
                                </option>
                                <option value="Arte">
                                    Arte
                                </option>
                                <option value="Colleciones">
                                    Coleciones
                                </option>
                                <option value="Deportes">
                                    Deportes
                                </option>
                                <option value="Inmuebles">
                                    Inmuebles
                                </option>
                                <option value="Mascotas">
                                    Mascotas
                                </option>
                                <option value="Tecnologia">
                                    Técnologia
                                </option>
                                <option value="Vehiculos">
                                    Vehículos
                                </option>
                                <option value="Vestimenta">
                                    Vestimenta
                                </option>
                            </select>
                        </label>
                    </div>
                    <div className="form-field">
                        <button type="submit" title={btnMsg}>{btnMsg}</button>
                    </div>
                </form>
                </div>
        );
        }
    }
}

export default CrearProducto;