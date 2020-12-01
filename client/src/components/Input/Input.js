import React from 'react';


const Input=({message,setMessage,sendMessage})=>{

    const keyPress=(event)=>{
        if(event.key === 'Enter')
        sendMessage(event) 

    }

    const changeVal=(e)=>{

        setMessage(e.target.value)
    }

    return(
      <form className='form'>
        <input className='input' type='text' placeHolder='Typeing as message' value={message} onKeyPress={keyPress} onChange={changeVal}/>
     
        <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
      </form>
    )
}

export default Input