import React, { useEffect ,useState} from 'react';
import classes from "./Chatwindow.module.css"
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:8000/");
const Chatwindow = () =>{
  const[message , setMessage] =useState("");
  const[chat , setChat] = useState([]);
  const[name , setName] = useState('Manas');

  useEffect(()=>{
    socket.on("chat",(payload)=>{
      const temp = [payload];
      setChat(chat.concat(temp));
    })
  })
  const updateMessage = (e) =>{
    const  value  = e.target.value;
    setMessage(value);
  }

  const sendMessage = (e) =>{
    e.preventDefault();
    socket.emit("chat" , {name,message});
    setMessage('');
  }
  useEffect(()=>{
    const name = prompt("enter your name ");
    setName(name);
  },[])
  
  const renderChat = chat.map((payload, index)=>{
      if (name === payload.name)
       { return (
          <div key={index} className={`${classes.incoming} ${classes.message}`}>
            <h4>{payload.name}</h4>
            <p>{payload.message}</p>
          </div>
        );
       }
       else{
         return (
           <div
             key={index}
             className={`${classes.outgoing} ${classes.message}`}
           >
             <h4>{payload.name}</h4>
             <p>{payload.message}</p>
           </div>
         );
       }
  })
    return (
      <div>
        <section className={classes.chat__section}>
          <div className={classes.brand}>
            <img src="https://raw.githubusercontent.com/codersgyan/realtime-chat-app/master/public/wassup.png" alt="logo" height ='60px' width ='60px'></img>
            <h1>Wassup</h1>
          </div>
          <div className={classes.message_area}>
            {renderChat}
          </div>
          <div>
            <form onSubmit={sendMessage}>
            <textarea
              id="textarea"
              cols="30"
              row="1"
              name='message'
              value={message}
              placeholder="write a message "
              onChange={updateMessage}
            ></textarea>
            <button type='submit'>submit</button>
            </form>
          </div>
        </section>
      </div>
    );
}

export default Chatwindow  ;
