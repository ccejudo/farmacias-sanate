import React from 'react'
import { Grid, Stack } from '@mui/material'
import { Person } from '@mui/icons-material'
import { Link } from "react-router-dom"

import styles from '../styles/navbar.module.css'

export default function Navbar() {
    return (
        <Grid container className={styles.navbar}>
            <Grid item xs={2}>
                <Link to="/">
                    <img src="/logo/logo_white_large.png" alt="logo" style={{ width: '10rem' }}/>
                </Link>
            </Grid>
            <Grid item xs={10}>
                <Stack spacing={4} direction="row" justifyContent="flex-end">
                    <Link to="/">
                        <a className={styles.animation}>Inicio</a>
                    </Link>
                    <Link to="/medicamentos">
                        <a className={styles.animation}>Medicamentos</a>
                    </Link>
                    <Link to="/suplementos">
                        <a className={styles.animation}>Suplementos</a>
                    </Link>
                    <Link to="/cosmeticos">
                        <a className={styles.animation}>Cosméticos</a>
                    </Link>
                    <Link to="/bebes">
                        <a className={styles.animation}>Bebés</a>
                    </Link>
                    <Link to="/profile">
                        <Person fontSize="large"/>
                    </Link>
                </Stack>
            </Grid>
        </Grid>
    )
}
