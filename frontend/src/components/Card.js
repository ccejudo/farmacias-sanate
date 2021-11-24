import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Box from '@material-ui/core/Box';
import {DeleteDir} from '../firebase/firebaseCRUD';

export default function MultiActionAreaCard(props) {
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
            <Button size="small" color="primary">
            Edit
            </Button>
            <Button size="small" color="primary" onClick={() => { 
                // TODO: Make refresh method to remove cards from frontend
                console.log(props.cardId);
                DeleteDir({rid:props.cardId});
            }} >
            Delete
            </Button>
        </CardActions>
        </Card>
    </Box>
  );
}
