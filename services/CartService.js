app.service("CartService", function () {
  let items = [];
  try {
    items = JSON.parse(localStorage.getItem("pharmacare_cart") || []);
  } catch (e) {
    items = [];
  }

  let save = function () {
    localStorage.setItem("pharmacare_cart", JSON.stringify(items));
  };
  this.addItem = function (product) {
    let found = null;
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === product.id) {
        found = items[i];
        break;
      }
    }
    if (found) {
      found.qty += 1;
    } else {
      items.push({
        id: product.id,
        name: product.description,
        price: product.price,
        image: product.imgUrl,
        category: product.category,
        qty: 1,
      });
    }
    save();
  };
  this.getItems = function () {
    return items;
  };
  this.removeItem = function (productId) {
    let newItems = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].id !== productId) {
        newItems.push(items[i]);
      }
    }
    items = newItems;
    save();
  };
  this.updateQty = function (productId, qty) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === productId) {
        if (qty <= 0) {
          this.removeItem(productId);
        } else {
          items[i].qty = qty;
        }
        break;
      }
    }
    save();
  };
  this.getTotal = function () {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].price * items[i].qty;
    }
    return total;
  };
  this.getCount = function () {
    let count = 0;
    for (let i = 0; i < items.length; i++) {
      count += items[i].qty;
    }
    return count;
  };
  this.clear = function () {
    items = [];
    localStorage.removeItem("pharmacare_cart");
  };
});
