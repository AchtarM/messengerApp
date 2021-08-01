import Login from './Login'
import React  from "react"
import UseLocalStorage from '../hooks/UseLocalStorage';
import DashBoard from './DashBoard'
import { ContactsProvider } from '../contexts/contactsProvider';
import { ConversationProvider } from '../contexts/ConversationProvider';

export function App() {

  const [id, setId] = UseLocalStorage("id");

  const dashBoard = (
    <ContactsProvider>
        <ConversationProvider id = {id}>
          <DashBoard id = {id}/>
        </ConversationProvider>
    </ContactsProvider>
  )

  return (
    id ? dashBoard :  <Login onIdSubmit = {setId}/> 
  )
}

export default App;
 