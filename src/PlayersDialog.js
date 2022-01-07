import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const PlayersDialog = ({ open, setOpen, players, savePlayers }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
  };

  const [newPlayers, setNewPlayers] = React.useState(players.join("\n"));

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
      <DialogTitle>Edit Players</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <TextField
            multiline
            value={newPlayers}
            onChange={(event) => setNewPlayers(event.target.value)}
          ></TextField>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            savePlayers(
              newPlayers
                .split("\n")
                .map((name) => name.trim())
                .filter((name) => name.length > 0)
            );
          }}
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
