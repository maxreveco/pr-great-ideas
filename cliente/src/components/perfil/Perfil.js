import React, { useEffect, useState, useContext } from 'react';
import styles from '../estilos/greatIdeas.module.css';
import UserContext from '../../context/UserContext';
import { FaRegLightbulb } from 'react-icons/fa'
import { Input, Button, Form, FormGroup, Row, Col } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const Perfil = () => {

    const context = useContext(UserContext);
    const [newPost, setNewPost] = useState({
        id_user: "",
        content: "",
        countLikes: 0,
        userLikes: []
    })

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
            content: newPost.content,
            countLikes: 0,
            userLikes: [context.user]
        }

        axios.post('/api/new', post)
            .then(resp => {
                Swal.fire('Registro de Usuario', 'Usuario registrado correctamente', 'success')
            })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2>Bienvenido: {context.user.firstName} {context.user.lastName}</h2>
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
                <ul className={styles.post}>
                    <li>Hola Post</li>
                </ul>
                <ul className={styles.likes}>
                    <li>Hola Likes</li>
                </ul>


            </div>
        </div >
    )
}

export default Perfil;