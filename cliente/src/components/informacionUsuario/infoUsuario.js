import React, { useEffect, useState } from 'react';
import styles from '../estilos/greatIdeas.module.css';
import { Button } from 'reactstrap';

import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const InformacionUsuario =() => {

    const [user, setUser] = useState([]);
    const [likes, setLikes] = useState([]);
    const [post, setPost] = useState([]);
    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`/api/listado/${id}`)
        .then(resp => {
            setUser(resp.data);
        }).catch(err => ('Error getting User', 'Error getting the User list', 'error'))

        axios.get(`/api/userLikes/${id}`)
        .then(resp => {
            console.log('RESP', resp);
            setLikes(resp.data.length);
            console.log("Likes", resp.data.length)
        }).catch(err => ('Error getting likes', 'Error getting the User likes', 'error'))

        axios.get(`/api/userPosts/${id}`)
        .then(resp => {
            console.log('RESP', resp);
            setPost(resp.data.length);
            console.log("Post", resp.data.length)
        }).catch(err => ('Error getting Post', 'Error getting the Post likes', 'error'))        
        
    }, []);

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    const volver=()=>{
        history.push("/perfil");
    }

    return(
       
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Button color="danger" onClick={logout}>Logout</Button>
                <a href="" onClick={volver}>Inicio...</a> 
            </div>   
            <div>
                <ul>
                    <li>Nombre: {user.firstName}</li>
                    <li>Alias: {user.alias} </li>
                    <li>email: {user.email}</li>    
                    <li>Numero total de post!: {post}</li> 
                    <li>Numero total de Likes: {likes} </li>                 
                </ul>
            </div>
        </div >
    )
}
export default InformacionUsuario;