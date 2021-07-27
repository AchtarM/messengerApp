import React, { useState } from 'react'
import { Modal, Form , Button } from 'react-bootstrap'
import { useContacts } from '../contexts/contactsProvider'
import { useConversations } from '../contexts/ConversationProvider'

export default function ConversationModel( {closeModal} ) {

    const { contacts } = useContacts();
    const { creatConversations } = useConversations();
    const [selectedContactsId, setselectedContactsId] = useState([]);

    const handelCheckBoxChange = (contactId) => {
        setselectedContactsId(prevSelectedIds => {
            if(prevSelectedIds.includes(contactId)) {
                return prevSelectedIds.filter(prevId => {
                   return contactId !== prevId;
                })
            }
            else {
                return [...prevSelectedIds , contactId];
            }
        })
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        creatConversations(selectedContactsId)
        closeModal();
    }
    

    return (
        <>
            <Modal.Header closeButton>Creat Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit ={handelSubmit}>
                    {contacts.map(contact =>(
                        <Form.Group controlId = {contact.id} key = {contact.id}>
                            <Form.Check
                            type = "checkbox"
                            value = {selectedContactsId.includes(contact.id)}
                            label = {contact.name}
                            onChange = {() => handelCheckBoxChange(contact.id)}
                            >
                            </Form.Check>
                        </Form.Group>
                    ))}
                    <div style = {{marginTop : " 20px"}}>
                        <Button type = "submit">Create</Button>
                    </div>
                    
                </Form>
            </Modal.Body>
        </>
    )
}
