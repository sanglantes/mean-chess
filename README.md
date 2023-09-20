# meanChess
Discrete, dishonourable, and semi-automatic Lichess cheat engine. Especially optimized for blitz and bullet games.

## Install
* The code in `meanChess.js` is a Tampermonkey userscript. 
* `app.py` is a Flask server using `python-chess` for chess programming utilities. Run it using `python app.py`. Before doing so, run `pip install -r requirements.txt`. In `chess_server.py`, change `PATH_TO_STOCKFISH` to your local Stockfish engine.

## Usage
The control panel will present itself at the bottom of the page during a Lichess game. Follow the instructions given. meanChess does not work when playing anonymously.

## Depth recommendation
Based on time vs. best move trade-offs.
| Gamemode | Time |
| ------:| -----------:|
| Bullet       | 0.1 s |
| Blitz        | 1s |
| $\geq$ Rapid | 3s |

## Demo
![Lichess cheat demo](/demo/demo.png)
![Cheat control panel demo](/demo/cheat-console-demo.png)
