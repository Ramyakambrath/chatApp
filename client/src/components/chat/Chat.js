import React from 'react';
import queryString from 'query-string';
import {useState,useEffect} from 'react'
import io from 'socket.io-client'
import Infobar from '../Infobar/Infobar'
import Messages from '../Messages/Messages'
import Input from '../Input/Input'


const Chat=({location})=>{

    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);
    const [users,setUsers]=useState('');

    const ENDPOINT='http://localhost:5000';
    let socket;

    useEffect(() => {
        const {name,room}=queryString.parse(location.search)

        socket=io.connect(ENDPOINT);
        setName(name);
        setRoom(room);

        socket.emit('join',{name,room},(error)=>{
         if(error)alert(error)})

        
    }, [ENDPOINT,location])

    useEffect(() => {
       socket.on('message',(message)=>{
           setMessages([...messages,message])
       })

       socket.on('roomData',({users})=>{
        setUsers(users)

       })

       return ()=>{
           socket.emit('disconnect');
           socket.off();
           
       }
        
    }, messages)

    const sendMessage=(e)=>{
        e.preventDefault();

        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''))
        }

    }
 
    return (
       <div className="outerContainer">
           <div className="container">
               <Infobar room={room}/>
               <Messages messages={messages} name={name}/>
               <Input  message={message} setMessage={setMessage} sendMessage={sendMessage}/>
           </div>
       </div>
    )
}

export default Chat