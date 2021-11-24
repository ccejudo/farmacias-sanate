import React from 'react'
import Navbar from '../components/Navbar'
import ProductGrid from '../components/ProductGrid'
import { Grid } from '@mui/material'

export default function AdminDashboard() {
    return (
        <Grid container>
            <Navbar role='admin'/>
            <Grid container item xs={12} className="container_category">
                <h1>Inventario</h1>
                <ProductGrid role='admin'/>
            </Grid>
        </Grid>
    )
}
