import {createServer} from "node:http";
import {Server, Socket} from "socket.io";

// Initialize the core HTTP server
const app = createServer();

// Attach Socket.io to the HTTP server with CORS configuration for the React client
const io = new Server(app, {
    cors: {
        origin: "http://localhost:5173",
    }
})

// Dictionary to map usernames to their respective active socket IDs
// Format: { "Kamal": "socket_id_abc123", "Nimal": "socket_id_xyz789" }
const userData: { [index: string]: string } = {}

// Event listener for new client connections
io.on("connection", (socket: Socket) => {
    console.log("Connection connected", socket.id);

    // Emit a welcome message specifically to the newly connected client
    socket.emit("message", "Hello");

    // Handle user registration and map username to their socket ID
    socket.on("userNameRegister", (username: string): void => {
        userData[username] = socket.id;

        // Broadcast the updated user list to all OTHER connected clients
        socket.broadcast.emit("chatUser", Object.keys(userData));
        // Emit the updated user list to the CURRENTLY registering client
        socket.emit("chatUser", Object.keys(userData));

    })

    // Handle routing of private messages between users
    socket.on("message", (data: { message: string, chatUser: string }): void => {
        // Retrieve the recipient's socket ID from the dictionary
        const recipients: string = userData[data.chatUser]

        if (recipients !== undefined) {
            let sender: string = ''

            // Reverse lookup: Find the sender's username by their socket ID
            Object.entries(userData).forEach(([key, value]: [string, string]): void => {
                if (value === socket.id) {
                    sender = key;
                }
            })
            // Route the message exclusively to the recipient's socket ID
            io.to(recipients).emit("chat", {msg: data.message, member: sender});
        }
    })

    // Handle client disconnection and cleanup memory
    socket.on("disconnect", () => {
        console.log("Connection disconnected", socket.id);

        // Find and remove the disconnected user's entry from the dictionary
        Object.keys(userData).forEach(([key, value]) => {
            if (value === socket.id) {
                delete userData[key]
            }
        })
    })
})

// Bind the server to listen on port 4000
app.listen(4000);