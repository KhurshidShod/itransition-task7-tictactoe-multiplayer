import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useChatContext, Channel } from 'stream-chat-react'
import Game from './Game'

function JoinGame() {

    const [ oppName, setOppName] = useState("")
    const { client } = useChatContext();
    const [ channel, setChannel ] = useState(null)

    const createChannel = async (e) => {
        e.preventDefault()
        const response = await client.queryUsers({ name: { $eq: oppName } });

        if(response.users.length === 0) {
            alert('User not found')
            return
        }
        const newChannel = await client.channel('messaging', {
            members: [client.userID, response.users[0].id],
        })

        await newChannel.watch()
        setChannel(newChannel)
    };


  return (
    <>
    { channel ? 
    <Channel channel={channel}>
        <Game channel={channel} />
    </Channel> : 
    (<div>
        <h1>Create Game</h1>
        <Form>
            <Form.Group>
                <Form.Control 
                type='text' 
                placeholder='Name of opponent'
                id='oppName'
                onChange={
                (event) => {
                    setOppName(event.target.value)
                }}
                />
                <Button type='submit' onClick={createChannel}>Ready!</Button>
            </Form.Group>
        </Form>
    </div>)
    }
    </>
  )
}

export default JoinGame