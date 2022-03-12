import React, { Component } from 'react';
import DataService from '../services/data-service';
import './WishlistItem.css';

let dataService = new DataService();

class WishlistItem extends Component {
  constructor(props) {
    super(props);

    this.removeFromWishlist = this.removeFromWishlist.bind(this);
  }

  removeFromWishlist = () => {
    dataService.removeWishlistItem(this.props.product);
  }

  render() {
    return (
      <li className="list-group-item">
        <p>
          {this.props.product.title} | ${this.props.product.price}
        </p>
        <a href='#' onClick={() => this.removeFromWishlist()} className="btn btn-outline-danger">
          X
        </a>
      </li>
    );
  }
}

export default WishlistItem;
