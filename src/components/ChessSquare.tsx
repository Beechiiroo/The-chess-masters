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
    w-20 h-20 flex items-center justify-center cursor-pointer
    chess-square-3d relative overflow-hidden
    transition-all duration-300 ease-out
    ${isDark 
      ? 'bg-chess-dark hover:bg-chess-dark/80' 
      : 'bg-chess-light hover:bg-chess-light/80'
    }
    ${isSelected 
      ? 'ring-4 ring-chess-selected ring-opacity-80 bg-chess-selected/20 scale-105 shadow-2xl' 
      : 'hover:scale-102'
    }
    ${piece ? 'hover:shadow-lg' : ''}
    rounded-xl
  `;

  return (
    <div className={squareClasses} onClick={onClick}>
      {piece && (
        <>
          <span 
            className={`
              text-5xl select-none transition-all duration-300 relative z-10
              chess-piece-shadow font-bold
              ${piece.color === 'white' 
                ? 'text-yellow-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' 
                : 'text-gray-800 drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]'
              } 
              ${isSelected ? 'scale-110 animate-chess-piece-float' : 'hover:scale-105'}
            `}
          >
            {getPieceSymbol()}
          </span>
          
          {/* Piece glow effect */}
          <div className={`
            absolute inset-0 rounded-xl opacity-30
            ${piece.color === 'white' 
              ? 'bg-gradient-radial from-yellow-200/40 to-transparent' 
              : 'bg-gradient-radial from-purple-200/40 to-transparent'
            }
          `} />
        </>
      )}
      
      {/* Selection glow */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-chess-selected/30 to-chess-highlight/30 rounded-xl animate-pulse" />
      )}
      
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};