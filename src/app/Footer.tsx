import { Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { AccessTime, CalendarMonth } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        justifyContent: "center",
        bottom: 0,
        w: "100%",
        borderTop: "solid 4px #3C277A",
        pb: 4,
        pt: 2,
        gap: 3
      }}
    >
      <CalendarMonth sx={{ fontSize: 40 }} />
      <HomeIcon sx={{ fontSize: 40 }} />
      <AccessTime sx={{ fontSize: 40 }} />
    </Box>
  );
}
