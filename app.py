from flask import Flask, request
import chess, chess.engine

app = Flask(__name__)

def algebraic_to_fen(algebraic_notation):
    board = chess.Board()
    moves = algebraic_notation.split()

    for move in moves:
        board.push_san(move)

    return board.fen()

def get_best_move(fen, depth):
    board = chess.Board(fen)
    engine = chess.engine.SimpleEngine.popen_uci("PATH_TO_STOCKFISH")
    result = engine.play(board, chess.engine.Limit(time=depth))
    engine.quit()

    return result.move

@app.route('/api', methods=['GET'])
def api():
	algebraic_notation = request.args.get("algebra")
	depth = request.args.get("depth")

	best_move = str(get_best_move(algebraic_to_fen(algebraic_notation), float(depth)))
	best_move = best_move[:2] + ' ' + best_move[2:]
	return best_move

if __name__ == "__main__":
	app.run()
