import React from 'react';
class Listado extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            products: []
        }
    }

    componentDidMount(){
        fetch("https://arq1-meli-grupo-e.herokuapp.com/products").then(res => res.json())
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
        <ul>
          {items.map(item => (
            <li key={item._id}>
              <div className="product-image"></div>
              <div className="product-content">
              <h2>{item.nombre}</h2>
              <p>{item.descripcion}</p>
              $ {item.valor}
                </div>  
            </li>
          ))}
        </ul>
      );
    }
  }
    
}
export default Listado;