import React, { Component } from 'react'
import Product from './Product'
import Title from './Title';
import {ProductConsumer} from '../context';

export default class ProductList extends Component {
    render() {
        console.log(this.state.products)

        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="Our" title="products" />
                        <div className="row">
                            <ProductConsumer>
                                {(value)=> {
                                    value.products.map(product => {
                                       return <Product key={product.id} products={product} />
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
