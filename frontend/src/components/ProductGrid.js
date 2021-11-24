import React, { useState, useEffect } from 'react'
import { Grid, Pagination, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import axios from 'axios'

// Create pagination for products
export default function ProductGrid( props ) {
    const [ products, setProducts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ page, setPage ] = useState(1);
    const [ addDialog, setAddDialog ] = useState(false);
    const [ editDialog, setEditDialog ] = useState(false);
    const [ deleteDialog, setDeleteDialog ] = useState(false);
    const [ productToEdit, setProductToEdit ] = useState({});

    const role = props.role || null;
    const category = props.category || 'medicamentos';
    const items_per_page = 8;

    let products_by_category = [];
    let products_length = 0;

    const updateProducts = () => {
        setIsLoading(true);
        axios.get(process.env.REACT_APP_API_URL + '/select')
            .then(res => {
                setProducts(res.data.items);
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const openAddDialog = () => {
        setAddDialog(true);
    }

    const closeAddDialog = () => {
        setAddDialog(false);
    }

    const openEditDialog = (product) => {
        setProductToEdit(product);
        setEditDialog(true);
    }

    const closeEditDialog = () => {
        setEditDialog(false);
    }

    const openDeleteDialog = (product) => {
        setProductToEdit(product);
        setDeleteDialog(true);
    }

    const closeDeleteDialog = () => {
        setDeleteDialog(false);
    }

    const mapProducts = () => { 
        products_by_category = products.filter(product => product.categoria === category);
        products_length = products_by_category.length;
        return products_by_category.map( ( product, index ) => {
            if (index >= (page - 1) * items_per_page && index < page * items_per_page ) {
                return (
                    <Grid container item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Grid container item justifyContent="center">
                            <img src={product.image} alt={product.name} style={{width:"15rem", height:"15rem", objectFit:"contain"}} />
                            <h3 style={{width:"100%", margin:"0", textAlign:"center"}}>{product.name}</h3>
                            <h3 style={{width:"100%", margin:"0", textAlign:"center"}}>${product.price}</h3>
                        </Grid>
                    </Grid>
                )
            }
        })
    }

    const mapProductsAdmin = () => {
        products_length = products.length; 
        return products.map( ( product, index ) => {
            if (index >= (page - 1) * items_per_page && index < page * items_per_page ) {
                return (
                    <Grid container item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Grid container item justifyContent="center">
                            <img src={product.image} alt={product.name} style={{width:"15rem", height:"15rem", objectFit:"contain"}} />
                            <Grid container item xs={12} justifyContent="center" style={{padding:"2%"}}>
                                <IconButton color="primary" onClick={() => openEditDialog(product)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => openDeleteDialog(product)}>
                                    <Delete />
                                </IconButton>
                            </Grid>
                            <h4 style={{width:"100%", margin:"0", textAlign:"center"}}>Producto: {product.name}</h4>
                            <h4 style={{width:"100%", margin:"0", textAlign:"center"}}>Precio: ${product.price}</h4>
                            <h4 style={{width:"100%", marginTop:"0", textAlign:"center"}}>Cantidad: {product.cantidad}</h4>
                        </Grid>
                    </Grid>
                )
            }
        })
    }

    useEffect(() => {
        updateProducts();
    }, [])

    return (
        <Grid container item xs={12} justifyContent="center">
            {!isLoading? <>
                <Grid container item xs={12}>
                    {role === 'admin' ? 
                        <>
                            <Button variant="outlined" color="primary" style={{margin:'auto'}} onClick={openAddDialog}>
                                Agregar Producto
                            </Button> 
                            <Dialog open={addDialog} onClose={closeAddDialog}>
                                <DialogTitle>Agregar Producto</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <p>Producto:</p>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={closeAddDialog} color="primary">
                                        Cancelar
                                    </Button>
                                    <Button onClick={closeAddDialog} color="primary">
                                        Agregar
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog open={editDialog} onClose={closeEditDialog}>
                                <DialogTitle>Editar Producto</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <p>Producto:</p>
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
                            <Dialog open={deleteDialog} onClose={closeDeleteDialog}>
                                <DialogTitle>Eliminar Producto</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <p>¿Está seguro que desea eliminar el producto?</p>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={closeDeleteDialog} color="primary">
                                        Cancelar
                                    </Button>
                                    <Button onClick={closeDeleteDialog} color="primary">
                                        Eliminar
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    : null}
                    <Grid container justifyContent="space-around">
                        {role === 'admin' ? mapProductsAdmin() : mapProducts()}
                    </Grid>
                </Grid>
                <Pagination count={Math.ceil(products_length / items_per_page)} variant="outlined" onChange={ ( _event, page ) => {setPage( page ); console.log( page )} }/>
            </> : <h1>Loading...</h1>}
        </Grid>
    )
}
