import Navbar from '../components/Navbar'
import { Link } from "react-router-dom"
import { Grid } from '@mui/material'

import styles from '../styles/home.module.css'
import Logout from './Logout'

export default function Home(props) {
  return (
    <Grid container>
      <Navbar history={props.history} signOut = {props.signOut}/>
      <Grid item xs={12}>
        <img src='images/promo.jpg' alt='promo'/>
      </Grid>
      <Grid container item xs={12} className={styles.container_category}>
        <Grid item xs={12}>
          <h2>Categorías</h2>
        </Grid>
        <Grid container item xs={12} justifyContent='space-around'>
          <Link to='/medicamentos'>
            <div className={styles.category_button}>
              <img src='images/medicamentos.jpg' alt='medicamentos'/>
              <h3 className={styles.back_purple}>Medicamentos</h3>
            </div>
          </Link>
          <Link to='/suplementos'>
            <div className={styles.category_button}>
              <img src='images/suplementos.jpg' alt='suplementos'/>
              <h3 className={styles.back_red}>Suplementos</h3>
            </div>
          </Link>
          <Link to='/cosmeticos'>
            <div className={styles.category_button}>
              <img src='images/cosmeticos.jpg' alt='cosmeticos'/>
              <h3 className={styles.back_green}>Cosméticos</h3>
            </div>
          </Link>
          <Link to='/bebes'>
            <div className={styles.category_button}>
              <img src='images/bebes.jpeg' alt='bebes'/>
              <h3 className={styles.back_blue}>Bebés</h3>
            </div>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  )
}
