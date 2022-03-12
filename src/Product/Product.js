import React, { Component } from 'react';
import DataService from '../services/data-service';
import NotificationService, { NOTIF_WISHLIST_CHANGED } from '../services/notification-service';
import './Product.css';

let dataService = new DataService();
let notificationService = new NotificationService();

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onWishlist: dataService.isItemOnWishlist(this.props.product)
    }

    this.addToWishlist = this.addToWishlist.bind(this);
  }

  componentDidMount() {
    notificationService.addObserver(NOTIF_WISHLIST_CHANGED, this, this.updateProduct);
  }

  componentWillUnmount() {
    notificationService.removeObserver(NOTIF_WISHLIST_CHANGED, this);
  }

  updateProduct = () => {
    this.setState({ onWishlist: dataService.isItemOnWishlist(this.props.product) });
  }

  addToWishlist = () => {
    if (this.state.onWishlist) {
      dataService.removeWishlistItem(this.props.product);
    } else {
      dataService.addWishlistItem(this.props.product);
    }
  }

  render() {
    var btnClass = this.state.onWishlist ? 'btn btn-danger' : 'btn btn-primary';

    return (
      <div className="card">
        <img src={this.props.product.imgUrl} className="card-img-top" alt={this.props.product.title} />
        <div className="card-block p-15">
          <h4 className="card-title">{this.props.product.title}</h4>
          <p className="card-text">${this.props.product.price}</p>
          <a href="#" onClick={() => this.addToWishlist()} className={btnClass}>
            { this.state.onWishlist ? 'Remove from wishlist' : 'Add to wishlist' }
          </a>
        </div>
      </div>
    );
  }
}

export default Product;
