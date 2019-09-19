export class Checkout {

    shoppingCart
    customerDetails

    
    constructor() {
        this.shoppingCart = new ShoppingCart();
        this.customerDetails = new CustomerDetails();
    }


    open() {
        browser.url("/checkout");
        $('.loader-wrapper .loader').waitForDisplayed(2000, true);
    }

    get itemsInCart() {
        if($('.items.table.table-striped.table-hover.data-table .item').isDisplayed()) {
            return $$('.items.table.table-striped.table-hover.data-table .item').length; 
        } else { return +0};
    }

    get sameItemsInCart(){
        let a = $('.items.table.table-striped.table-hover.data-table .item .form-control').getAttribute('value');
        return +a;
    }

    get totalPrice() {
        return parseFloat($('.subtotal .formatted-value').getText().slice(1));
    }

    isNoItemsInCart(){
        if($('.cart.wrapper em').isDisplayed()){
           return $('.cart.wrapper em').getText().includes('There are no items in your cart');
        } else {
            return false;
        }
    }

    isItemsInCart(){
        return !this.isNoItemsInCart();
    }

    deleteOneItemFromCart(){
        if(this.itemsInCart > 0){
            $('.item button[name="remove_cart_item"]').click();
            $('.loader-wrapper .loader').waitForDisplayed(2000, true);
            } else { return 'The Cart is Empty'}
    } 
}

// Component
class ShoppingCart {
    private get container(){
        return $('#box-checkout-cart');
    };

    public get items(){
        return $$('table.items tr.item').map(item => {
            return new Item(item);
        }); //convert to item
    }

}


class Item {
    container

    constructor(itemContainer){
        this.container = itemContainer
    }

    getProductName(){
        return this.container.getAttribute('data-name');
    }
    getProductPrice(){
        return parseFloat(this.container.getAttribute('data-price'));

    }

}

class CustomerDetails {

    
    get firstNameInput() {
        return $('input[name="firstname"]')
    }

    get lastNameInput() {
        return $('input[name="lastname"]')
    }

    get addressInput() {
        return $('input[name="address1"]')
    }

    get zipcodeInput() {
        return $('input[name="postcode"]')
    }

    get emailInput() {
        return $('input[name="email"]')
    }

    get phoneInput() {
        return $('.input-group input[name="phone"]')
    }

    get cityInput() {
        return $('input[name="city"]')
    }

    private get countrySelect() {
        return $('.form-group select[name="country_code"]')
    }

    setFirstName(firstName) {
        this.firstNameInput.setValue(firstName)
    }

    setLastName(lastName) {
        this.lastNameInput.setValue(lastName)
    }

    setAddress(address) {
        this.addressInput.setValue(address)
    }

    setZipCode(zipCode) {
        this.zipcodeInput.setValue(zipCode)
    }

    setCity(city) {
        this.cityInput.setValue(city)
    }

    setCountry(country) {
        this.countrySelect.selectByVisibleText(country)
    }

    setEmail(email) {
        this.emailInput.click()
        this.emailInput.addValue(email)
    }

    setPhone(phone) {
        this.phoneInput.setValue(phone)
    }

    saveCustomerDetails() {
        $('#box-checkout-customer.box button[name="save_customer_details"]').click();
        $('.loader-wrapper .loader').waitForDisplayed(3000, true);
    }

    confirmOrderBtn() {     
        $('button.btn-success').click()
        $('.loader-wrapper .loader').waitForDisplayed(3000, true);
    }

    get confirmMessage() {
        return $('#box-order-success .title').getText()
    }

    fillInForm() {
        this.setFirstName('TestFirstName')
        this.setLastName('TestLastName')
        this.setAddress('Lubaya 8')
        this.setZipCode('01234')
        this.setCity('Kyiv')
        this.setCountry('Ukraine')
        this.setEmail(`test${new Date().getTime() / 1000}@test.com`)
        this.setPhone('+380501112233')
    }







}