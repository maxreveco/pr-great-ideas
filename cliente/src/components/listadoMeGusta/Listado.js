import React, { useEffect, useState } from 'react';
import styles from '../estilos/greatIdeas.module.css';
import { Button, Col, Row, Table } from 'reactstrap';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';

const Listado = () => {

    const [post, setPost] = useState([]);
    const history = useHistory()
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/api/post/${id}`)
            .then(resp => {
                console.log('RESP', resp);
                setPost(resp.data);
            }).catch(err => ('Error getting Post', 'Error getting the Post list', 'error'))

    }, []);

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    const volverIdeas = () => {
        history.push("/perfil")
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <a color="danger" role="button" href="#" onClick={volverIdeas}>Grandes Ideas</a>
                <a color="danger" role="button" href="#" onClick={logout}>Logout</a>
            </div>
            <div className={styles.listaPost}>
                <table style={{ border: "none" }}>
                    <tbody >
                        <tr>
                            <td>{post.aliasUser} ha posteado: </td>
                            <td className={styles.postContent}>{post.content}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.contenidoTabla}>
                <h3>Usuarios(as) agradecidos de tu idea: </h3 >
                <Col>
                    <Table bordered size="sm">
                        <thead>
                            <tr>
                                <th>Alias</th>
                                <th>Nombre</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody >
                            {post.userLikes &&
                                post.userLikes.map((p, i) => (
                                    <tr key={i}>
                                        <td><a href="#" role="button" onClick={(e) => history.push(`/usuario/${p.id}`)}>{p.alias} </a></td>
                                        <td>{p.firstName}</td>
                                        <td>{p.email}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Col>
            </div>
        </div >
    )
}
export default Listado;