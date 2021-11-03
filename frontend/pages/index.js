import Link from 'next/link'
import { Grid } from '@mui/material'

import styles from '../styles/home.module.css'

export default function Home() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <img src="/images/promo.jpg" alt="promo"/>
      </Grid>
    </Grid>
  )
}
