import React from 'react'
import Navbar from '../components/Navbar'
import ProductGrid from '../components/ProductGrid'
import { Grid } from '@mui/material'

export default function Cosmeticos() {
    return (
        <Grid container>
            <Navbar />
            <Grid container item xs={12} className="container_category">
                <h1>Cosmeticos</h1>
                <ProductGrid category="cosmeticos"/>
            </Grid>
        </Grid>
    )
}