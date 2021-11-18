import React from 'react'
import Navbar from '../components/Navbar'
import ProductGrid from '../components/ProductGrid'
import { Grid } from '@mui/material'

export default function Bebes() {
    return (
        <Grid container>
            <Navbar />
            <h1>Bebes</h1>
            <ProductGrid />
        </Grid>
    )
}
