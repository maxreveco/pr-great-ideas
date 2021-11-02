import React, { useEffect, useState, useContext } from 'react';
import styles from '../estilos/greatIdeas.module.css';
import UserContext from '../../context/UserContext';
import { FaRegLightbulb } from 'react-icons/fa'
import { Input, Button, Form, FormGroup, Row, Col, Table } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const Perfil = () => {

    const context = useContext(UserContext);
    const [post, setPost] = useState([]);
    const [refresh, setRefresh]=useState(0);
    const [newPost, setNewPost] = useState({
        id_user: "",
        aliasUser: "",
        content: "",
        countLikes: 0,
        userLikes: []
    })

    useEffect(() => {
        axios.get('/api/post')
            .then(resp => {
                console.log('RESP', resp);
                setPost(resp.data);
            }).catch(err => ('Error getting Post', 'Error getting the Post list', 'error'))
    }, [refresh]);

    const updateValue = (e) => {
        const { name, value } = e.target;
        setNewPost({
            ...newPost,
            [name]: value
        });

        console.log(newPost)
    }

    const guardarPost = () => {
        const post = {
            id_user: context.user.id,
            aliasUser: context.user.alias,
            content: newPost.content,
            countLikes: 0,
            userLikes: [context.user]
        }

        axios.post('/api/new', post)
            .then(resp => {
                Swal.fire('Tu idea se registro correctamente', '', 'success')
            })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2>Bienvenido: {context.user.alias}</h2>
                <Button color="danger">Logout</Button>
            </div>
            <div className={styles.main}>
                <Form>
                    <Row>
                        <Col xs={1}>
                            <FaRegLightbulb />
                        </Col>
                        <Col xs={{ size: 4 }}>
                            <FormGroup>
                                <Input type="text" name="content" placeholder="Ingresa aqui tu idea!" onChange={updateValue} />
                                {/* {errors.firstName && <span style={{ color: "red" }}>{errors.firstName}</span>} */}
                            </FormGroup>
                        </Col>
                        <Col xs={{ size: 1 }}>
                            <Button color="success" onClick={guardarPost}>Idea!</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className={styles.listaPost}>
                <Col xs={{size: 6, offset:2}}>
                <table style={{border:"none"}}>               
                        { post.map((p, i) => 
                        <>
                            <tr key={i}>
                                <td>{p.aliasUser} ha posteado: </td>
                                <td className={styles.postContent}>{p.content}</td>                                    
                            </tr> 
                            <tr>                                
                                <td></td>
                                <td>
                                    <ul>
                                        <li><a href="">Me Gusta</a></li>
                                        <li> Le ha gustado a <a href="">{p.countLikes}</a> personas</li>
                                        <li>Eliminar</li>
                                    </ul>
                                    </td> 
                            </tr> 
                        </>                              
                        )}          
                </table>   
                </Col>   
            </div>
        </div >
    )
}

export default Perfil;