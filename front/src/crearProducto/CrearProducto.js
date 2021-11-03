import React from 'react';
import './CrearProducto.css';
import { getAuth } from "@firebase/auth";
import {uploadBytes,getDownloadURL ,ref as sRef } from "firebase/storage";
import db from '../firebase';



class CrearProducto extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            previewImg: null,
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
        this.fileInput = React.createRef();
      this.handleFileSelection = this.handleFileSelection.bind(this)
        if(this.props.product){
            this.state ={...this.state, product: this.props.product};
        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFileSelection(event){
        let previewURL = URL.createObjectURL(event.target.files[0]);
        this.setState({previewImg: previewURL});
      }

    submitPhoto() {
        let userId = localStorage.getItem("user");
        let pathUrl = userId + new Date().getTime() +".jpg";
        const stRef = sRef(db,pathUrl);
      return uploadBytes(stRef, this.fileInput.current.files[0]).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
              console.log(downloadURL);
              this.setState({...this.state,product: {...this.state.product,photo: downloadURL}})
              this.createUser();
          });
        });
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

      createUser() {
        let userId = localStorage.getItem("user");
        if(!this.state.product.photo){
            alert("Debe cargar una imagen del producto para poder publicarlo.");
            return;
        }

        let product = {...this.state.product,owner: userId};
        
        getAuth().currentUser.getIdToken(true).then((idToken) => {
            const requestOptions = this.state.product._id ? {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + idToken },
                body: JSON.stringify(product)
            } : {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + idToken },
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
        })
        
      }

      handleSubmit(event) {
        event.preventDefault();
        if(getAuth().currentUser == null){
            alert("Su sesión expiró, vuelva a identificarse")
            return;
        }
        this.setState({ ...this.state,isLoaded: false })
        if(!this.state.product.photo){
        this.submitPhoto();
        }
        else{
            this.createUser();
        }
      }

    render(){
        const { error, isLoaded } = this.state;
        let preview=this.state.product.photo ? <img src={this.state.product.photo} className="imgPreview" alt="ProductImg"/> : this.state.previewImg != null ? <img src={this.state.previewImg} className="imgPreview" alt="ProductImg"/> : <span/>; ;
        let btnMsg = this.state.product._id ? "Actualizar" : "Crear producto";
        if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Cargando...</div>;
        } else {
        return (
            <div className="product-form">
                <div className="imgSection">
                {preview}
                </div>
                <label>
                    Selecciona una foto del producto:  
                    <input type="file" accept="image/jpeg" ref={this.fileInput} onChange={this.handleFileSelection}/>
                </label>
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
                                    Colecciones
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