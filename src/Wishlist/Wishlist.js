import React, { Component } from 'react';
import DataService from '../services/data-service';
import NotificationService, { NOTIF_WISHLIST_CHANGED } from '../services/notification-service';
import './Wishlist.css';

import WishlistItem from './WishlistItem';

let notificationService = new NotificationService();

class Wishlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wishlist: []
    };

    this.itemsList = this.itemsList.bind(this);
    this.updateWishlist = this.updateWishlist.bind(this);
  }

  componentDidMount() {
    notificationService.addObserver(NOTIF_WISHLIST_CHANGED, this, this.updateWishlist);
  }

  componentWillUnmount() {
    notificationService.removeObserver(NOTIF_WISHLIST_CHANGED, this);
  }

  updateWishlist = (newWishlist) => {
    this.setState({ wishlist: newWishlist });
  }

  itemsList = () => {
    const list = this.state.wishlist.map((product) =>
      <WishlistItem key={product._id} product={product} />
    );

    return (list);
  }

  render() {
    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">Wishlist</h4>
          <ul className="list-group">
            { this.itemsList() }
          </ul>
        </div>
      </div>
    );
  }
}

export default Wishlist;
