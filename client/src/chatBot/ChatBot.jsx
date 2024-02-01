import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from '@chatscope/chat-ui-kit-react'

const API_KEY = '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';

const systemMessage = {
  role: 'system',
  content: 'Explain like you are an expert in the field and you have to clear all the doubts of the user' //Speak like a pirate  
}

function App() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: 'Hello, I am an AI Assistant!',
      sender: 'ChatGPT'
    }
  ])
  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: 'user',
      direction: 'outgoing'
    }
    const newMessages = [...messages, newMessage]; //old messages + new message
    
    //update our messages state
    setMessages(newMessages);

    //set typing indicator(chatgpt is typing)
    setTyping(true);

    //process message to ChatGPT(send it over and see response)
    await processMessageToChatGPT(newMessages);
  }

  async function processMessageToChatGPT(chatMessages) {
    //chatMessages {sender: 'user' or 'ChatGPT', message: 'message content'}
    //apiMessages {role: 'user' or 'assistant', content: 'message content'}
    let apiMessages = chatMessages.map((messageObject) => {
      let role = '';
      if(messageObject.sender === 'ChatGPT'){
        role = 'assistant';
      } else{
        role = 'user';
      }
      return {role: role, content: messageObject.message}
    });

    //role: 'user' -> a msg from user, 'assistant' -> response from chatGPT
    //'system' -> generally one initial msg defining HOW we want chatGPT to talk

    const apiRequestBody = {
      'model' : 'gpt-3.5-turbo',
      'messages' : [
        systemMessage, 
        ...apiMessages //[msg1, msg2, msg3]
      ]
    }

    await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization' : "Bearer " + API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apiRequestBody),
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      console.log(data.choices[0].message.content);
      setMessages(
        [...chatMessages, {
          message: data.choices[0].message.content,
          sender: 'ChatGPT'
        }]
      );
      setTyping(false);
    })
  }

  return (
    <div className='App'>
      <div style={{position: 'relative', height: '80vh', width: '30vw'}}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior='smooth'
              typingIndicator={typing ? <TypingIndicator content = 'ChatGPT is typing' /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder='Type your prompt here' onSend={handleSend}/>
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default App