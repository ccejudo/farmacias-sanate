import React from 'react'
import Navbar from '../components/Navbar'
import ProductGrid from '../components/ProductGrid'
import { Grid } from '@mui/material'

export default function Bebes( props ) {
    return (
        <Grid container>
            <Navbar signOut={props.signOut}/>
            <Grid container item xs={12} className="container_category">
                <h1>Bebés</h1>
                <ProductGrid category="bebes"/>
            </Grid>
        </Grid>
    )
}
