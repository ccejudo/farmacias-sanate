import React from 'react'
import Navbar from '../components/Navbar'
import { Grid } from '@mui/material'

export default function AdminDashboard() {
    return (
        <Grid container>
            <Navbar role='admin'/>
            <Grid container item xs={12} className="container_category">
                <h1>Admin Dashboard</h1>
            </Grid>
        </Grid>
    )
}
