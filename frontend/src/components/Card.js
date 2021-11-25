import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Box from '@material-ui/core/Box';
import {DeleteDir, GetUserDir, UpdateDir} from '../firebase/firebaseCRUD';
import React, { useState, useEffect } from 'react'
import { Grid, TextField, FormControl, Pagination, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

export default function MultiActionAreaCard(props) {
    const [ editDialog, setEditDialog ] = useState(false);
    const [ productId, setId ] = useState('');
    const [ productDir, setDir ] = useState('');
    const [ productUid, setUid ] = useState('');


    const openEditDialog = (product) => {
        console.log(product);
        setProductToEdit(product);
        setEditDialog(true);
    }

    const closeEditDialog = () => {
        setEditDialog(false);
        let newDir = {"dir": {productDir}, "uid": {productUid}};
        let cardId = productId;
        console.log("CRAD JAJA", cardId);
        UpdateDir({dir: newDir, card: cardId});
    }

    const setProductToEdit = (product) => {
        setId(props.cardId);
        setDir(props.direccion);
        setUid(props.uid);
    }

  return (
    <Box m={2} pt={3}>
        <Card sx={{ maxWidth: 345}}>
        <CardActionArea>
            <CardMedia
            component="img"
            height="140"
            image="https://picsum.photos/200"
            alt="green iguana"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                Direccion {props.index + 1}
            </Typography>
            <Typography gutterBottom variant="h10" component="div">
                {props.direccion}
            </Typography>          
            </CardContent>
        </CardActionArea>
        <CardActions>
        <IconButton color="primary" onClick={() => openEditDialog({dir:props.dir}, {rid:props.cardId}, {uid: props.uid})}>
                Edit
        </IconButton>
            <Button size="small" color="primary" onClick={() => { 
                // TODO: Make refresh method to remove cards from frontend
                console.log(props.cardId);
                DeleteDir({rid:props.cardId});
            }} >
            Delete
            </Button>
        </CardActions>
        <Dialog open={editDialog} onClose={closeEditDialog}>
                                <DialogTitle>Editar Dirección</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <FormControl>
                                            <TextField id="product-name" label="Dirección" value=  {"Direccion", productDir}onChange={(e) => setDir(e.target.value)} />
                                        </FormControl>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={closeEditDialog} color="primary">
                                        Cancelar
                                    </Button>
                                    <Button onClick={closeEditDialog} color="primary">
                                        Editar
                                    </Button>
                                </DialogActions>
                            </Dialog>
        </Card>
    </Box>
  );
}
