import React, { useContext } from "react";
import { SocketContext } from "@/contexts/socket";
import { EVENT } from "@/types/events";
import { Divider, Paper, Typography } from "@mui/material";

export default function Message({ message }) {
  const { user, text, metadata } = message;
  const { id: socketId } = useContext(SocketContext);

  switch (metadata) {
    case EVENT.userJoin:
      return (
        <Divider>
          {user.name} {text}
        </Divider>
      );

    case EVENT.message:
      return (
        <div
          style={{
            display: "flex",
            justifyContent: user.id === socketId ? "end" : "start",
          }}
        >
          <Paper
            sx={{
              maxWidth: "35%",
              padding: "0.5rem 1rem",
            }}
            elevation={2}
          >
            <Typography variant="h6" mb={1}>
              {user.name}
            </Typography>
            <Typography variant="body1">{text}</Typography>
          </Paper>
        </div>
      );

    case EVENT.userLeft:
      return (
        <Divider>
          {user.name} {text}
        </Divider>
      );

    default:
      <>Error!</>;
  }
}
