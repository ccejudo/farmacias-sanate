import React from 'react'
import { Grid, Stack, Button } from '@mui/material'
import Link from 'next/link'

import styles from '../styles/navbar.module.css'

export default function Navbar() {
    return (
        <Grid container className={styles.navbar}>
            <Grid item xs={2}>
                <img src="/logo/logo_white_large.png" alt="logo" style={{ width: '10rem' }}/>
            </Grid>
            <Grid item xs={10}>
                <Stack spacing={4} direction="row" justifyContent="flex-end">
                    <Link href="/">
                        <a className={styles.animation}>Medicamentos</a>
                    </Link>
                    <Link href="/">
                        <a className={styles.animation}>Suplementos</a>
                    </Link>
                    <Link href="/">
                        <a className={styles.animation}>Cosméticos</a>
                    </Link>
                    <Link href="/">
                        <a className={styles.animation}>Bebés</a>
                    </Link>
                </Stack>
            </Grid>
        </Grid>
    )
}
