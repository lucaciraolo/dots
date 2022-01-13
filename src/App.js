import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Fab,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ClearIcon from "@mui/icons-material/Clear";
import { useStickyState } from "./hooks/useStickyState";
import { ConfirmDialog } from "./ConfirmDialog";
import Person from "@mui/icons-material/Person";
import { PlayersDialog } from "./PlayersDialog";

export default function App() {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [playersDialogOpen, setPlayersDialogOpen] = useState(false);
  const [players, setPlayers] = useStickyState(
    ["Hugo", "Luca", "Cyrus", "Henry"],
    "players"
  );
  const [rounds, setRounds] = useStickyState([], "rounds");

  const [newScores, setNewScores] = useStickyState(
    players.map((name) => null),
    "newScores"
  );
  const [scoreEntry, setScoreEntry] = useStickyState(false, "scoreEntry");

  const [totals, setTotals] = useStickyState(
    players.map((name) => 0),
    "totals"
  );

  useEffect(() => {
    const sums = players.map((name) => 0);
    rounds.forEach((round) => {
      round.forEach((score, index) => {
        sums[index] += score;
      });
    });
    setTotals(sums);
    return () => {};
  }, [rounds]);

  const saveNewScores = () => {
    if (!newScores.includes(null)) {
      setRounds([...rounds, newScores]);
      setNewScores(players.map((name) => null));
      setScoreEntry(false);
    }
  };

  const tableCellPadding = players.length > 4 ? "none" : "normal";
  const maxWidth = players.length > 6 ? "sm" : "xs";

  return (
    <>
      <Container
        style={{ height: "80vh", overflowX: "auto" }}
        maxWidth={maxWidth}
      >
        <Table
          aria-label="simple table"
          size="small"
          style={{ align: "center" }}
          padding={tableCellPadding}
        >
          <TableHead>
            <TableRow>
              {players.map((name) => (
                <TableCell align="center">{name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rounds.map((round, roundNumber) => {
              const worstScore = Math.max(...round);
              return (
                <TableRow key={roundNumber}>
                  {round.map((score) => {
                    const style = {};
                    if (score === worstScore) {
                      style["color"] = "red";
                    }
                    return (
                      <TableCell align="center" style={style}>
                        {score}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}

            {scoreEntry && (
              <TableRow>
                {newScores.map((score, index) => (
                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      className={`score-input-${index}`}
                      style={{ maxWidth: "3rem" }}
                      value={score}
                      type="number"
                      onChange={(e) => {
                        const newNewScores = [...newScores];
                        newNewScores[index] = parseInt(e.target.value);
                        setNewScores(newNewScores);
                      }}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          if (index !== players.length - 1) {
                            document
                              .querySelector(`.score-input-${index + 1} input`)
                              .focus();
                          } else {
                            saveNewScores();
                          }
                        }
                      }}
                      inputProps={{
                        style: {
                          appearance: "textfield",
                        },
                      }}
                      {...(index === 0 && { autoFocus: true })}
                    />
                  </TableCell>
                ))}
              </TableRow>
            )}
            {rounds.length > 0 && (
              <TableRow style={{ borderTop: "3px double rgba(81, 81, 81, 1)" }}>
                {totals.map((score) => (
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    {score}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Container>

      <Grid
        container
        justifyContent="space-between"
        padding={1}
        style={{ bottom: 0, position: "absolute" }}
      >
        <Grid item>
          <Fab
            color={"secondary"}
            size="medium"
            onClick={() => {
              setConfirmDialogOpen(true);
            }}
          >
            <DeleteForeverIcon />
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            color={"default"}
            size="medium"
            onClick={() => {
              setPlayersDialogOpen(true);
            }}
          >
            <Person />
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            color={scoreEntry ? "secondary" : "primary"}
            size="medium"
            onClick={() => {
              if (!scoreEntry) {
                setScoreEntry(true);
              } else {
                setNewScores(players.map((name) => null));
                setScoreEntry(false);
              }
            }}
          >
            {scoreEntry ? <ClearIcon /> : <AddIcon />}
          </Fab>
          {scoreEntry && (
            <Fab color={"primary"} size="medium" onClick={saveNewScores}>
              <SaveIcon />
            </Fab>
          )}
        </Grid>
      </Grid>

      <ConfirmDialog
        open={confirmDialogOpen}
        setOpen={setConfirmDialogOpen}
        confirmHandler={() => {
          setRounds([]);
          setScoreEntry(false);
          setNewScores(players.map((name) => null));
          setConfirmDialogOpen(false);
        }}
      />

      <PlayersDialog
        open={playersDialogOpen}
        setOpen={setPlayersDialogOpen}
        players={players}
        savePlayers={(newPlayers) => {
          setRounds([]);
          setScoreEntry(false);
          setNewScores(newPlayers.map((name) => null));
          setPlayers(newPlayers);
          setPlayersDialogOpen(false);
        }}
      />
    </>
  );
}
