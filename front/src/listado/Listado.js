import React from 'react';
import ReactDOM from 'react-dom';
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
              {item.nombre} {item.descripcion} {item.valor}
            </li>
          ))}
        </ul>
      );
    }
  }
    
}
export default Listado;