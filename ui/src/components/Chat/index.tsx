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
        <div className="layout-block">
          <Messages />
        </div>
        <div className="layout-block">
          <Participants />
        </div>
      </div>
      <div className="layout-block">
        <Controls />
      </div>
    </div>
  );
}
