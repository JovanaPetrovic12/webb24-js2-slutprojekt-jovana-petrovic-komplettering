export function Navbar ({setChangePage, cartItems}) {
//event
    function handleClick(page){
        setChangePage(page);
    }

    return (
        <nav>
            <h1 className="navh1">Pretty Paws</h1>
            <div>
            <button onClick={() => handleClick ("products")}>Produkter</button>
            <button onClick={() => handleClick ("cart")}>Kundvagn ({cartItems.length})</button>
            </div>
        </nav>
    )
}