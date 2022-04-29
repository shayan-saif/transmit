import React, { useContext } from "react";
import { Button, TextField } from "@mui/material";
import "./styles.css";
import { SocketContext } from "@/contexts/socket";
import { EVENT } from "@/types/events";
import { useForm } from "@mantine/hooks";

type Props = {};

export default function Controls({}: Props) {
  const form = useForm({
    initialValues: {
      message: "",
    },
    validationRules: {
      message: value => value.trim() !== "",
    },
  });

  const socket = useContext(SocketContext);

  function sendMessage(values: { message: string }) {
    socket.emit(EVENT.message, values.message);
    form.reset();
  }

  return (
    <form className="chat-controls" onSubmit={form.onSubmit(sendMessage)}>
      <TextField
        id="outlined-basic"
        label="Message"
        variant="outlined"
        inputProps={{ ...form.getInputProps("message") }}
      />
      <Button variant="contained" sx={{ padding: "0 2rem" }} type="submit">
        Send
      </Button>
    </form>
  );
}
