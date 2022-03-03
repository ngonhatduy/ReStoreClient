import React, { useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog(){
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      fetch('https://localhost:7024/api/Products')
      .then(response => response.json())
      .then(data => setProducts(data))
    }, [])
    
    return(
        <React.Fragment>
            <ProductList products={products}/>
        </React.Fragment>
    )
}