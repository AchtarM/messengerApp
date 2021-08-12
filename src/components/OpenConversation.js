import React , {useState, useCallback} from 'react'
import { Form, InputGroup, Button } from "react-bootstrap"
import { useConversations } from '../contexts/ConversationProvider';

export default function OpenConversation() {

    const [text, setText] = useState('');
    const { sendMessage, selectedConversation } = useConversations();
    
    const setRef = useCallback(node => {
        if(node){
            node.scrollIntoView({ smoth : true });
        }
    }, []);

   const handelSubmit = (e) => {
        e.preventDefault();
        sendMessage(selectedConversation.recipients.map(r => r.id),text);
        setText('');
    }

    return (
        <div className = "d-flex flex-column flex-grow-1">
              <div className = "flex-grow-1 overflow-auto">
                  <div className = " d-flex flex-column align-items-start justify-content-end px-3">
                        {selectedConversation.messages.map((message, index) => {
                            const  lastmessage = selectedConversation.messages.length-1 === index;
                            return(
                                <div
                                  ref = {lastmessage ? setRef : null}
                                  key = {index}
                                  className = {`my-1 d-flex flex-column ${message.fromMe ? 
                                     'align-self-end' :  '' } `}
                                >
                                     <div
                                      className = {`rounded px-2 py-1 ${ message.fromMe ? 
                                        `bg-primary text-white` :'border'}`}
                                      >
                                          {message.text}
                                      </div>

                                      <div className = {`text-muted small ${message.fromMe ?
                                         'align-self-end' :  ''}`}>
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
