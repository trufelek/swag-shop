import NotificationService, { NOTIF_WISHLIST_CHANGED } from './notification-service';

let notificationService = new NotificationService();

let instance = null;
var wishlist = [];

class DataService {
    constructor() {
      // singleton pattern
      if (!instance) {
        instance = this;
      }

      return instance;
    }

    addWishlistItem = item => {
      wishlist.push(item);
      notificationService.postNotification(NOTIF_WISHLIST_CHANGED, wishlist);
    }

    removeWishlistItem = item => {
      for (var i = 0; i < wishlist.length; i++) {
        if (wishlist[i]._id === item._id) {
          wishlist.splice(i, 1);
          notificationService.postNotification(NOTIF_WISHLIST_CHANGED, wishlist);
          break;
        }
      }
    }

    isItemOnWishlist = item => {
      for (var i = 0; i < wishlist.length; i++) {
        if (wishlist[i]._id === item._id) {
          return true;
        }
      }
      return false;
    }
}

export default DataService;
