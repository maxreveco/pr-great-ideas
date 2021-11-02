import React from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import {Col,Form,Button,FormGroup,Input,Row,Label, Table} from 'reactstrap';

const initialState = {
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:""
}
const FormularioRegistro = () => {
    const [nuevoUsuario, setNuevoUsuario] = useState(initialState);
    const [errors, setErrors] = useState(initialState);
    const history = useHistory();

    const updateFormValue = (e) =>{
        const {name, value} = e.target;
        setNuevoUsuario({
            ...nuevoUsuario,
            [name]:value
        });
        setErrors({
            ...errors,
            [name]:''
        });
    }

    const registrar = (e) =>{
        e.preventDefault();        
        axios.post('http://localhost:8000/api/registry', nuevoUsuario)        
            .then(resp => {                
                Swal.fire('usuario registrado','usuario completamente registrado','success');
                history.push('/')
            }).catch(err => {
                for(let field in err.response.data.errors){
                    setErrors({
                        ...errors,
                        [field]: err.response.data.errors[field].message                                           
                    });                   
                }
            });
    }

    return(
        <>
            <h1>Bienvenido a Ideas Brillantes</h1>
            <div className="registro">
            <Form onSubmit={registrar}>  
                <h3>Registro de usuario</h3>                        
                <Row xs={6}>                    
                    <Col xs={12}>
                        <FormGroup>
                            <Label>First Name</Label>
                            <Input type="text" name="firstName" value={nuevoUsuario.firstName} onChange={updateFormValue} required></Input>
                            {errors.firstName && <span style={{color: 'red'}}>{errors.firstName}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Last Name</Label>
                            <Input type="text" name="lastName" value={nuevoUsuario.lastName} onChange={updateFormValue} required></Input>
                            {errors.lastName && <span style={{color: 'red'}}>{errors.lastName}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input type="text" name="email" value={nuevoUsuario.email} onChange={updateFormValue} required></Input>
                            {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input type="password" name="password" value={nuevoUsuario.password} onChange={updateFormValue} required></Input>
                            {errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Confirm passwword</Label>
                            <Input type="password" name="confirmPassword" value={nuevoUsuario.confirmPassword} onChange={updateFormValue} required></Input>
                            {errors.confirmPassword && <span style={{color: 'red'}}>{errors.confirmPassword}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit">Registrar</Button>
                        </FormGroup>
                    </Col> 
                </Row>                    
            </Form>
            </div>
            {/* <div className="inicioSesion">
            <Form>
                <h3>Iniciar Sesion</h3>
                <Row xs={6}>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input type="text" name="email" value={nuevoUsuario.email}  required></Input>
                            {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input type="text" name="password" value={nuevoUsuario.password}  required></Input>
                            {errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit">Iniciar Sesion</Button>
                        </FormGroup>                            
                    </Col>
                </Row>
            </Form>
            </div> */}
        </>
    )
}
export default FormularioRegistro;