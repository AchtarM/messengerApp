import React, {useContext,useState} from 'react';
import UseLocalStorage from '../hooks/UseLocalStorage';
import { useContacts } from './contactsProvider';


const ConversationsContext = React.createContext();

export  function useConversations() {
    return useContext(ConversationsContext);
}

export  function ConversationProvider({ id , children }) {

    const { contacts } = useContacts();
    const [conversations, setConversations] = UseLocalStorage('Conversations', []);
    const [selectedConversationsIndex, setSelectedConversationsIndex] = useState(0);

    function creatConversations(recipients) {
        setConversations(prevConversations => {
            return [...prevConversations, { recipients , messages : [] }]
        })
    }

    const addMessageToConversation = ({recipients, text, sender}) => {

        setConversations(prevConversations => {
            let madeChange =  false;
            const newMessage = {sender , text};
            const newConversation = prevConversations.map( conversation => {
                if(arrayEqulity(conversation.recipients , recipients)) {
                    madeChange =  true;
                    return {
                        ...conversation,
                        messages : [...conversation.messages, newMessage]
                    }
                }

                return conversation;
            })

            if(madeChange) {
                return newConversation;
            }
            else{
               return [ 
                   ...prevConversations ,
                   { recipients , messages : [newMessage] } 
                ]
            }
        })
    }

    const sendMessage = (recipients , text) => {
        addMessageToConversation({recipients, text, sender : id})
    }

  
 
    const formattedConversations = conversations.map((conversation,index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                 return   contact.id === recipient;
            })

            const name = ( contact && contact.name) || recipient;
            return { id : recipient, name }
        });

        const messages = conversation.messages.map(message =>{
            const contact = contacts.find(contact => {
                return   contact.id === message.sender;
           });
           
       
           const name = ( contact && contact.name) || message.sender;
           const fromMe = id === message.sender;
           return {...message, senderName : name, fromMe  }
            
        });

       
        const selected = index === selectedConversationsIndex
        return { ...conversation, messages, recipients, selected }
    });
    

    const value = {
        conversations : formattedConversations,
        selectedConversation : formattedConversations
        [selectedConversationsIndex],
        sendMessage,
        selecteConversationsIndex : setSelectedConversationsIndex,
        creatConversations
    }

    

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}


function arrayEqulity(a ,b){

    if(a.length !== b.length) {
        return false;
    }

    a.sort();
    b.sort();

    return a.every( (element, index) =>{
        return (element === b[index])
    });

}