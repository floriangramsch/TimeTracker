"use client";

import { Pause, PlayArrow, Stop } from "@mui/icons-material";
import { Box } from "@mui/material";

type ControleButtonProps = {
  type: "Play" | "Pause" | "Stop" | "Time";
  onClick?: () => void;
  value?: number;
};

export default function ControleButton(props: ControleButtonProps) {
  return (
    <Box
      onClick={() => props.onClick && props.onClick()}
      sx={{
        bgcolor: "beige",
        m: 1,
        p: 1,
        borderRadius: "50%",
        color: "black",
        cursor: "pointer",
      }}
    >
      {props.type === "Play" && <PlayArrow sx={{ fontSize: 50 }} />}
      {props.type === "Pause" && <Pause sx={{ fontSize: 50 }} />}
      {props.type === "Stop" && <Stop sx={{ fontSize: 50 }} />}
      {props.type === "Time" && (
        <Box sx={{ fontSize: 20, px: 1 }}>{props.value}</Box>
      )}
    </Box>
  );
}
