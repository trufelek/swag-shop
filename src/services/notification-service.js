export const NOTIF_WISHLIST_CHANGED = 'notif_wishlist_changed';

let instance = null;
var observers = {};


class NotificationService {
  constructor() {
    // singleton pattern
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  postNotification = (name, data) => {
      var observerObjects = observers[name];

      if (observerObjects) {
        for (var i = 0; i < observerObjects.length; i++) {
          var observerObject = observerObjects[i];
          observerObject.callback(data);
        }
    }
  }

  addObserver = (name, observer, callback) => {
    let observerObjects = observers[name];

    if (!observerObjects) {
      observers[name] = [];
    }

    let observerObject = {
      observer,
      callback
    }

    observers[name].push(observerObject)
  }

  removeObserver = (name, observer) => {
    var observerObjects = observers[name];

    if (observerObjects) {
      for (var i = 0; i < observerObjects.length; i++) {
        if (observer === observerObjects[i].observer) {
          observerObjects.splice(i, 1);
          observers[name] = observerObjects;
          break;
        }
      }
    }
  }
}

export default NotificationService;
