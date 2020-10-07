import React, { Component } from 'react'
import {storeProducts,detailProduct} from './data';

const ProductContext = React.createContext();
//provider
//consumer

class ProductProvider extends Component {
    state={
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modelOpen: false,
        modelProduct: detailProduct,
        cartSubtotal: 0,
        cartTotal: 0,
        cartTax: 0
    }

    componentDidMount = () => {
        this.setProducts();
    }

    setProducts =() => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem]
        })
        this.setState(()=>{
            return {products: tempProducts}
        })
    }

    getItem = (id) => {
        const products = this.state.products.find(item => item.id == id)
        return products
    }
    handleDetails = (id)=>{
       const products = this.getItem(id);
       this.setState(()=> {
           return {detailProduct: products}
       })
    }

    addToCart = (id)=>{
        const tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.count = 1;
        product.inCart = true;
        const price = product.price;
        product.total = price;
        this.setState(()=>{
            return {products: tempProducts, cart: [...this.state.cart, product]}
        },
        ()=> {this.addTotals()})
    }
    
    openModel = (id) => {
        const product = this.getItem(id);
        this.setState(()=> {
            return {modelProduct: product, modelOpen: true}
        })
    }
    closeModel = (id) => {
        this.setState(()=> {
            return {modelOpen: false}
        })
    } 
    increment = id => {
        let tempCart = [...this.state.cart];
        let selectedProduct = tempCart.find(item => item.id == id);
        let index = tempCart.indexOf(selectedProduct);
        let product = tempCart[index]
        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(()=> {return {cart: tempCart}}, ()=> {this.addTotals()})

    }
    decrement = id => {
        let tempCart = [...this.state.cart];
        let selectedProduct = tempCart.find(item => item.id == id);
        let index = tempCart.indexOf(selectedProduct);
        let product = tempCart[index];
        product.count = product.count - 1;
        if(product.count == 0){
            this.removeItems(id);
        }
        else{
            product.total = product.count * product.price;
            this.setState(()=>{return {cart: tempCart}}, ()=>{this.addTotals()})
        }

    }
    removeItems = id => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id)
        const index = tempProducts.indexOf(this.getItem(id));
        let removeProduct = tempProducts[index];
        removeProduct.inCart = false;
        removeProduct.count = 0;
        removeProduct.total = 0;
        this.setState(()=>{
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        }, ()=> {
            this.addTotals()
        })
    }
    clearCart = () => {
        this.setState(()=> {
            return {cart: []}
        }, (()=> {
            this.setProducts()
            this.addTotals()
        }))
    }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map((item)=> {
            subTotal += item.total;
        })
        let tempTax = subTotal * .18;
        let tax = parseFloat(tempTax.toFixed(2));
        let total = parseFloat((subTotal + tax).toFixed(2));
        this.setState(()=> {
            return {
                cartSubtotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }
    render() {
        return (
            <ProductContext.Provider 
            value={{
            ...this.state, 
            handleDetails: this.handleDetails,
            addToCart: this.addToCart,
            openModel: this.openModel,
            closeModel: this.closeModel,
            increment: this.increment,
            decrement: this.decrement,
            removeItems: this.removeItems,
            clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
