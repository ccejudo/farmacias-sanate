import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Grid, Paper } from '@mui/material'
import {GetUserDir, CreateDir, DeleteDir} from '../firebase/firebaseCRUD'
import Button from '@mui/material/Button';
import CreateForm from './CreateForm'
import Container from "@mui/material/Container";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Profile(props) {
    const [name, setName] = useState('test')

    let auth = getAuth();
    console.log("ESTOY EN PROFILE, MI UID:");
    let myUid = auth.currentUser.uid;
    console.log(myUid);

    return (
        <Grid container>
            <Navbar />
            <Grid container item xs={12} className="container_category">
                <Grid item xs={12}>
                    <h1>¡Bienvenido {name}!</h1>
                </Grid>
                <Grid item xs={12}>
                    <h1>Direcciones: </h1>
                </Grid>
                <GetUserDir uid = {myUid}/>
            </Grid>
            <Grid>
                <Container maxWidth="lg" sx={{ mt: 15 }}>
                    <h1>Agrega nueva direccion</h1>
                        <form class='add'>
                            <label for="direccion">Direccion: </label>  
                            <input type="text" name="Direccion" id="Direccion" required></input>
                            <br/>
                            <br/>

                            <Button color="primary" onClick={() => { 
                                CreateDir({
                                    dir:document.getElementById("Direccion").value,
                                }); 
                                console.log('POST successful.'); }}>
                            Agregar
                            </Button>
                        </form>
                </Container>                
            </Grid>
        </Grid>
    )
}
