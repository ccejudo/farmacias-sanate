import React from 'react'
import { Grid, Stack } from '@mui/material'
import { Link } from "react-router-dom"

import styles from '../styles/navbar.module.css'
import Logout from "../pages/Logout";

export default function Navbar(props) {
    return (
        <Grid container className={styles.navbar}>
            <Grid item xs={2}>
                <img src="/logo/logo_white_large.png" alt="logo" style={{ width: '10rem' }}/>
            </Grid>
            <Grid item xs={10}>
                <Stack spacing={4} direction="row" justifyContent="flex-end">
                    <Link to="/">
                        <a className={styles.animation}>Medicamentos</a>
                    </Link>
                    <Link to="/">
                        <a className={styles.animation}>Suplementos</a>
                    </Link>
                    <Link to="/">
                        <a className={styles.animation}>Cosméticos</a>
                    </Link>
                    <Link to="/">
                        <a className={styles.animation}>Bebés</a>
                    </Link>
                    <Link to="/logout">
                        <a className={styles.animation}>Logout</a>
                    </Link>
                </Stack>
            </Grid>
        </Grid>
    )
}
