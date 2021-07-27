import React, { useRef } from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import {v4 as uuidV4} from 'uuid'


export default function Login({onIdSubmit}) {

    const idRef = useRef();

   const handelsubmit = (e) =>{
    e.preventDefault();
    onIdSubmit(idRef.current.value);
   }

   const creatNewId = () =>{
    onIdSubmit(uuidV4());
   }

    return (
        <Container className = "align-items-center d-flex" style ={{height :"100vh"}}>
            <Form onSubmit = {handelsubmit} className ="w-100" >
                <Form.Group>
                     <Form.Label >Enter Your Id </Form.Label>
                     <Form.Control type ="text"  ref={idRef} required/>
                </Form.Group>
                <div className = "mt-3" >
                    <Button type ="submit"  style ={{marginRight : "10px"}}>Login</Button>
                    <Button variant = "secondary" onClick = {creatNewId} >Creat A New Id</Button>
                </div>
               
            </Form>
        </Container>
    )
}
