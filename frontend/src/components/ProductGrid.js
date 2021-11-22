import React, { useState, useEffect } from 'react'
import { Grid, Pagination } from '@mui/material'
import axios from 'axios'

// Create pagination for products
export default function ProductGrid() {
    const [ products, setProducts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ page, setPage ] = useState(1);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/select')
            .then(res => {
                setProducts(res.data.items);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    
    return (
        <Grid container item xs={12} justifyContent="center">
            {products? <>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-around">
                        {products.map((product, index) => {
                            if (index >= (page - 1) * 12 && index < page * 12) {
                                return (
                                    <Grid container item xs={12} sm={6} md={4} lg={3} key={index}>
                                        <Grid container item justifyContent="center">
                                            <img src={product.image} alt={product.name} style={{width:"80%"}}/>
                                            <h3 style={{width:"100%", margin:"0", textAlign:"center"}}>{product.name}</h3>
                                            <h3 style={{width:"100%", margin:"0", textAlign:"center"}}>{product.price}</h3>
                                        </Grid>
                                    </Grid>
                                )
                            }
                        })}
                    </Grid>
                </Grid>
                <Pagination count={Math.ceil(products.length / 12)} variant="outlined" onChange={ ( _event, page ) => {setPage( page ); console.log( page )} }/>
            </> : <h1>Loading...</h1>}
        </Grid>
    )
}
