import React from 'react';
import SideBar from './SideBar';
import { useConversations } from '../contexts/ConversationProvider';
import OpenConversation from './OpenConversation';

export default function DashBoard({id}) {

    const { selectedConversation } = useConversations();

    return (
        <div className = "d-flex" style = {{height : "100vh"}}>
              <SideBar id = {id}/>
             { selectedConversation && <OpenConversation/>}
        </div>
      
    )
}
