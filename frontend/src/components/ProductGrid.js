import React, { useState, useEffect } from 'react'
import { Grid, Pagination, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Select, TextField, MenuItem, InputLabel} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import axios from 'axios'
import { grid } from '@mui/system'

// Create pagination for products
export default function ProductGrid( props ) {
    const [ products, setProducts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ page, setPage ] = useState(1);
    const [ addDialog, setAddDialog ] = useState(false);
    const [ editDialog, setEditDialog ] = useState(false);
    const [ deleteDialog, setDeleteDialog ] = useState(false);
    const [ productId, setProductId ] = useState('');
    const [ productName, setProductName ] = useState('');
    const [ productPrice, setProductPrice ] = useState(0);
    const [ productCategory, setProductCategory ] = useState('medicamentos');
    const [ productImage, setProductImage ] = useState('');
    const [ productQuantity, setProductQuantity ] = useState(0);
    const [ productPresentation, setProductPresentation ] = useState('');
    const [ local, setLocal ] = useState('santafe');

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

    const addProduct = () => {
        axios.post(process.env.REACT_APP_API_URL + '/insertProduct', {
            name: productName,
            price: productPrice,
            categoria: productCategory,
            image: productImage,
            cantidad: productQuantity,
            medida: productPresentation
        })
            .then(res => {
                updateProducts();
                closeAddDialog();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const editProduct = () => {
        axios.post(process.env.REACT_APP_API_URL + '/updateProduct', {
            id: productId,
            name: productName,
            price: productPrice,
            categoria: productCategory,
            image: productImage,
            cantidad: productQuantity,
            medida: productPresentation
        })
            .then(res => {
                updateProducts();
                closeEditDialog();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteProduct = () => {
        axios.post(process.env.REACT_APP_API_URL + '/deleteProduct', {
            id: productId
        })
            .then(res => {
                updateProducts();
                closeDeleteDialog();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const setProductToEdit = (product) => {
        setProductId(product._id.$oid);
        setProductName(product.name);
        setProductPrice(product.price);
        setProductCategory(product.categoria);
        setProductImage(product.image);
        setProductQuantity(product.cantidad);
        setProductPresentation(product.medida);
    }

    const setDefaultProduct = () => {
        setProductName('');
        setProductPrice(0);
        setProductCategory('medicamentos');
        setProductImage('');
        setProductQuantity(0);
    }

    const openAddDialog = () => {
        setAddDialog(true);
    }

    const closeAddDialog = () => {
        setDefaultProduct();
        setAddDialog(false);
    }

    const openEditDialog = (product) => {
        setProductToEdit(product);
        setEditDialog(true);
    }

    const closeEditDialog = () => {
        setDefaultProduct();
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

    console.log(products)
    return (
        <Grid container item xs={12} justifyContent="center">
            {!isLoading? <>
                <Grid container item xs={12}>
                    {role === 'admin' ? 
                        <>  
                            <FormControl sx={{width: '60%', margin:'0 4rem 0 4rem'}}>
                                <InputLabel id="bodega">Local</InputLabel>
                                <Select labelId="bodega" label="Bodega" value={local} onChange={(e) => {setLocal(e.target.value); updateProducts()}}>
                                    <MenuItem value="polanco">Polanco</MenuItem>
                                    <MenuItem value="alvaro">??lvaro Obreg??n</MenuItem>
                                    <MenuItem value="santafe">Santa Fe</MenuItem>
                                    <MenuItem value="tacubaya">Tacubaya</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="outlined" color="primary" style={{margin:'auto'}} onClick={openAddDialog}>
                                Agregar Producto
                            </Button> 
                            <Dialog open={addDialog} onClose={closeAddDialog}>
                                <DialogTitle>Agregar Producto</DialogTitle>
                                <DialogContent>
                                    <Grid container item style={{padding:"3%"}}>
                                        <div style={{width:'40rem'}}>
                                            <FormControl sx={{width: '100%'}}>
                                                <InputLabel id="select-label" required>Categor??a</InputLabel>
                                                <Select sx={{margin: '0 0 2% 0'}} id="product-category" labelId="select-label" label="Categor??a" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} required>
                                                    <MenuItem value="medicamentos">Medicamentos</MenuItem>
                                                    <MenuItem value="suplementos">Suplementos</MenuItem>
                                                    <MenuItem value="cosmeticos">Cosmeticos</MenuItem>
                                                    <MenuItem value="bebes">Bebes</MenuItem>
                                                </Select>
                                                <TextField sx={{margin: '2% 0'}} id="product-name" label="Nombre" value={productName} onChange={(e) => setProductName(e.target.value)} required/>
                                                <TextField sx={{margin: '2% 0'}} id="product-price" label="Precio" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} type="number" required/>
                                                <TextField sx={{margin: '2% 0'}} id="product-image" label="Imagen" value={productImage} onChange={(e) => setProductImage(e.target.value)} required/>
                                                <TextField sx={{margin: '2% 0'}} id="product-quantity" label="Cantidad" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} type="number" required/>
                                                <TextField sx={{margin: '2% 0'}} id="product-presentation" label="Presentaci??n" value={productPresentation} onChange={(e) => setProductPresentation(e.target.value)} required/>
                                            </FormControl>
                                        </div>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={closeAddDialog} color="primary">
                                        Cancelar
                                    </Button>
                                    <Button onClick={addProduct} color="primary">
                                        Agregar
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog open={editDialog} onClose={closeEditDialog}>
                                <DialogTitle>Editar Producto</DialogTitle>
                                <DialogContent>
                                    <Grid container item style={{padding:"3%"}}>
                                        <div style={{width:'40rem'}}>
                                            <FormControl sx={{width: '100%'}}>
                                                <InputLabel id="select-label" required>Categor??a</InputLabel>
                                                <Select sx={{margin: '0 0 2% 0'}} id="product-category" labelId="select-label" label="Caregor??a" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} required>
                                                    <MenuItem value="medicamentos">Medicamentos</MenuItem>
                                                    <MenuItem value="suplementos">Alimentos</MenuItem>
                                                    <MenuItem value="cosmeticos">Cosmeticos</MenuItem>
                                                    <MenuItem value="bebes">Bebes</MenuItem>
                                                </Select>
                                                <TextField sx={{margin: '2% 0'}} id="product-name" label="Nombre" value={productName} onChange={(e) => setProductName(e.target.value)} required/>
                                                <TextField sx={{margin: '2% 0'}} id="product-price" label="Precio" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} type="number" required/>
                                                <TextField sx={{margin: '2% 0'}} id="product-image" label="Imagen" value={productImage} onChange={(e) => setProductImage(e.target.value)} required/>
                                                <TextField sx={{margin: '2% 0'}} id="product-quantity" label="Cantidad" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} type="number" required/>
                                                <TextField sx={{margin: '2% 0'}} id="product-presentation" label="Presentaci??n" value={productPresentation} onChange={(e) => setProductPresentation(e.target.value)} required/>
                                            </FormControl>
                                        </div>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={closeEditDialog} color="primary">
                                        Cancelar
                                    </Button>
                                    <Button onClick={editProduct} color="primary">
                                        Editar
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog open={deleteDialog} onClose={closeDeleteDialog}>
                                <DialogTitle>Eliminar Producto</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <p>??Est?? seguro que desea eliminar el producto?</p>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={closeDeleteDialog} color="primary">
                                        Cancelar
                                    </Button>
                                    <Button onClick={deleteProduct} color="primary">
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
