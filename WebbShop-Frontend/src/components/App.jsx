import { Navbar } from "./Navbar"
import { ProductContainer } from "./ProductContainer"
import { ShoppingCart } from "./ShoppingCart"
import { Error } from "./Error"
import { PaymentConfirmed } from "./PaymentConfirmed"
import { useEffect, useState } from "react"
import { fetchProducts } from "../fetchProducts.js"


export function App(){

    const [changePage, setChangePage] = useState ('cart');
    const [products, setProducts] = useState ([]);
    const [addToCart, setAddToCart] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    
    useEffect (()=>{
        fetchProducts()
        .then((productsPar)=>{
        setProducts(productsPar);
        setChangePage('products') })
        .catch(()=>{
            setChangePage('error')
        });
    
    }, [])
    
    const handlePurchase = (item) => {
        // Kontrollera lagerstatus och uppdatera varukorgen
        const updatedProducts = products.map(p => 
            p.product === item.product ? { ...p, stock: p.stock - 1 } : p
        );
    
        setProducts(updatedProducts);
        setCartItems([...cartItems, item]);
    };
   
    return (
        <>
        <header>
            <Navbar setChangePage={setChangePage} cartItems={cartItems} />
        </header>
        <main>
            {changePage == 'products' && <ProductContainer products={products} onPurchase={handlePurchase} addToCart={addToCart} setAddToCart={setAddToCart} />}
            {changePage == 'cart' && <ShoppingCart setChangePage={setChangePage} cartItems={cartItems} setCartItems={setCartItems} addToCart={addToCart} setAddToCart={setAddToCart} setProducts={setProducts} products={products}/>}
            {changePage == 'error' && <Error/>}
            {changePage == 'success' && <PaymentConfirmed setChangePage ={setChangePage}/>}
        </main>
        </>
    )
}