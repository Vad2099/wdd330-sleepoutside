export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }
  
    calculateItemSubTotal() {
      // calculate and display the total dollar amount of the items in the cart, and the number of items.
    this.itemTotal = this.list.reduce((total, item) => total + item.FinalPrice * item.Quantity, 0);
    const itemCount = this.list.reduce((count, item) => count + item.Quantity, 0);

    // Display the totals in the DOM
    const subtotalElem = document.querySelector(`${this.outputSelector} #cartTotal`);
    const itemCountElem = document.querySelector(`${this.outputSelector} #num-items`);

    if (subtotalElem) subtotalElem.innerText = `$${this.itemTotal.toFixed(2)}`;
    if (itemCountElem) itemCountElem.innerText = itemCount;
    }
  
    calculateOrderTotal() {
      // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
      this.tax = this.itemTotal * 0.06;
      const itemCount = this.list.reduce((count, item) => count + item.Quantity, 0);
      this.shipping = 10 + (itemCount - 1) * 2;
      this.orderTotal = this.itemTotal + this.tax + this.shipping;

      // display the totals.
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);
    
  
        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
    }

}