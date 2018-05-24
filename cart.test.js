const cart = require('./cart'),
    cars = require('./data/cars');

describe("Cart Properties:", () => 
{
    test("Initial Cart should be an empty array", () =>
    {
        let flag = true;
        let result1 = Array.isArray(cart.cart);
        let result2 = cart.cart.length;
        if (!result1) flag = false;
        if (result2 !== 0) flag = false;
        expect(flag).toBeTruthy();
        // expect(Array.isArray(cart.cart)).toBeTruthy();
        // expect(cart.cart.length).toEqual(0);
    });

    test("The inital value of total should be 0", () =>
    {
        expect(cart.total).toEqual(0);
    });
});

describe("Cart Methods:", () =>
{
    afterEach(() =>
    {
        cart.cart = [];
        cart.total = 0;
    });

    test("addToCart() should add a car object to the end of cart array", () =>
    {
        let flag = true;
        cart.addToCart(cars[0]);
        cart.addToCart(cars[9]);
        let length = cart.cart.length;
        let cart1 = cart.cart[0];
        let cart2 = cart.cart[1];
        if (length != 2) flag = false;
        if (cart1 !== cars[0]) flag = false;
        if (cart2 !== cars[9]) flag = false;
     
        expect(flag).toBeTruthy();
        // expect(cart.cart.length).toEqual(2);
        // expect(cart.cart[0]).toEqual(cars[0]);
        // expect(cart.cart[1]).toEqual(cars[9]);
    });

    test("addToCart() should increase total by price of added cart on each call", () =>
    {
        cart.addToCart(cars[1]);
        cart.addToCart(cars[5]);
        cart.addToCart(cars[12]);

        let total = (cart.cart[0].price + cart.cart[1].price + cart.cart[2].price);

        expect(total).toEqual(cars[1].price + cars[5].price + cars[12].price);
    });

    test("removeFromCart() should decrease size of cart array by 1 with each call and maintain order of car objects in cart array", () =>
    {
        cart.addToCart(cars[5]);
        cart.addToCart(cars[2]);
        cart.addToCart(cars[19]);
        cart.addToCart(cars[15]);
       
        cart.removeFromCart(1, cars[2].price);

        expect(cart.cart.length).toEqual(3);
        expect(cart.cart[0]).toEqual(cars[5]);
        expect(cart.cart[1]).toEqual(cars[19]);
        expect(cart.cart[2]).toEqual(cars[15]);
    });

    test("removeFromCart() should decrease total by price of removed car", () =>
    {
        cart.addToCart(cars[11]);
        cart.addToCart(cars[19]);
        cart.addToCart(cars[1]);
        cart.addToCart(cars[5]);
        // let total = cart.cart[0].price + cart.cart[1].price + cart.cart[2].price + cart.cart[3].price;

        let total = cars[11].price + cars[5].price; 
        cart.removeFromCart(2, cars[1].price);
        cart.removeFromCart(1, cars[19].price);
        expect(cart.total).toEqual(total);        
    });

    test("checkout() should return cart length and total to 0", () =>
    {
        let flag = true;
        cart.addToCart(cars[5]);
        cart.addToCart(cars[11]);
        cart.addToCart(cars[13]);
        cart.addToCart(cars[1]);

        cart.checkout();
        if (cart.cart.length !== 0) flag = false;
        if (cart.total !== 0) flag = false;

        expect(flag).toBeTruthy();        
    });
});
