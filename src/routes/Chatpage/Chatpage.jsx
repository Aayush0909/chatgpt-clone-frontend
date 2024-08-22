import React from 'react'
import "./chatPage.css"
import NewPrompt from '../../components/chatList/newPrompt/NewPrompt';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import { IKImage } from 'imagekitio-react';

const Chatpage = () => {
  
const path = useLocation().pathname;
const chatId = path.split("/").pop() // used to get chat id from the url


  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`,{
        credentials: "include",
      }).then((res) =>res.json(),
      ),
  });

  

  return (
    <div className='chatPage'>
      <div className="wrapper">
        <div className="chat">
          {isPending ? "Loading..." : error ? "Something went wrong" : data?.history?.map((message ,i)=>(
            <>
              {message.img && (
                <IKImage
                 urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT } 
                 path={message.img}
                  height="300" 
                  width="400"
                  transformation={[{height: 300, width: 400}]}
                  loading='lazy'
                  lqip={{active: true, quality: 20}}
                  />
              )}
          <div className={message.role === "user"? "message user" : "message"} 
          key={i}  
          >
            <Markdown>{message.parts[0].text}</Markdown>  
            {/* turn ai msg into readable form, parts is chat attribute */}
          </div>
          </>
          ))}
          
          {data && <NewPrompt data={data}/>}
         
        </div>
      </div>
    </div>
  )
}

export default Chatpage