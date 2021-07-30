import React, {useContext,useState} from 'react';
import UseLocalStorage from '../hooks/UseLocalStorage';
import { useContacts } from './contactsProvider';


const ConversationsContext = React.createContext();

export  function useConversations() {
    return useContext(ConversationsContext);
}

export  function ConversationProvider({ children }) {

    const { contacts } = useContacts();
    const [conversations, setConversations] = UseLocalStorage('Conversations', []);
    const [selectedConversationsIndex, setSelectedConversationsIndex] = useState(0);

    function creatConversations(recipients) {
        setConversations(prevConversations => {
            return [...prevConversations, { recipients , messages : [] }]
        })
    }
 
    const formattedConversations = conversations.map((conversation,index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                 return   contact.id === recipient;
            })

            const name = ( contact && contact.name) || recipient;
            return { id : recipient, name }
        })
        const selected = index === selectedConversationsIndex
        return { ...conversation, recipients , selected }
    })
    
  
    const value = {
        conversations : formattedConversations,
        selectedConversation : formattedConversations[selectedConversationsIndex],
        selecteConversationsIndex : setSelectedConversationsIndex,
        creatConversations
    }

    

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}
