import React, { useEffect, useState } from 'react';
import styles from '../estilos/greatIdeas.module.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const InformacionUsuario = () => {

    const [user, setUser] = useState([]);
    const [likes, setLikes] = useState(0);
    const [posts, setPosts] = useState(0);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/api/listado/${id}`)
            .then(resp => {
                setUser(resp.data);
            }).catch(() => Swal.fire('Error getting User', 'Error getting the User list', 'error'))

        axios.get(`/api/userLikes/${id}`)
            .then(resp => {
                console.log('RESP', resp);
                setLikes(resp.data.length);
                console.log("Likes", resp.data.length)
            }).catch(() => Swal.fire('Error getting likes', 'Error getting the User likes', 'error'))

        axios.get(`/api/userPosts/${id}`)
            .then(resp => {
                console.log('RESP', resp);
                setPosts(resp.data.length);
                console.log("Post", resp.data.length)
            }).catch(() => Swal.fire('Error getting Post', 'Error getting the Post likes', 'error'))

    }, []);

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    const volver = () => {
        history.push("/perfil");
    }

    return (

        <div className={styles.wrapper}>
            <div className={styles.header}>
                <a role="button" href="#" onClick={logout}>Logout</a>
                <a href="" onClick={volver}>Inicio...</a>
            </div>
            <div>
                <ul className={styles.infoUser}>
                    <li>Nombre: {user.firstName}</li>
                    <li>Alias: {user.alias} </li>
                    <li>email: {user.email}</li>
                </ul>
                <ul className={styles.detailPost}>
                    <li>Numero total de post: {posts}</li>
                    <li>Numero total de likes: {likes} </li>
                </ul>
            </div>
        </div >
    )
}
export default InformacionUsuario;