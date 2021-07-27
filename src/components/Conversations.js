import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationProvider';

export default function Conversations() {

    const { conversations } = useConversations();
    return (
        <div>
            <ListGroup variant ="flush">
            {conversations.map(( conversation, index) =>(
                <ListGroup.Item key ={index}>
                    {conversation.recipients.map(r =>r.name).join(', ')}
                </ListGroup.Item>
            ))}
        </ListGroup>
        </div>
    )
}
