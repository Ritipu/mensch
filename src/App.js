import React from 'react';
import './css/App.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: { name: 'Ricardo', piece: 'Black', icon: '/black-pawn.png' }, // piece and icon are dynamic, loading screen you choose color
      board: [
        ['homeYellow', 'homeYellow', 'null', 'null', '', '', 'startGreen', 'null', 'null', 'homeGreen', 'homeGreen'],
        ['homeYellow', 'homeYellow', 'null', 'null', '', 'finishGreen1', '', 'null', 'null', 'homeGreen', 'homeGreen'],
        ['null', 'null', 'null', 'null', '', 'finishGreen2', '', 'null', 'null', 'null', 'null'],
        ['null', 'null', 'null', 'null', '', 'finishGreen3', '', 'null', 'null', 'null', 'null'],
        ['startYellow', '', '', '', '', 'finishGreen4', '', '', '', '', ''],
        ['', 'finishYellow1', 'finishYellow2', 'finishYellow3', 'finishYellow4', 'null', 'finishRed4', 'finishRed3', 'finishRed2', 'finishRed1', ''],
        ['', '', '', '', '', 'finishBlack4', '', '', '', '', 'startRed'],
        ['null', 'null', 'null', 'null', '', 'finishBlack3', '', 'null', 'null', 'null', 'null'],
        ['null', 'null', 'null', 'null', '', 'finishBlack2', '', 'null', 'null', 'null', 'null'],
        ['homeBlack', 'homeBlack', 'null', 'null', '', 'finishBlack1', '', 'null', 'null', 'homeRed', 'homeRed'],
        ['homeBlack', 'homeBlack', 'null', 'null', 'startBlack', '', '', 'null', 'null', 'homeRed', 'homeRed']
      ],
      dice: 0,
      diceRolled: false,
      possibleMoves: [],
      playerPos: [],
      // turn: black / red / green / yellow,
    }
    this.rollDice = this.rollDice.bind(this);

  }

  componentDidMount() {
    this.setState({
      board: this.state.board.map((v) => {
        return (
          v.map((val) => {
            return this.searchCorrectPlayerHome(val)
          })
        )
      })
    })
  }

  getPossibleMoves(upperIndex, lowerIndex) {
    if ((upperIndex > 6 || upperIndex <= 4) && lowerIndex === 4) {
      const moveIndex = upperIndex - this.state.dice 
      return this.setState({
        possibleMoves: [moveIndex, lowerIndex],
        playerPos: [upperIndex, lowerIndex]
      })

    }
  }

  clickHandler(value, upperIndex, lowerIndex) {
    console.log(value)
    console.log(upperIndex, lowerIndex)

    const board = this.state.board;

    if (value === `${this.state.player.piece}${this.state.player.name}`) {
      // getPossibleMoves
      this.getPossibleMoves(upperIndex, lowerIndex)
    }

    if (this.state.possibleMoves[0] === upperIndex && this.state.possibleMoves[1] === lowerIndex) {
      board[upperIndex][lowerIndex] = `${this.state.player.piece}${this.state.player.name}`
      board[this.state.playerPos[0]][this.state.playerPos[1]] = `start${this.state.player.piece}`
      this.setState({
        diceRolled: false
      })
    }

  }

  rollDice() {
    const dice = Math.ceil(Math.random() * (7 - 1))
    const startCell = this.getStartCell(`${this.state.player.piece}`)
    const homeCells = this.getHomeCells(`${this.state.player.piece}`)
    const board = this.state.board

    if (dice === 6) {
      // justino 27/07 => lacks the code to not remove pieces from the player if opponent is in start cell of player
      if (board[startCell[0]][startCell[1]] === `start${this.state.player.piece}`) {

        // remove piece automatically from home
        for (let i = 0; i < homeCells.length; i++) {
          let cells = homeCells[i];
  
          if (board[cells[0]][cells[1]] === `${this.state.player.piece}${this.state.player.name}`) {
            board[cells[0]][cells[1]] = `home${this.state.player.piece}`;
            break;
          }
        }

        // put piece in start position
        board[startCell[0]][startCell[1]] = `${this.state.player.piece}${this.state.player.name}`
      }
    }

    this.setState({
      dice: dice,
      // diceRolled: true
    })

  }



  getHomeCells(piece) {
    // homeBlack = this.state.board[[9, 0], [9, 1], [10, 0], [10, 1]];
    // homeRed = this.state.board[[9, 9], [9, 10], [10, 9], [10, 10]];
    // homeYellow = this.state.board[[0, 0], [0, 1], [1, 0], [1, 1]];
    // homeGreen = this.state.board[[0, 9], [0, 10], [1, 9], [1, 10]];

    if (piece.includes('Black')) {
      const pos = [[9, 0], [9, 1], [10, 0], [10, 1]]
      return pos;
    }

    if (piece.includes('Red')) {
      const pos = [[9, 9], [9, 10], [10, 9], [10, 10]]
      return pos;
    }

    if (piece.includes('Yellow')) {
      const pos = [[0, 0], [0, 1], [1, 0], [1, 1]]
      return pos;
    }

    if (piece.includes('Green')) {
      const pos = [[0, 9], [0, 10], [1, 9], [1, 10]]
      return pos;
    }
  }

  getStartCell(piece) {
    // starterBlack = this.state.board[10][4];
    // starterRed = this.state.board[6][10];
    // starterYellow = this.state.board[4][0];
    // starterGreen = this.state.board[0][6];

    if (piece.includes('Black')) {
      const pos = [10, 4]
      return pos;
    }

    if (piece.includes('Red')) {
      const pos = [6, 10]
      return pos;
    }

    if (piece.includes('Yellow')) {
      const pos = [4, 0]
      return pos;
    }

    if (piece.includes('Green')) {
      const pos = [0, 6]
      return pos;
    }
  }

  searchCorrectPlayerHome(val) {
    if (val.includes(`home${this.state.player.piece}`)) {
      val = `${this.state.player.piece}${this.state.player.name}`
    }
    return val
  }

  formatStringInBoard(val) {

    if (val === 'null' || val.includes('home')) {
      val = ''
    }

    if (val.includes('start')) {
      val = 'A'
    }

    if (val.includes('finish')) {
      if (val.includes('1')) {
        val = 'a'
      }
      if (val.includes('2')) {
        val = 'b'
      }
      if (val.includes('3')) {
        val = 'c'
      }
      if (val.includes('4')) {
        val = 'd'
      }
    }

    if (val.includes(`${this.state.player.piece}${this.state.player.name}`)) {
      val = <img src={this.state.player.icon} alt="icon" height="30px" width="30px" />
    }

    return val
  }

  render() {
    return (
      <div className="App">
        <div className="sidebar">
          <div>
            <h1>Mensch argere Dich nicht!</h1>
            <p>Roll the Dice to start playing!</p>
            <h2>You rolled: {this.state.dice}</h2>
            <button disabled={this.state.diceRolled === true ? true : false} onClick={this.rollDice}>Roll Dice</button>
          </div>

          <div>
            <h1>Player: {this.state.player.name}</h1>
            <h2>Pieces: {this.state.player.piece}</h2>
          </div>
        </div>

        <table className="board">
          {
            this.state.board.map((value, index) => {
              return (
                <tbody key={index}>
                  <tr key={index} className="row">
                    {
                      value.map((val, ind) => <td key={ind} onClick={() => this.clickHandler(val, index, ind)} className={
                        val === 'null' ?
                          '' : val.includes('Black') ?
                            'cell-black' : val.includes('Green') ?
                              'cell-green' : val.includes('Yellow') ?
                                'cell-yellow' : val.includes('Red') ?
                                  'cell-red' : 'cell'
                      }>
                        {this.formatStringInBoard(val)}
                      </td>)
                    }
                  </tr>
                </tbody>
              )
            })
          }
        </table>
      </div>
    );
  }
}
