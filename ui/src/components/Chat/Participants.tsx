import React, { useContext, useEffect, useState } from "react";
import {
  Divider,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { SocketContext } from "@/contexts/socket";
import { getParticipants } from "@/http";
import { EVENT } from "@/types/events";

type Props = {};

export default function Participants({}: Props) {
  const [people, setPeople] = useState([]);

  const socket = useContext(SocketContext);
  async function updateParticipants() {
    const { data: participants } = await getParticipants();
    setPeople(participants);
  }

  useEffect(() => {
    updateParticipants();

    socket.on(EVENT.userJoin, () => {
      updateParticipants();
    });

    socket.on(EVENT.userLeft, () => {
      updateParticipants();
    });

    return () => {
      socket.off(EVENT.userJoin);
      socket.off(EVENT.userLeft);
    };
  }, []);

  return (
    <div>
      <Typography variant="h6" textAlign="center" mt={-1}>
        Connected
      </Typography>
      <Divider />
      {people.map(person => {
        return (
          <ListItemButton key={person.id} component="a">
            <ListItemText primary={person.name} />
          </ListItemButton>
        );
      })}
    </div>
  );
}
