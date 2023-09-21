# meanChess
Discrete, dishonourable, and semi-automatic Lichess cheat engine. Especially optimized for blitz and bullet games.

## Install
* The code in `meanChess.js` is a Tampermonkey userscript. 
* `chess_server.py` is a Flask server using `python-chess` for chess programming utilities. Run it using `python chess_server.py`. Before doing so, run `pip install -r requirements.txt`. Change `PATH_TO_STOCKFISH` to your local Stockfish engine.

## Usage
The control panel will present itself at the bottom of the page during a Lichess game. Follow the instructions given. <b>meanChess</b> does not work when playing anonymously.

## Bugs
1. May stop working when making many premoves in succession. Solution: Press "Stop" followed by "Start Cheat", alternatively, get gud.
2. Arrows may not have arrowheads. Solution: Draw an arrow.

## Depth recommendation
Based on time vs. best move trade-offs.
| Gamemode | Time |
| ------:| -----------:|
| Bullet       | 0.05 s |
| Blitz        | 1 s |
| $\geq$ Rapid | +3 s |

## Demo
![Lichess cheat demo](/demo/demo.png)
![Cheat control panel demo](/demo/cheat-console-demo.png)
