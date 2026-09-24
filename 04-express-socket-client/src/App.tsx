import {type ChangeEvent, useEffect, useState} from "react";
import {type JSX} from "react";
import {io} from "socket.io-client";

// Connect to the Node.js backend server
const socket = io("http://localhost:4000");

const App = () => {

    const [username, setUsername] = useState<string>(""); //Storing the current user's input name
    const [userData, setUserData] = useState<string[]>([]); //Maintaining the list of all active registered users
    const [chatUser, setChatUser] = useState<string>(""); //Tracking the selected recipient for private messaging
    const [message, setMessage] = useState<string>(""); //Storing the current message being typed
    const [chat, setChat] = useState<string[]>([]); //Maintaining the local chat history

    useEffect(() => {
        // Listener for generic incoming messages from the server
        socket.on("message", (data) => {
            console.log(data);
        })

        // Listener for active user list updates
        socket.on("chatUser", (userData: string[]): void => {
            setUserData(userData);
        })

        // Listener for incoming private chat messages
        socket.on("chat", (chatData: { msg: string, member: string }): void => {
            if (chatUser !== chatData.member) {
                // setChat([])
                setChatUser(chatData.member)
            }
            // Append the newly received message to the existing chat history
            setChat(pre => [...pre, chatData.msg])
        })

        // Cleanup function to remove all active listeners when the component unmounts
        return () => {
            socket.removeAllListeners()
        }
    }, [])
    return (<div>
        <div>
            <p>Chat Register</p>
            {/* Capture user input for registration */}
            <input placeholder="Enter Your Name"
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
            {/* Emit registration event with the entered username */}
            <button onClick={() => socket.emit("userNameRegister", username)}>Register</button>
        </div>
        <div>
            <p>Chat</p>
            {/* Dropdown to select the target recipient for messages */}
            <select value={chatUser ? chatUser : undefined} onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setChatUser(e.target.value);
            }}>
                {/* Dynamically render option tags for each registered user */}
                {userData?.map((user: string): JSX.Element => <option key={user} value={user}>{user}</option>)}
            </select>
            <div>
                {/* Render the chat history */}
                {chat?.map((chat: string, i: number): JSX.Element => <p key={i}>{chat}</p>)}
            </div>
            {/*Capture the chat message input */}
            <input placeholder="Enter Message" value={message} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setMessage(e.target.value)
            }}/>
            <button onClick={() => {
                // Emit the private message containing the text and the recipient's name
                socket.emit("message", {message, chatUser})
                // Optimistically update the local chat UI with the send message
                setChat(pre => [...pre, message])
            }}>Send Message
            </button>
        </div>
    </div>)
}


export default App;