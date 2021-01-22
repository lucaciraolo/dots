import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
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
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ClearIcon from "@material-ui/icons/Clear";
import { useStickyState } from "./hooks/useStickyState";

export default function App() {
  const players = ["Hugo", "Luca", "Cyrus", "Ravi", "Henry"];
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
      <Grid container direction="column" justify="space-between">
        <Grid item>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Round</TableCell>
                  {players.map((name) => (
                    <TableCell>{name}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rounds.map((round, roundNumber) => {
                  const worstScore = Math.max(...round);
                  return (
                    <TableRow key={roundNumber}>
                      <TableCell>#{roundNumber + 1}</TableCell>
                      {round.map((score) => {
                        const style = {};
                        if (score === worstScore) {
                          style["color"] = "red";
                        }
                        return <TableCell style={style}>{score}</TableCell>;
                      })}
                    </TableRow>
                  );
                })}

                {scoreEntry && (
                  <TableRow>
                    <TableCell>
                      <IconButton
                        style={{ color: "green" }}
                        onClick={() => {
                          if (!newScores.includes(null)) {
                            setRounds([...rounds, newScores]);
                            setNewScores(players.map((name) => null));
                            setScoreEntry(false);
                          }
                        }}
                      >
                        <SaveIcon />
                      </IconButton>
                    </TableCell>
                    {newScores.map((score, index) => (
                      <TableCell>
                        <TextField
                          style={{ maxWidth: "3rem" }}
                          value={score}
                          type="number"
                          onChange={(e) => {
                            const newNewScores = [...newScores];
                            newNewScores[index] = parseInt(e.target.value);
                            setNewScores(newNewScores);
                          }}
                          inputProps={index == 0 ? { autoFocus: true } : {}}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                )}
                {rounds.length > 0 && (
                  <TableRow style={{ borderTop: "3px double black" }}>
                    <TableCell style={{ fontWeight: "bold" }}>Totals</TableCell>
                    {totals.map((score) => (
                      <TableCell style={{ fontWeight: "bold" }}>
                        {score}
                      </TableCell>
                    ))}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item container justify="space-between">
          <Grid item>
            <Fab
              color={"secondary"}
              size="medium"
              style={{ marginTop: 20 }}
              onClick={() => {
                setRounds([]);
                setScoreEntry(false);
                setNewScores(players.map((name) => null));
              }}
            >
              <DeleteForeverIcon />
            </Fab>
          </Grid>
          <Grid item>
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
