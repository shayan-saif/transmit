import React from "react";
import { EVENT } from "@/types/events";
import { Divider, Tooltip, Paper, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Message as IMessage } from "@/types/message";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type Props = {
  message: IMessage;
  currentUser: boolean;
};

export default function Message(props: Props) {
  const { user, text, metadata, timestamp } = props.message;
  const { currentUser } = props;

  function getRelativeDate(): string {
    const localTZ = new Date(timestamp);
    return dayjs(localTZ).fromNow();
  }

  switch (metadata) {
    case EVENT.userJoin:
      return (
        <Tooltip title={getRelativeDate()}>
          <Divider>
            {user.name} {text}
          </Divider>
        </Tooltip>
      );

    case EVENT.message:
      return (
        <div
          className="message"
          style={{
            justifyContent: currentUser ? "end" : "start",
          }}
        >
          <Tooltip title={getRelativeDate()}>
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
          </Tooltip>
        </div>
      );

    case EVENT.userLeft:
      return (
        <Tooltip title={getRelativeDate()}>
          <Divider>
            {user.name} {text}
          </Divider>
        </Tooltip>
      );

    default:
      <Typography>Error loading message ...</Typography>;
  }
}
