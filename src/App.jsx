import { useState } from 'react'

function Square({value, onSquareClick}){

  // const [value, setValue] = useState(null)

  function handleClick(){
    setValue('X')
  }


  return <button className="square" onClick={onSquareClick}>{value}</button>
}

function Board({xIsNext, squares, onPlay}) {

  // const [xIsNext, setXIsNext] = useState(true)
  // const [squares, setSquares] = useState(Array(9).fill(null))



  const winner = calculateWinner(squares)
  let status;
  if (winner){
    status = "Winner: " + winner
  }else{
    status = "Next Player: " + (xIsNext ? "X" : "O")
  }

  function handleClick(i){

    if (squares[i] || calculateWinner(squares)){
      return
    }

    const nextSquares = squares.slice() //creates copy of 'squares' state array

    if (xIsNext){
      nextSquares[i] = "X"  
    }else{
      nextSquares[i] = "O"
    }
    onPlay(nextSquares)
    // setSquares(nextSquares)
    // setXIsNext(!xIsNext)
  }



  return (<>
    <div className="status">{status}</div>
    <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
    </div>

    <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
    </div>

    <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>
    
    </>)
  
}

function Game(){

  
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove)  
  }

  const moves = history.map((squares, move) => {

      let description;

      if (move > 0){
        description = "Go to move #" + move
      }else{
        description = "Go to game start"
      }

      // As a general rule, DO NOT ise the index (such as 'move') as the key,
      // but it's only okay in this scenario because moves will never be re-ordered, 
      // deleted, or inserted in the middle, so it’s safe to use the move index as a key.
      // Consider finding other ways to generate unique keys in other scenarios.

      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      )

  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function App(){
  return Game()
}

function calculateWinner(squares){
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ]

      for (let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ){
          return squares[a]
        }

      }

      return null
}




export default App