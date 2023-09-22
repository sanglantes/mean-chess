from flask import Flask, request
import chess, chess.engine

app = Flask(__name__)

def algebraic_to_fen(algebraic_notation):
    board = chess.Board()
    moves = algebraic_notation.split()

    for move in moves:
        board.push_san(move)

    return board.fen()

def get_best_move(fen, depth, discrete):
    board = chess.Board(fen)
    engine = chess.engine.SimpleEngine.popen_uci("PATH_TO_STOCKFISH")

    if not discrete:
        result = engine.play(board, chess.engine.Limit(time=depth))
        engine.quit()

        return result.move

    elif discrete:
        analyse = engine.analyse(board, chess.engine.Limit(time=depth), multipv=2)
        moves = [result["pv"][0].uci() for result in analyse]

        return moves

@app.route('/api', methods=['GET'])
def api():
    algebraic_notation = request.args.get("algebra")
    depth = request.args.get("depth")
    discrete = int(request.args.get("discrete"))

    best_move = get_best_move(algebraic_to_fen(algebraic_notation), float(depth), discrete)
    if not discrete:
        best_move = str(best_move)
        best_move = best_move[:2] + ' ' + best_move[2:]
        return best_move

    elif discrete:
        return best_move

if __name__ == "__main__":
    app.run()
