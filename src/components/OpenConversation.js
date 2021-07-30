import React , {useState} from 'react'
import { Form, InputGroup, Button } from "react-bootstrap"

export default function OpenConversation() {

    const [text, setText] = useState('');

    return (
        <div className = "d-flex flex-column flex-grow-1">
              <div className = "flex-grow-1 overflow-auto">
                  
              </div>
              <Form>
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
                                          <Button type = "submit" style = {{height : '75px'}} >Send</Button>
                                      </InputGroup>
                                 </div>
                            </InputGroup>
                       </div>
                   </Form.Group>
                </Form>
        </div>
    )
}
