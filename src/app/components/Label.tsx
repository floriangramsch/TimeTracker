import { Box } from "@mui/material";
import { ReactNode } from "react";

interface LabelProps {
  children: ReactNode;
  secondary?: boolean;
}

export default function Label(props: LabelProps) {
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        justifyContent: "center",
        color: "black",
        backgroundColor: props.secondary ? "#40798C" : "#70A9A1",
        width: props.secondary ? "60%" : "80%",
        p: 1,
        py: 2,
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {props.children}
    </Box>
  );
}
