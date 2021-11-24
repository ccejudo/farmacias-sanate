import * as React from "react";
import Container from "@mui/material/Container";

import Button from '@mui/material/Button';
import {CreateDir} from "../firebase/firebaseCRUD";

export default function CreateForm() {

  return (
    <Container maxWidth="lg" sx={{ mt: 15 }}>
    <h1>Create a Recipe</h1>
        <form class='add'>
            <label for="direccion">Direccion: </label>  
            <input type="text" name="Direccion" id="Direccion" required></input>
            <br/>
            <br/>

            <Button color="primary" onClick={() => { 
                CreateRecipe({
                    dir:document.getElementById("Direccion").value,
                }); 
                console.log('POST successful.'); }}>
            Primary
            </Button>
        </form>
    </Container>
  );
}
