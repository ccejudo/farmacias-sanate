import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Grid, Paper } from '@mui/material'

export default function Profile() {
    const [name, setName] = useState('test')
    return (
        <Grid container>
            <Navbar />
            <Grid container item xs={12} className="container_category">
                <Grid item xs={12}>
                    <h1>¡Bienvenido {name}!</h1>
                </Grid>
                <Grid container item xs={12}>
                    <Paper elevation={4} style={{padding: '3%'}}>
                        <h2>Dirección</h2>
                        <p>Calle de la calle #123</p>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}
