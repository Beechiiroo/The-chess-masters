import { ChessPiece } from '../types/chess';

interface ChessSquareProps {
  piece: ChessPiece | null;
  isDark: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const pieceSymbols: Record<string, string> = {
  'white_king': '♔',
  'white_queen': '♕',
  'white_rook': '♖',
  'white_bishop': '♗',
  'white_knight': '♘',
  'white_pawn': '♙',
  'black_king': '♚',
  'black_queen': '♛',
  'black_rook': '♜',
  'black_bishop': '♝',
  'black_knight': '♞',
  'black_pawn': '♟',
};

export const ChessSquare = ({ piece, isDark, isSelected, onClick }: ChessSquareProps) => {
  const getPieceSymbol = () => {
    if (!piece) return '';
    return pieceSymbols[`${piece.color}_${piece.type}`];
  };

  const squareClasses = `
    w-16 h-16 flex items-center justify-center cursor-pointer
    transition-all duration-200 relative
    ${isDark 
      ? 'bg-secondary hover:bg-secondary/80' 
      : 'bg-background hover:bg-muted'
    }
    ${isSelected 
      ? 'ring-4 ring-primary ring-opacity-60 bg-accent' 
      : ''
    }
    ${piece ? 'hover:scale-105' : ''}
  `;

  return (
    <div className={squareClasses} onClick={onClick}>
      {piece && (
        <span 
          className={`text-4xl select-none transition-transform duration-200 ${
            piece.color === 'white' ? 'text-foreground' : 'text-foreground'
          } ${isSelected ? 'scale-110' : ''}`}
        >
          {getPieceSymbol()}
        </span>
      )}
      {isSelected && (
        <div className="absolute inset-0 bg-primary/20 rounded-sm animate-pulse" />
      )}
    </div>
  );
};