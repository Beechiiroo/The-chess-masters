import { useState } from 'react';
import { ChessSquare } from './ChessSquare';
import { ChessPiece, PieceType, PieceColor } from '../types/chess';
import { Crown, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Header */}
        <div className="text-center glass-effect rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-10 h-10 text-primary animate-chess-piece-float" />
            <h1 className="text-5xl font-bold font-playfair bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Jeu d'Échecs Royal
            </h1>
            <Crown className="w-10 h-10 text-primary animate-chess-piece-float" style={{ animationDelay: '1s' }} />
          </div>
          
          <div className="flex items-center justify-center gap-2 text-xl">
            <Sparkles className="w-6 h-6 text-primary" />
            <p className="font-medium">
              Tour des{' '}
              <span className={`font-bold ${currentPlayer === 'white' ? 'text-yellow-400' : 'text-purple-400'}`}>
                {currentPlayer === 'white' ? 'Blancs' : 'Noirs'}
              </span>
            </p>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
        </div>
        
        {/* Chess Board */}
        <div className="relative">
          <div className="grid grid-cols-8 gap-1 p-4 rounded-3xl glass-effect shadow-2xl animate-chess-board-glow">
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
          
          {/* Corner decorations */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full opacity-50 animate-pulse" />
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-primary rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
        
        {/* Instructions */}
        <div className="text-center glass-effect rounded-xl p-6 max-w-md shadow-xl">
          <p className="text-sm font-medium text-foreground/80 leading-relaxed">
            ✨ Cliquez sur une pièce pour la sélectionner, puis sur une case de destination pour la déplacer ✨
          </p>
        </div>
      </div>
    </div>
  );
};