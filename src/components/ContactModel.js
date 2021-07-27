
import React, { useRef } from 'react'
import { Modal ,Form,  Button } from 'react-bootstrap'
import { useContacts } from '../contexts/contactsProvider';

export default function ContactModel({ closeModal }) {

    const idRef = useRef();
    const nameRef = useRef();
    const { creatContacts } = useContacts(); 
    
    const handelSubmit = (e) => {
        e.preventDefault();
        creatContacts(idRef.current.value,nameRef.current.value);
        closeModal();
    }

    return (
        <>
            <Modal.Header closeButton>Creat Contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit ={handelSubmit}>
                    <Form.Group>
                        <Form.Label>Contact Id</Form.Label>
                        <Form.Control type ="text" ref = {idRef} requierd/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type ="text" ref = {nameRef} requierd/>
                    </Form.Group>
                    <div style = {{marginTop : " 20px"}}>
                        <Button type = "submit">Create</Button>
                    </div>
                    
                </Form>
            </Modal.Body>
        </>
    )
}
