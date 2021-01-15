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
import ClearIcon from "@material-ui/icons/Clear";

export default function App() {
  const players = ["Hugo", "Luca", "Cyrus", "Ravi", "Henry"];
  const [scores, setScores] = useState([]);

  const [newScores, setNewScores] = useState(players.map((name) => null));
  const [scoreEntry, setScoreEntry] = useState(false);

  const [totals, setTotals] = useState(players.map((name) => 0));
  useEffect(() => {
    const sums = players.map((name) => 0);
    scores.forEach((round) => {
      round.forEach((score, index) => {
        sums[index] += score;
      });
    });
    setTotals(sums);
    return () => {};
  }, [scores]);

  return (
    <Container maxWidth="sm">
      <Grid container direction="column">
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
                {scores.map((row, roundNumber) => (
                  <TableRow key={roundNumber}>
                    <TableCell>#{roundNumber + 1}</TableCell>
                    {row.map((score) => (
                      <TableCell>{score}</TableCell>
                    ))}
                  </TableRow>
                ))}

                {scoreEntry && (
                  <TableRow>
                    <TableCell>
                      <IconButton
                        style={{ color: "green" }}
                        onClick={() => {
                          if (!newScores.includes(null)) {
                            setScores([...scores, newScores]);
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
                {scores.length > 0 && (
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
        <Grid item container justify="flex-end">
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
    </Container>
  );
}
