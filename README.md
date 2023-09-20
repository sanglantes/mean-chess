# meanChess
Discrete, dishonourable, semi-automatic, and anti-bug-free Lichess cheat engine. Especially optimized for blitz and bullet games.

## Install
* The code in `meanChess.js` is a Tampermonkey userscript. 
* `app.py` is a Flask server using `python-chess` for chess programming utilities. Run it using `python app.py`. Before doing so, run `pip install -r requirements.txt`. In `app.py`, change `PATH_TO_STOCKFISH` to your local Stockfish engine.

## Usage
The control panel will present itself at the bottom of the page during a Lichess game. Follow the instructions given at the bottom of the game page.

Expect bugs.

## Depth recommendation
Based on playability vs. best move trade-offs.
* Bullet: 0.1s
* Blitz: 1s
* $\geq$ Rapid: 3s

## Demo
![Lichess cheat demo](/demo/demo.png)
