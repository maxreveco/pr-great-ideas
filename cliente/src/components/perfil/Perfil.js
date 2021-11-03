import React, { useEffect, useState, useContext } from 'react';
import styles from '../estilos/greatIdeas.module.css';
import UserContext from '../../context/UserContext';
import { FaRegLightbulb } from 'react-icons/fa'
import { Input, Button, Form, FormGroup, Row, Col } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';

const Perfil = () => {

    const context = useContext(UserContext);
    const history = useHistory();
    const [post, setPost] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [newPost, setNewPost] = useState({
        id_user: "",
        aliasUser: "",
        content: "",
        countLikes: 0,
        userLikes: []
    })

    useEffect(() => {
        context.setUser(context.user)
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

    const meGusta = (e, p) => {
        e.preventDefault();
        const post = {
            id_user: p.id_user,
            aliasUser: p.aliasUser,
            content: p.content,
            countLikes: p.countLikes + 1,
            userLikes: context.user
        }

        const idUserPost = p.userLikes.filter((el) => el.id === context.user.id);
        console.log(p.userLikes)

        if (idUserPost.length > 0) {
            Swal.fire('Ya le has dado me gusta a esta idea!', '', 'error')
        } else {
            axios.put(`/api/post/${p._id}`, ({ userLikes: [...p.userLikes, post.userLikes], countLikes: post.countLikes }))  //Le damos like al post y guardamos el user
                .then(resp => {

                    p.id_user === context.user.id ?

                        Swal.fire('Siempre es bueno reforzar la confianza en tus ideas!', '', 'success')
                            .then(resp => setRefresh(refresh + 1))
                            .catch(err => console.log(err)) :

                        Swal.fire('Gracias por tu apoyo!', '', 'success')
                            .then(resp => setRefresh(refresh + 1))
                            .catch(err => console.log(err))
                })
                .catch(err => {
                    Swal.fire('Error al darle me gusta al elemento', '', 'error')
                })
        }
    }

    const guardarPost = () => {
        const post = {
            id_user: context.user.id,
            aliasUser: context.user.alias,
            content: newPost.content,
            countLikes: 0,
            userLikes: []
        }

        axios.post('/api/new', post)
            .then(resp => {
                Swal.fire('Tu idea se registro correctamente', '', 'success')
                    .then(resp => setRefresh(refresh + 1))
            })

    }

    const borrarIdea = (p) => {
        Swal.fire({
            title: 'Borrar tu idea',
            text: 'Estas seguro de borrar tu genial idea?',
            confirmButtonText: 'Si, tengo una mejor :)',
            cancelButtonText: 'No, es una buena idea',
            showCancelButton: true,
            icon: 'warning'
        }).then(resp => {
            if (resp.value) {
                axios.delete(`/api/post/${p._id}`)
                    .then(resp => {
                        Swal.fire('Idea Eliminada', 'La idea se ha eliminado correctamente', 'success');
                        setRefresh(refresh + 1)
                        // const prods = props.products.filter(prd => prd._id != p._id);
                        // props.setProducts(prods);
                    })
                    .catch(err => Swal.fire('Error', 'Error al eliminar idea', 'error'));
            }
        })
    }

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2>Bienvenido(a): {context.user.alias}</h2>
                <a role="button" href="#" onClick={logout}>Logout</a>
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
                <h2 className={styles.listaTitulo}>Ideas que te pueden encantar <FaRegLightbulb /></h2>
                <Col xs={{ size: 10, offset: 3 }}>
                    {post.map((p, i) =>
                        <table key={i} style={{ border: "none" }}>
                            <tbody >
                                <tr>
                                    <td>{p.aliasUser} ha posteado: </td>
                                    <td className={styles.postContent}>{p.content}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <ul>
                                            <li><a href="" onClick={(e) => meGusta(e, p)} >Me Gusta</a></li>
                                            <li> Le ha gustado a <a href="" onClick={(e) => history.push(`/listado/${p._id}`)}>{p.countLikes}</a> personas</li>
                                            {p.id_user === context.user.id ? <li><a role="button" href="#" onClick={() => borrarIdea(p)}>Eliminar</a></li> : <li></li>}
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </Col>
            </div>
        </div >
    )
}

export default Perfil;