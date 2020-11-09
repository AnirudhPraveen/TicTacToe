import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: any[];
  xIsNext: boolean;
  winner: string;

  constructor() { }
  
  // Life-cycle hook: To setup initial values when game starts
  ngOnInit() {
    this.newGame();
  }

  // Initializing all values
  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  // To determine which player is next
  // If xIsNext is true then X or else O
  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  // Event handler method (Event = click)
  makeMove(idx: number) {
    // If the index is null in square i.e not clicked,
    // then at that index put in the current player
    // Then change the player (toggle the player)
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  // Function to calculate winner by 
  // checking for winning combinations
  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // If winning combinations have the same
      // player (X or O) then return that player
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] && 
        this.squares[a] === this.squares[c] 
      ){
        return this.squares[a];
      }
    }
    return null;
  }

}
