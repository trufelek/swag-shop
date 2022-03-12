import React, { Component } from 'react';
import HttpService from '../services/http-service';
import './App.css';

import Product from '../Product/Product';
import Wishlist from '../Wishlist/Wishlist';

const http = new HttpService();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };

    this.loadData = this.loadData.bind(this);
    this.productList = this.productList.bind(this);

    this.loadData();
  }

  loadData = () => {
    var self = this;
    http.getProducts().then(data => {
      self.setState({ products: data })
    }, err => {
      console.log(err)
    })
  }

  productList = () => {
    const list = this.state.products.map((product) =>
      <div className="col-xs-12 col-sm-4" key={product._id}>
        <Product product={product} />
      </div>
    );

    return (list);
  }

  render() {
    return (
      <div className="App">
        <div className="app-header">
          <h1 className="app-title">Swag shop</h1>
        </div>
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-sm-8">
              <div className="row">
                { this.productList() }
              </div>
            </div>
            <div className="col-sm-4">
              <Wishlist />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
