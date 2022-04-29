import React from "react";
import { EVENT } from "@/types/events";
import { Divider, Paper, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Message as IMessage } from "@/types/message";

type Props = {
  message: IMessage;
  currentUser: boolean;
};

export default function Message(props: Props) {
  const { user, text, metadata } = props.message;
  const { currentUser } = props;

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
          className="message"
          style={{
            justifyContent: currentUser ? "end" : "start",
          }}
        >
          <Paper
            sx={{
              maxWidth: "35%",
              padding: "0.5rem 1rem",
              backgroundColor: currentUser ? blue[700] : "white",
            }}
            elevation={2}
          >
            <Typography variant="h6" mb={1} color={currentUser && "white"}>
              {user.name}
            </Typography>
            <Typography variant="body1" color={currentUser && "white"}>
              {text}
            </Typography>
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
      <Typography>Error loading message ...</Typography>;
  }
}
