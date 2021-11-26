import React from 'react'
import Navbar from '../components/Navbar'
import ProductGrid from '../components/ProductGrid'
import { Grid } from '@mui/material'

export default function Suplementos( props ) {
    return (
        <Grid container>
            <Navbar signOut={props.signOut} />
            <Grid container item xs={12} className="container_category">
                <h1>Suplementos</h1>
                <ProductGrid category="suplementos"/>
            </Grid>
        </Grid>
    )
}
