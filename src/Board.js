import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 6, ncols = 6, chanceLightStartsOn = .5}) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    console.log("Creating Board")
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < nrows; y++) {
      let row = []
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn)
      }
      initialBoard.push(row)
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every((row) => row.every(cell => !cell))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
        console.log("Setting Board")
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const deepCopy = oldBoard.map(row => [...row])

      // TODO: in the copy, flip this cell and the cells around it

      flipCell(y,x,deepCopy)
      flipCell(y,x -1,deepCopy)
      flipCell(y, x + 1,deepCopy)
      flipCell(y-1, x, deepCopy);
      flipCell(y+1, x, deepCopy);

      return deepCopy


      // TODO: return the copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return <div>You Win!</div>
  }

  // TODO

  // make table board
  let tblBoard = []

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
        let position = `${y}-${x}`;
        row.push(
            <Cell
            key={position}
            isLit={board[y][x]}
            flipCellsAroundMe={() => {flipCellsAround(position)}}
            />
        )
    }
    tblBoard.push(<tr key={y}>{row}</tr>)
  }

  return (
    <table className="Board">
        <tbody>{tblBoard}</tbody>
    </table>
  )

  // TODO
}

export default Board;
