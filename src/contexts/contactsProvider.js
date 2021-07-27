import React, {useContext} from 'react'
import UseLocalStorage from '../hooks/UseLocalStorage';

const contactsContext = React.createContext();

export  function useContacts(){
    return useContext(contactsContext);
}

export  function ContactsProvider({ children }) {

    const [contacts, setContacts] = UseLocalStorage('contacts', []);

    function creatContacts(id, name){
        setContacts(prevContacts =>{
            return [...prevContacts, { id,name }]
        })
    }

    return (
        <contactsContext.Provider value = {{contacts , creatContacts}}>
            {children}
        </contactsContext.Provider>
    )
}
