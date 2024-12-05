import { ButtonBase, Typography, Box, Chip } from "@mui/material";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

interface LastRequestProps {
  requestNumber: string;
  requestDate: string;
  state: string;
  priority: string;
}

export default function BtnRequest({  requestNumber,  requestDate,  state,  priority,}: LastRequestProps) {
  const getPriorityColor = (state: string) => {
    switch (state) {
      case "media":
        return "#FFD426";
      case "baja":
        return "#34D186";
      case "alta":
        return "#EF5060";
      default:
        return "#BDBDBD";
    }
  };

  return (
    <ButtonBase
      sx={{
        width: "100%",
        borderRadius: 2,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginY: 0.5,
        height: 70,
        overflow: "hidden",
        boxShadow: 1,
      }}
    >
      <Box
        sx={{
          width: 10,
          height: "100%",
          backgroundColor: getPriorityColor(priority),
        }}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: 2,
          gap: 0.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            fontSize={16}
            textAlign={"left"}
            color="text.primary"
            noWrap
          >
            {requestNumber}
          </Typography>
          <Chip
            variant="filled"
            size="small"
            label={state}
            sx={{
              textTransform: "capitalize",
              marginLeft: 2,
              color:
                state === "devuelto"
                  ? "#EF5060"
                  : state === "corregido"
                  ? "#FFD426"
                  : "#34D186",
              backgroundColor:
                state === "devuelto"
                  ? "#FFE1DF"
                  : state === "corregido"
                  ? "#FFF6D4"
                  : "#D6F6E7",
            }}
          />
        </Box>
        <Typography
          variant="body2"
          fontSize={14}
          textAlign={"left"}
          color="text.secondary"
          noWrap
        >
          {requestDate}
        </Typography>
      </Box>

      <KeyboardArrowRightRoundedIcon
        fontSize="large"
        sx={{ color: "text.secondary", marginRight: 1 }}
      />
    </ButtonBase>
  );
}
