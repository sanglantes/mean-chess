# meanChess
Discrete, dishonourable, automatic, and anti-bug-free Lichess cheat engine. Especially optimized for blitz and bullet games.

## Installing
* The code in `meanChess.js` is a Tampermonkey/Greasemonkey userscript. 
* `app.py` is a Flask server using `python-chess` for chess programming utilities. Run it using `python app.py`. Before doing so, run `pip install -r requirements.txt`. In `app.py`, change `PATH_TO_STOCKFISH` to your local Stockfish engine.

## Usage
The control panel will present itself at the bottom of the page during a Lichess game. Follow the instructions given.

Expect bugs, lots of them.

## Demo
![Lichess cheat demo](/img/demo.png)
