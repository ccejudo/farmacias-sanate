import Link from 'next/link'
import { Grid } from '@mui/material'

import styles from '../styles/home.module.css'

export default function Home() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <img src='images/promo.jpg' alt='promo'/>
      </Grid>
      <Grid container item xs={12} className={styles.container_category}>
        <Grid item xs={12}>
          <h2>Categorías</h2>
        </Grid>
        <Grid container item xs={12} justifyContent='space-around'>
          <Link href='/'>
            <div className={styles.category_button}>
              <img src='images/medicamentos.jpg' alt='medicamentos'/>
              <h3 className={styles.back_purple}>Medicamentos</h3>
            </div>
          </Link>
          <Link href='/'>
            <div className={styles.category_button}>
              <img src='images/suplementos.jpg' alt='suplementos'/>
              <h3 className={styles.back_red}>Suplementos</h3>
            </div>
          </Link>
          <Link href='/'>
            <div className={styles.category_button}>
              <img src='images/cosmeticos.jpg' alt='suplementos'/>
              <h3 className={styles.back_green}>Cosméticos</h3>
            </div>
          </Link>
          <Link href='/'>
            <div className={styles.category_button}>
              <img src='images/bebes.jpeg' alt='suplementos'/>
              <h3 className={styles.back_blue}>Bebés</h3>
            </div>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  )
}
