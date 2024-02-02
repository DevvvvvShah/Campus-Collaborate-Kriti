import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client'

function Chat() {
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  localStorage.clear();
  useEffect(() => {
    (async () => {  
      if (!localStorage.getItem('chat-app-user')) {
        try{
        await axios.get(allUsersRoute,
          {
            withCredentials: true,
          })
        .then((res) => {
          setUsers(res.data);
          const randomUser = res.data[Math.floor(Math.random() * res.data.length)];
          localStorage.setItem('chat-app-user', JSON.stringify(randomUser));
          setCurrentUser(randomUser);
          console.log(randomUser);
          setIsLoaded(true);
        });}catch(err){
          console.log(err);
        }
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
        setIsLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if(currentUser){
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
      console.log(currentUser._id);
    }
  })

  // useEffect(() => {
  //   (async () => {
  //     if (currentUser) {
  //       if (currentUser.isAvatarImageSet) {
  //         try {
  //           const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //           setContacts(data.data);
  //           console.log(data.data);
  //         } catch (error) {
  //           console.log('here')
  //           console.error('Error fetching user data:', error);
  //         }
  //       } else {
  //         // navigate('/setAvatar');
  //       }
  //     }
  //   })();
  // });
  
  const handleChatChange = (chat) => {
    setCurrentChat(chat); 
  }

  return (
    <Container>
      <div className="container">
        <Contacts contacts={users} currentUser={currentUser} changeChat={handleChatChange}/>{
          isLoaded && currentChat === undefined ? <Welcome currentUser={currentUser}/> : (<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>)
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.container {
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
}
`;

export default Chat;
