python3 -m http.server
localhost:8000


The only real file that changes between puzzles is the single js file.
The only difference between the html files is which js file gets included.
I need to figure out a menu to select a puzzle. 


Piece state is stored in pieceSet arrays (global), and piece matrix (local).
Piece sets contian interchangable pieces (corners, edges ...)


// Things todo:
// Normal maps / lighting.
// Write a program to seach for moves that make minimal changes.
// Write a way to save macro moves.
// Write a way to apply macro moves relative to a face/view.
// Write a way to intuitively display macro moves:
//   Unchanged pieces are white.  Arrows to show permutation.
// Write a method to solve a puzzle using macro moves. (All down hill).
// Stop the rendering (tick) when nothing changes.


AI todo:
- Add two buttons

- Manually find moves that only changes as few pieces in a move set as possible.
- All pieces in the Move set must only permute with each other.
- Write a function that uses Move/Sequence arguments to contruct powerful moves.
- Write a function to expand moves through symmetry
- Write a move equality function.
- Save moves in a set.
- Print move set to generate js file.
- write an objective function.
- Write greedy search to solve puzzles.


AI:
- I need to compare two states for equality. This would be for finding moves. And expanding moves with symmetry.
  - Each puzzle (Cube2x2.js) keeps one or more PieceSets and Moves
  - PieceSet.Pieces gets permuted by a move.  Pieces matrixes get updated for rendering.
  - Each piece has an id which is unique in any one PieceSet.
  - We will have to use the piece matrix to get the orientation state. Use an epsilon to handle float comparisons.



- Can We make location/translation state local or rotation global?
  - Move needs to index pieces by location
  - Rotation is entangled with location.
- Simplify state of pieces (rotation as integer state.
  - Matrix only used for rendering.
  - Compute initial matrix from integer rotation states.
- Make a fast application of moves




