import React from 'react'
import Navbar from '../components/Navbar'
import ProductGrid from '../components/ProductGrid'
import { Grid } from '@mui/material'

export default function Cosmeticos() {
    return (
        <Grid container>
            <Navbar />
            <Grid container className="container_category">
                <h1>Cosmeticos</h1>
                <ProductGrid />
            </Grid>
        </Grid>
    )
}
