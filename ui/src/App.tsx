import "./App.css";
import Chat from "@/components/Chat";
import { socket, SocketContext } from "./contexts/socket";

function App() {
  return (
    <div className="app container">
      <SocketContext.Provider value={socket}>
        <Chat />
      </SocketContext.Provider>

    </div>
  );
}

export default App;
