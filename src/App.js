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
      // possibleMoves: [],
      // turn: 0,
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

  rollDice() {
    this.setState({
      dice: Math.ceil(Math.random() * (7 - 1)),
      diceRolled: true
    })

    if (this.state.dice === 6) {
    }
  }

  getStartCell(piece, board) {
    // starterBlack = this.state.board[10][4];
    // starterRed = this.state.board[6][10];
    // starterYellow = this.state.board[4][0];
    // starterGreen = this.state.board[0][6];
    
    if (piece.includes('Black')) {
      return board[10][4];
    }

    if (piece.includes('Red')) {
      return board[6][10];
    }

    if (piece.includes('Yellow')) {
      return board[4][0];
    }

    if (piece.includes('Green')) {
      return board[0][6];
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
                      value.map((val, ind) => <td key={ind} onClick={() => console.log(val)} className={
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
