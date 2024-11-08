import { error, log } from 'console';
import fs from 'fs/promises';

// Reads all the values in the json file and returns the data from the json file
async function getAllProducts(){
    const rawdata = await fs.readFile('./src/products.json');
    return JSON.parse(rawdata);
}

// setInventoryOnProduct takes the products object as a parameter
async function setInventoryOnProduct(products){
    try{
        // Saves the returned value from the function getAllProducts to dbObject constant
        const dbObject = await getAllProducts();

        products.forEach(product => {
            // Printing out the product.id and product.stock values  from each product to the console
            console.log("ID: ", product.id, "amount of stocks: ", product.stock);
        });
              
        // Loops through the products object and updates the stock value where it matches the id
        for (let i = 0; i < products.length; i++) {
            
            const productToUpdate = products[i];
            const dbProduct = dbObject.find(product => product.id === productToUpdate.id);
            
            // If the product id exits in the json file, subtract the current 
            // stock value with the stock amount thats in the shopping cart
            if (dbProduct) {
                dbProduct.stock -= productToUpdate.stock;
                if (dbProduct.stock < 0) {
                    dbProduct.stock = 0; // Ensure stock doesn't go below zero
                }
            }
        } 
    
        // Update the json file with the new stock values
        await fs.writeFile('./src/products.json', JSON.stringify(dbObject, null, 2));
        console.log('Inventory updated successfully.');
    }catch{
        console.error("Something went wrong :(") 
    }
}
export {getAllProducts, setInventoryOnProduct};


