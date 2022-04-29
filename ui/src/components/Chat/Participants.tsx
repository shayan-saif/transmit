import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "@/contexts/socket";
import { getParticipants } from "@/http";
import { Divider, Typography } from "@mui/material";
import Participant from "./Participant";
import { EVENT } from "@/types/events";
import { User } from "@/types/user";

// Lodash
import _sortBy from "lodash/sortBy";

type Props = {};

export default function Participants({}: Props) {
  const [people, setPeople] = useState([]);

  const socket = useContext(SocketContext);

  async function updateParticipants(): Promise<void> {
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

  function getSortedParticipants(): User[] {
    return _sortBy(people, (person: User) => person.id !== socket.id);
  }

  return (
    <div>
      <Typography variant="h6" textAlign="center" mt={-1}>
        Connected
      </Typography>
      <Divider sx={{ margin: "0 0 1rem 0" }} />
      <div className="participant-list">
        {getSortedParticipants().map((person: User) => {
          return (
            <Participant
              key={person.id}
              name={person.name}
              currentUser={person.id === socket.id}
            />
          );
        })}
      </div>
    </div>
  );
}
