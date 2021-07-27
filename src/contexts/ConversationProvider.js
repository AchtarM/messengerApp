import React, {useContext} from 'react'
import UseLocalStorage from '../hooks/UseLocalStorage';
import { useContacts } from './contactsProvider';

const ConversationsContext = React.createContext();

export  function useConversations(){
    return useContext(ConversationsContext);
}

export  function ConversationProvider({ children }) {

    const { contacts } = useContacts();
    const [conversations, setConversations] = UseLocalStorage('Conversations', []);

    const formatedConversations = conversations.map(conversation =>{
        const recipients = conversation.recipients.map(recipient =>{
            const contact = contacts.find(contact =>{
                 return   contact.id === recipient;
            })

            const name = ( contact && contact.name) || recipient;
            return {id : recipient , name}
        })

        return {...conversation ,recipients}
    })

    function creatConversations(recipients){
        setConversations(prevConversations =>{
            return [...prevConversations, { recipients , messages : []}]
        })
    }

    const value = {
        conversations : formatedConversations,
        creatConversations
    }

    return (
        <ConversationsContext.Provider value = {{value}}>
            {children}
        </ConversationsContext.Provider>
    )
}
