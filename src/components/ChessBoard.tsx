import { useState } from 'react';
import { ChessSquare } from './ChessSquare';
import { ChessPiece, PieceType, PieceColor } from '../types/chess';

const initialBoard: (ChessPiece | null)[][] = [
  [
    { type: 'rook', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'queen', color: 'black' },
    { type: 'king', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'rook', color: 'black' }
  ],
  Array(8).fill(null).map(() => ({ type: 'pawn', color: 'black' })),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null).map(() => ({ type: 'pawn', color: 'white' })),
  [
    { type: 'rook', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'queen', color: 'white' },
    { type: 'king', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'rook', color: 'white' }
  ]
];

export const ChessBoard = () => {
  const [board, setBoard] = useState<(ChessPiece | null)[][]>(initialBoard);
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white');

  const handleSquareClick = (row: number, col: number) => {
    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;
      const selectedPiece = board[selectedRow][selectedCol];
      
      // Si on clique sur la même case, on désélectionne
      if (selectedRow === row && selectedCol === col) {
        setSelectedSquare(null);
        return;
      }
      
      // Si on a une pièce sélectionnée et qu'elle appartient au joueur actuel
      if (selectedPiece && selectedPiece.color === currentPlayer) {
        // Créer une nouvelle board avec le mouvement
        const newBoard = board.map(row => [...row]);
        newBoard[row][col] = selectedPiece;
        newBoard[selectedRow][selectedCol] = null;
        
        setBoard(newBoard);
        setSelectedSquare(null);
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
      }
    } else {
      // Sélectionner une pièce si elle appartient au joueur actuel
      const piece = board[row][col];
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare([row, col]);
      }
    }
  };

  const isSquareSelected = (row: number, col: number) => {
    return selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
  };

  const isSquareDark = (row: number, col: number) => {
    return (row + col) % 2 === 1;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Jeu d'Échecs</h1>
        <p className="text-lg text-muted-foreground">
          Tour des {currentPlayer === 'white' ? 'Blancs' : 'Noirs'}
        </p>
      </div>
      
      <div className="grid grid-cols-8 gap-0 border-2 border-border rounded-lg overflow-hidden shadow-lg bg-card">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => (
            <ChessSquare
              key={`${rowIndex}-${colIndex}`}
              piece={piece}
              isDark={isSquareDark(rowIndex, colIndex)}
              isSelected={isSquareSelected(rowIndex, colIndex)}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      
      <div className="text-sm text-muted-foreground text-center max-w-md">
        Cliquez sur une pièce pour la sélectionner, puis cliquez sur une case de destination pour la déplacer.
      </div>
    </div>
  );
};