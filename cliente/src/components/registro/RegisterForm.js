import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Swal from 'sweetalert2';
import Login from '../login/Login';
import styles from '../estilos/greatIdeas.module.css';
import { FaRegLightbulb } from 'react-icons/fa'

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const RegisterForm = () => {
    const [newUser, setNewUser] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    const history = useHistory();

    const updateFormValue = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ''
        });
    }

    const registrar = (e) => {
        e.preventDefault();
        axios.post('/api/registry', newUser)
            .then(resp => {
                setNewUser(initialState);
                Swal.fire('Registro de Usuario', 'Usuario registrado correctamente', 'success')
            })
            .catch(err => {
                for (let field in err.response.data.errors) {
                    setErrors({
                        ...errors,
                        [field]: err.response.data.errors[field].message
                    });
                }
            })
    }

    return (
        <>
            <div className={styles.wrapper}>
                <h2 className={styles.mensajeBienvenida}>Bienvenido a Grandes Ideas! <FaRegLightbulb /></h2>
                <div className={styles.mainRegistro}>
                    <Row>
                        <Col xs={{ size: 3, offset: 2 }}>
                            <Form onSubmit={registrar}>
                                <h2>Registro</h2>
                                <FormGroup>
                                    <Label>Nombre</Label>
                                    <Input type="text" name="firstName" value={newUser.firstName} onChange={updateFormValue} />
                                    {errors.firstName && <span style={{ color: "red" }}>{errors.firstName}</span>}
                                </FormGroup>

                                <FormGroup>
                                    <Label>Apellido</Label>
                                    <Input type="text" name="lastName" value={newUser.lastName} onChange={updateFormValue} />
                                    {errors.lastName && <span style={{ color: "red" }}>{errors.lastName}</span>}
                                </FormGroup>

                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input type="text" name="email" value={newUser.email} onChange={updateFormValue} />
                                    {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                                </FormGroup>

                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input type="password" name="password" value={newUser.password} onChange={updateFormValue} />
                                    {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
                                </FormGroup>

                                <FormGroup>
                                    <Label>Confirmar Password</Label>
                                    <Input type="password" name="confirmPassword" value={newUser.confirmPassword} onChange={updateFormValue} />
                                    {errors.confirmPassword && <span style={{ color: "red" }}>{errors.confirmPassword}</span>}
                                </FormGroup>
                                <Button className="mt-3" type="submit" color="primary">Registrar Usuario</Button>
                            </Form>
                        </Col>
                        <Col xs={{ size: 3, offset: 1 }}>
                            <Login />
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default RegisterForm;
