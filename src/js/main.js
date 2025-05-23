// Import the ProductData class from the module
import ProductData from './ProductData.mjs';

// Create a instance of ProductList class in the main.js file
import ProductList from './ProductList.mjs';

// Import the getParam function from the utils module
import { getParam } from './utils.mjs';

// Load the header and footer templates
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();


const productId = getParam('product');

console.log('Product ID:', productId);

// We create an instance of ProductData with the category 'tents'
const dataSource = new ProductData('tents');

// Si quieres probar que funciona, puedes obtener los datos así (opcional para prueba)
//dataSource.getData().then(data => console.log(data));

const element = document.querySelector('.product-list');
// Create an instance of ProductList with the dataSource and element        
const productList = new ProductList('tents', dataSource, element);  
// Call the init method to fetch and render the product list
productList.init();

