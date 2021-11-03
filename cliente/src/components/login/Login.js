import axios from 'axios';
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';

const Login = () => {

    const history = useHistory();

    const context = useContext(UserContext);

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const updateFormValue = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', inputs, { withCredentials: true })
            .then(resp => {
                if (resp.data.success) {
                    context.setUser(resp.data.user);
                    localStorage.setItem('USER_DATA', JSON.stringify(resp.data.user))
                    Swal.fire('Bienvenido', "Has iniciado sesion correctamente", 'success')
                        .then(history.push('/Perfil'))
                        .catch(err => console.log(err))
                }
            })
            .catch(err => {
                console.log(err);
                Swal.fire('Intento de login', err?.response?.data?.message, 'error');
            });
    }

    return (
        <>
            <Row>
                <h2>Iniciar Sesion</h2>
            </Row>
            <Form onSubmit={login}>
                <Row>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input type="email" name="email" value={inputs.email} onChange={updateFormValue} required />
                        </FormGroup>
                    </Col><Col xs={12}>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input type="password" name="password" value={inputs.password} onChange={updateFormValue} required />
                        </FormGroup>
                    </Col>
                    <FormGroup>
                        <Button className="mt-3" type="submit" color="primary">Iniciar Sesion</Button>
                    </FormGroup>
                </Row>
            </Form>
        </>
    )

}

export default Login;