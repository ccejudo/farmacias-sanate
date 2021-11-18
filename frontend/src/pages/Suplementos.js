import React from 'react'
import Navbar from '../components/Navbar'
import ProductGrid from '../components/ProductGrid'
import { Grid } from '@mui/material'

export default function Suplementos() {
    return (
        <Grid container>
            <Navbar />
            <h1>Suplementos</h1>
            <ProductGrid />
        </Grid>
    )
}
