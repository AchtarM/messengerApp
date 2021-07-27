import React , { useState } from 'react'
import {Tab , Nav, Button, Modal} from 'react-bootstrap'
import Conversations from './Conversations';
import Contacts from './Contacts';
import ConversationModel from "./ConversationModel"
import ContactModel from "./ContactModel"

const CONVERSATION_KEY = 'conversations';
const CONTACTS_KEY = 'contacts';

export default function SideBar({id}) {

    const [activeKey, setActiveKey] = useState(CONVERSATION_KEY);
    const conversationOpen = activeKey === CONVERSATION_KEY;
    const [modelOpen, setModalOpen] = useState(false);

    const closeModal = () =>{
        setModalOpen(false)

    } 

    return (
       <div style = {{width : "250px"}} className = "d-flex flex-column">
            <Tab.Container activeKey = {activeKey} onSelect = {setActiveKey}>
                <Nav variant = "tabs" className = "justify-contant-center">
                <Nav.Item>
                    <Nav.Link eventKey = {CONVERSATION_KEY}>Conversations</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                     <Nav.Link eventKey = {CONTACTS_KEY}>Contacts</Nav.Link>
                </Nav.Item>
                </Nav>
                <Tab.Content style = {{borderRight : "solid 1px rgb(214, 214, 255)", flexGrow : "1" ,overflow : "auto"}}>
                    <Tab.Pane eventKey = {CONVERSATION_KEY}>
                        <Conversations/>
                    </Tab.Pane>
                    <Tab.Pane eventKey = {CONTACTS_KEY}>
                        <Contacts/>
                    </Tab.Pane>
                </Tab.Content>
                <div className = "p-2 border-top small" style = {{borderRight : "solid 1px rgb(214, 214, 255)"}}>
                    Your Id : <span className="text-muted">{id}</span>
                </div>
                <Button onClick = {() => setModalOpen(true)} className = "rounded-0">
                    New {conversationOpen ? "conversation" : "contact"}
                </Button>
            </Tab.Container>

            <Modal show={modelOpen} onHide = {closeModal}>
                {conversationOpen ?
                 <ConversationModel closeModal = {closeModal}/> :
                 <ContactModel closeModal = {closeModal}/>}
            </Modal>
       </div>
    )
}
