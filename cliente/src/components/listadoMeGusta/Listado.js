import React, { useEffect, useState } from 'react';
import styles from '../estilos/greatIdeas.module.css';
import { Button, Col } from 'reactstrap';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';

const Listado = () =>{

    const [post, setPost] = useState([]);
    const history = useHistory()
    const {id} = useParams();

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

    const volver=()=>{
        history.push("/perfil")
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Button color="danger" onClick={logout}>Logout</Button>
                <a href="" onClick={volver}>Inicio...</a>
            </div>            
            <div className={styles.listaPost}>
                <Col xs={{ size: 10, offset: 2 }}>
                        <table style={{ border: "none" }}>
                            <tbody >
                                <tr>
                                    <td>{post.aliasUser} ha posteado: </td>                                    
                                    <td className={styles.postContent}>{post.content}</td>
                                </tr>
                            </tbody>
                        </table>
                </Col>
                <div className={styles.contenidoTabla}>
                    <h5>Persona que le ha gustado el post: </h5>
                        <table style={{ border: "2px solid black" }}>
                        <thead>
                            <tr>
                                <th>Alias</th>    
                                <th>Nombre</th>                         
                            </tr>                        
                        </thead>
                            <tbody >                                                                                           
                                {post.userLikes &&
                                    post.userLikes.map((p, i)=>( 
                                        <tr key={i}>
                                            <td><a href="" onClick={(e) => history.push(`/usuario/${p.id}`) }>{p.alias} </a></td>                                    
                                            <td>{p.firstName}</td>
                                        </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
            </div>
        </div >
    )
}
export default Listado;