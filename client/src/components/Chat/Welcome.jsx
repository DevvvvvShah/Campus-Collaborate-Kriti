import React from 'react';
import styled from 'styled-components';
import Robot from '../../assets/robot.gif';

export default function Welcome({currentUser}) {
  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome <span>{currentUser.name}!</span>
      </h1>
      <h3>
        Please select a chat to start messaging!
      </h3>
    </Container>
  )
}

const Container = styled.div`
margin-left: 25vw;
width: 75vw;
display: flex;
background-color: #f8f8f8;
justify-content: center;
align-items: center;
color: black;
flex-direction: column;
img {
  height: 20rem;
}
span {
  color: #4e0eff;
}
`;
