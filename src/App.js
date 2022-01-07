import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import {
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

export default function App() {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
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

  return (
    <Container maxWidth="sm">
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
      <Grid container direction="column" justifyContent="space-between">
        <Grid item>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  {players.map((name) => (
                    <TableCell padding="none">{name}</TableCell>
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
                          <TableCell padding="none" style={style}>
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
                      <TableCell padding="none">
                        <TextField
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
                                  .querySelector(
                                    `.score-input-${index + 1} input`
                                  )
                                  .focus();
                              }
                            }
                          }}
                          inputProps={{
                            style: {
                              "-moz-appearance": "textfield",
                              "-webkit-appearance": "textfield",
                            },
                          }}
                          {...(index === 0 && { autoFocus: true })}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                )}
                {rounds.length > 0 && (
                  <TableRow style={{ borderTop: "3px double black" }}>
                    {totals.map((score) => (
                      <TableCell padding="none" style={{ fontWeight: "bold" }}>
                        {score}
                      </TableCell>
                    ))}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item container justifyContent="space-between">
          <Grid item>
            <Fab
              color={"secondary"}
              size="medium"
              style={{ marginTop: 20 }}
              onClick={() => {
                setConfirmDialogOpen(true);
              }}
            >
              <DeleteForeverIcon />
            </Fab>
          </Grid>
          <Grid item>
            {scoreEntry && (
              <Fab
                color={"primary"}
                size="medium"
                style={{ marginTop: 20, marginRight: 10 }}
                onClick={() => {
                  if (!newScores.includes(null)) {
                    setRounds([...rounds, newScores]);
                    setNewScores(players.map((name) => null));
                    setScoreEntry(false);
                  }
                }}
              >
                <SaveIcon />
              </Fab>
            )}
            <Fab
              color={scoreEntry ? "secondary" : "primary"}
              size="medium"
              style={{ marginTop: 20 }}
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
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
