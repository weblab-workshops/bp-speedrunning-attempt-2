import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";

import Message from "../modules/Message";
import NewMessage from "../modules/NewMessage";

import { get, post } from "../../utilities";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "896035712378-cb6un4h1ctr03d8cm5gqj2f0thhgjppg.apps.googleusercontent.com";

const HelloPage = ({ userId, handleLogin, handleLogout }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    get("/api/messages").then((messageObjs) => {
      setMessages(messageObjs);
    });

    setInterval(() => {
      get("/api/messages").then((messageObjs) => {
        setMessages(messageObjs);
      });
    }, 2000);
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {userId ? (
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
      )}

      <div>Hello world</div>
      <NewMessage />
      <div>
        {messages.map((messageObj) => {
          return <Message name={messageObj.name} content={messageObj.content} />;
        })}
      </div>
    </GoogleOAuthProvider>
  );
};

export default HelloPage;
