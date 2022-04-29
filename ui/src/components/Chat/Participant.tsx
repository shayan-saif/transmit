import React from "react";
import { Avatar, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

type Props = {
  name: string;
  currentUser: boolean;
};

export default function Participant(props: Props) {
  const { name, currentUser } = props;

  function getInitials(): string {
    return name.split("-").map(name => name[0]);
  }

  function getRandomColor(): string {
    const colors = [
      "rgb(183, 28, 28)",
      "rgb(136, 14, 79)",
      "rgb(74, 20, 140)",
      "rgb(49, 27, 146)",
      "rgb(26, 35, 126)",
      "rgb(13, 71, 161)",
      "rgb(1, 87, 155)",
      "rgb(0, 96, 100)",
      "rgb(0, 77, 64)",
      "rgb(27, 94, 32)",
      "rgb(255, 111, 0)",
    ];

    return colors[Math.floor(Math.random() * colors.length + 1)];
  }

  return (
    <div
    className="participant"
      style={{
        backgroundColor: currentUser && grey[300],
      }}
    >
      <Avatar sx={{ backgroundColor: getRandomColor() }}>
        {getInitials()}
      </Avatar>
      <Typography>{name}</Typography>
    </div>
  );
}
