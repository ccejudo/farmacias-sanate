import React, { useState, useEffect } from 'react'
import { Grid, Pagination } from '@mui/material'
import axios from 'axios'

// Create pagination for products
export default function ProductGrid( props ) {
    const [ products, setProducts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ page, setPage ] = useState(1);

    const category = props.category || 'medicamentos';
    const items_per_page = 8;

    let products_by_category = [];

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/select')
            .then(res => {
                setProducts(res.data.items);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const mapProducts = () => { 
        console.log(products)
        products_by_category = products.filter(product => product.categoria === category);
        return products_by_category.map( ( product, index ) => {
            if (index >= (page - 1) * items_per_page && index < page * items_per_page ) {
                return (
                    <Grid container item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Grid container item justifyContent="center">
                            <img src={product.image} alt={product.name} style={{width:"15rem", height:"15rem", objectFit:"contain"}} />
                            <h3 style={{width:"100%", margin:"0", textAlign:"center"}}>{product.name}</h3>
                            <h3 style={{width:"100%", marginTop:"0", textAlign:"center"}}>${product.price}</h3>
                        </Grid>
                    </Grid>
                )
            }
        })
    }
    return (
        <Grid container item xs={12} justifyContent="center">
            {products? <>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-around">
                        { mapProducts() }
                    </Grid>
                </Grid>
                <Pagination count={Math.ceil(products_by_category.length / items_per_page)} variant="outlined" onChange={ ( _event, page ) => {setPage( page ); console.log( page )} }/>
            </> : <h1>Loading...</h1>}
        </Grid>
    )
}
