import React from 'react'
import { Link } from 'react-router-dom'
import "./chatList.css"
import { useQuery } from '@tanstack/react-query'



const Chatlist = () => {


  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`,{
        credentials: "include",
      }).then((res) => res.json()),
  });



  return (
    <div className='chatList'>
      <span className='title'>DASHBOARD</span>
      <Link to="/dashboard">Create a new chat</Link>
      <Link to="/">Explore Genie AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className='title'>Recent Chats</span>
      <div className="list">
        {isPending 
        ? "Loading.." 
        : error 
        ? "Something went wrong" 
        : data?.map((chat)=>(
          <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
          {chat.title}</Link>
        ))}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png"/>
        <div className="texts">
            <span>Upgrade to Genie AI pro</span>
            <span>Access all features</span>
        </div>
      </div>
    </div>
  );
};

export default Chatlist;
