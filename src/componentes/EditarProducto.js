import React, { Component } from 'react';

/// Redux
import {connect} from 'react-redux';
import { mostrarProducto, editarProducto } from '../actions/productosActions';

class editarProduct extends Component {
    state = {
        nombre: '',
        precio: '',
        error: false
    }

    componentDidMount () { 
        /// console.log(this.props.match.params.id);  leeer el parametro por cabecera
        //this.props.mostrarProducto(this.props.match.params.id);
        const {id} = this.props.match.params;

        this.props.mostrarProducto(id);
    }

    componentWillReceiveProps(nextProps, nextState) { 
        console.log(nextProps);
        const {nombre, precio } =  nextProps.producto;

        this.setState({ 
            nombre,
            precio
        })
    }

    nombreProducto = e => { 
        this.setState({ 
            nombre: e.target.value
        })
    }

    nuevoPrecio = e => { 
        this.setState({
            precio: e.target.value
        })
    }

    actualizarProducto = e => {
        e.preventDefault();

        const {nombre, precio } = this.state;

        if(nombre === '' || precio === '') { 
            this.setState({
                error: true
            })
        }else { 
            this.setState({
                error: false
            })
        }

        /// tomar el ID
        const {id} = this.props.match.params;

        // crear el nuevo objeto
        const infoProducto = { 
            id,
            nombre,
            precio
        }
        console.log(infoProducto);

        // actualizar el nuevo producto
        this.props.editarProducto(infoProducto);
        
        // redireccionar
        this.props.history.push('/')
        

    }

    render() {
        const {nombre, precio, error} = this.state;
        return (
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Agregar Nuevo Producto</h2>
                            <form onSubmit={this.actualizarProducto} >
                                <div className="form-group">
                                    <label>Titulo</label>
                                    <input type="text" defaultValue={nombre}  onChange={this.nombreProducto} className="form-control" placeholder="Titulo" />
                                </div>
                                <div className="form-group">
                                    <label>Precio del Producto</label>
                                    <input type="text" defaultValue={precio} onChange={this.nuevoPrecio} className="form-control" placeholder="Precio" />
                                </div>
                                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Actualizar Datos</button>
                            </form>
                            { 
                                error ?
                                <div className="font-weight-bold alert alert-danger text-center mt-4">
                                Todosos Losw campos son Obligatorios
                                </div> 
                                : ''
                            }
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

// state
const mapStateToProps = state => ({ 
    producto: state.productos.producto
})

export default connect(mapStateToProps, {mostrarProducto, editarProducto})(editarProduct);