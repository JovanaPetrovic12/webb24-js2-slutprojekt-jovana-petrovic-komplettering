const url = `http://localhost:3000/api/products`; 

async function fetchProducts(){
    
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
    
}

async function setInventoryOnProducts(products){
    
    const url = `http://localhost:3000/api/products/set`; 
        
    for(let key = 0 ; key < products.length ; key++){
       delete products[key].img
       delete products[key].price
       delete products[key].product
    }

    const pro = {
        method: "POST",
        body: JSON.stringify({
          products:products
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }  
    };
    
    const res = await fetch (url, pro);
    const data = await res.json();
   
   return data;
}
export {fetchProducts, setInventoryOnProducts}
