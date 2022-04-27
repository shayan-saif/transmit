import React from "react";
import Controls from "./Controls";
import Messages from "./Messages";
import Participants from "./Participants";
import "./styles.css";

type Props = {};

export default function Chat({}: Props) {
  return (
    <div className="layout">
      <div className="chat-display">
        <div style={{ padding: "1rem", backgroundColor: "moccasin" }}>
          <Messages />
        </div>
        <div style={{ padding: "1rem", backgroundColor: "moccasin" }}>
          <Participants />
        </div>
      </div>
      <div style={{ padding: "1rem", backgroundColor: "moccasin" }}>
        <Controls />
      </div>
    </div>
  );
}
