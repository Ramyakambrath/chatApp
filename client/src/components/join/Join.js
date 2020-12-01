import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import './join.css'

const Join=()=>{

    const [name, setName]=useState('');
    const [room, setRoom]=useState('')

    return (
 
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
            <h1 className="heading">Join</h1>
            <div>
            <input type="text" className="name" placeholder='Enter your name' onChange={(e)=> setName(e.target.value)}/>
            </div>
           <div>
             <input type="text" className="room" placeholder='Enter room' onChange={(e)=>setRoom(e.target.value)}/>
           </div>
          
            <Link onClick={(e)=> (!name || !room) ? e.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
               <button className='mt-20' type ='submit' >Join</button>
            </Link>     
            </div>
        </div>

    )
}

export default Join