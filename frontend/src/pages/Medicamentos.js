import React from 'react'
import Navbar from '../components/Navbar'
import ProductGrid from '../components/ProductGrid'
import { Grid } from '@mui/material'

export default function Medicamentos() {
    return (
        <Grid container>
            <Navbar />
            <Grid container className="container_category">
                <h1>Medicamentos</h1>
                <ProductGrid category="medicamentos"/>
            </Grid>
        </Grid>
    )
}
