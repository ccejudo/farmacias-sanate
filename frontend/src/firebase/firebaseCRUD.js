import getFirebase from "../firebase/firebaseconfiguration";
import { 
    addDoc,
    deleteDoc,
    getFirestore,
    collection, 
    getDocs, 
    getDoc, 
    doc,
    updateDoc,
    query,
    where
} from "firebase/firestore";
import { convertCompilerOptionsFromJson } from "typescript";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { getAuth, onAuthStateChanged } from "firebase/auth";

getFirebase();
const auth = getAuth();
const db = getFirestore();
const collectionRef = collection(db, 'Direcciones');

function GetUserDir(props){
    const [dir, setDir] = useState([]);
    console.log("ESTOY EN CRUD");
    console.log(props.uid);
    useEffect(() => {
        const GetAll = async () => {
            const collectionRef = collection(db, 'Direcciones');
            const q = query(collectionRef, where("uid", "==", props.uid));
            getDocs(q)
                .then((snapshot) => {
                    let direcciones = [];
                    snapshot.docs.forEach((docu) => {
                        direcciones.push({...docu.data(), id: docu.id});
                    })
                    console.log(direcciones);
                    setDir(direcciones);
                })
                .catch(err => {
                    console.log(err.message);
                })
        }
    
        GetAll();
    }, []);

    return (
    dir.map((index, i)=>(
        <Card
          direccion = {index.dir}
          index = {i}
          cardId = {index.id}
          uid = {props.uid}
          >
        </Card>)));
}

function CreateDir(props) {
    const auth = getAuth();
    const user = auth.currentUser.uid;
    addDoc(collectionRef, {
        dir:         props.dir,
        uid:            user
       });
    return(<br/>);
}

function GetAdmin() {
    const docRef = doc(db, 'Roles', "Admin");
    const [admin, setAdmin] = useState([]);
    getDoc(docRef)
    .then((snapshot) => {
        setAdmin(snapshot.data().uid);
    })
    .catch(err => {
        console.log(err.message);
    })

    return(admin);
}

function UpdateDir(props) {
    const recipeId = props.recipeId;
    const data = props.data
    const docRef = doc(db, 'Recipes', recipeId);
    updateDoc(docRef, {data})
    .then(() => {
        console.log("Record Updated")
    })

    return(<br/>);
}

async function DeleteDir(props) {
    console.log("Recipe ID: ", props.rid);
    await deleteDoc(doc(db, 'Direcciones', props.rid));
    return(<br/>);
}

export {GetUserDir, CreateDir, DeleteDir, GetAdmin, UpdateDir};
