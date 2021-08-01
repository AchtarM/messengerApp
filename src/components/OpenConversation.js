import React , {useState} from 'react'
import { Form, InputGroup, Button } from "react-bootstrap"
import { useConversations } from '../contexts/ConversationProvider';

export default function OpenConversation() {

    const [text, setText] = useState('');
    const { sendMessage, selectedConversation } = useConversations()

   const handelSubmit = (e) => {
        e.preventDefault();
        sendMessage(selectedConversation.recipients.map(r => r.id),text);
        setText('');
    }

    return (
        <div className = "d-flex flex-column flex-grow-1">
              <div className = "flex-grow-1 overflow-auto">
                  <div className = "h-100 d-flex flex-cloumn align-items-start justify-content-end px-3">
                        {selectedConversation.map((message, index) => {
                            return(
                                <div
                                  key = {index}
                                  className = "my-1 d-flex flex-cloumn"
                                >
                                     <div
                                      className = {`rounded px-2 py-1 ${ message.Forme ? 
                                        `bg-primary text-white` :`border`}`}
                                      >
                                          {message.text}
                                      </div>

                                      <div className = {`text-muted small ${message.fromMe ?
                                         `text-right` :  ''}`}>
                                            {message.fromMe ? 'You' : message.senderName}
                                      </div>
                                </div>  
                            )
                        })}
                  </div>
              </div>
              <Form onSubmit={handelSubmit}>
                  <Form.Group className = "m-2">
                      <div style = {{display : 'flex'}}>
                            <InputGroup >
                                <Form.Control
                                 as = 'textarea'
                                 required
                                 value={text}
                                 onChange={ e => setText(e.target.value)}
                                 style = {{height : '75px' , resize : 'none' }}
                                 />
                                 <div>
                                      <InputGroup>
                                          <Button 
                                          type = "submit" 
                                          style = {{height : '75px'}}
                                          >Send</Button>
                                      </InputGroup>
                                 </div>
                            </InputGroup>
                       </div>
                   </Form.Group>
                </Form>
        </div>
    )
}
