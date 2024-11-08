import { setInventoryOnProducts } from "../fetchProducts.js"
export function ShoppingCart ({setChangePage, setAddToCart, addToCart, setProducts, products, setCartItems}){

    function purchasePayment(page){
        
        console.log(addToCart);
        
        setAddToCart([]);
        setCartItems([]);
        setInventoryOnProducts(addToCart);
        setChangePage(page);
    }
    

    function emptyCart(page) {
    
         const updatedProducts = products.map(product => {
            const cartItem = addToCart.find(item => item.product === product.product);
            if (cartItem) {
                return { ...product, stock: product.stock + cartItem.stock }; 
            }
            return product;
        });

        setProducts(updatedProducts); 
        setAddToCart([]); 
        setCartItems([]);
        setChangePage(page);
    }

    const totalCost = addToCart.reduce((total, product) => total + (product.price * product.stock), 0);

    return (
        <section className="shoppingcart">
            <h1 className="shoppingcarth2">Varukorg</h1>
            {addToCart.length === 0 ? (
                <p>Din varukorg är tom.</p>
            ) : (
                addToCart.map((product, index) => (
                    <div key={`${product.product}-${index}`}>
                        <h3>{product.product} x{product.stock}</h3>
                        <p>Pris:{product.price}kr</p>
                    </div>
                ))
            )}
            <h4>Total kostnad: {totalCost} kr</h4>
            <button onClick={() => purchasePayment ("success")}>Betala</button>
            <button onClick={() => emptyCart ("products")}>Töm</button>
        </section>
        
    )
}