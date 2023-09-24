// ==UserScript==
// @name              Mean Chess
// @version           0.1
// @description       Dishonourable chess
// @author            toybot
// @connect	      127.0.0.1
// @match             https://lichess.org/*

// @grant GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
window.addEventListener("load", function() {
let lastMoveHistory;
let observer;

const tileCoordinates = {
	a1: { x: 3.5, y: -3.5 },
	a2: { x: 3.5, y: -2.5 },
	a3: { x: 3.5, y: -1.5 },
	a4: { x: 3.5, y: -0.5 },
	a5: { x: 3.5, y: 0.5 },
	a6: { x: 3.5, y: 1.5 },
	a7: { x: 3.5, y: 2.5 },
	a8: { x: 3.5, y: 3.5 },

	b1: { x: 2.5, y: -3.5 },
	b2: { x: 2.5, y: -2.5 },
	b3: { x: 2.5, y: -1.5 },
	b4: { x: 2.5, y: -0.5 },
	b5: { x: 2.5, y: 0.5 },
	b6: { x: 2.5, y: 1.5 },
	b7: { x: 2.5, y: 2.5 },
	b8: { x: 2.5, y: 3.5 },

	c1: { x: 1.5, y: -3.5 },
	c2: { x: 1.5, y: -2.5 },
	c3: { x: 1.5, y: -1.5 },
	c4: { x: 1.5, y: -0.5 },
	c5: { x: 1.5, y: 0.5 },
	c6: { x: 1.5, y: 1.5 },
	c7: { x: 1.5, y: 2.5 },
	c8: { x: 1.5, y: 3.5 },

	d1: { x: 0.5, y: -3.5 },
	d2: { x: 0.5, y: -2.5 },
	d3: { x: 0.5, y: -1.5 },
	d4: { x: 0.5, y: -0.5 },
	d5: { x: 0.5, y: 0.5 },
	d6: { x: 0.5, y: 1.5 },
	d7: { x: 0.5, y: 2.5 },
	d8: { x: 0.5, y: 3.5 },

	e1: { x: -0.5, y: -3.5 },
	e2: { x: -0.5, y: -2.5 },
	e3: { x: -0.5, y: -1.5 },
	e4: { x: -0.5, y: -0.5 },
	e5: { x: -0.5, y: 0.5 },
	e6: { x: -0.5, y: 1.5 },
	e7: { x: -0.5, y: 2.5 },
	e8: { x: -0.5, y: 3.5 },

	f1: { x: -1.5, y: -3.5 },
	f2: { x: -1.5, y: -2.5 },
	f3: { x: -1.5, y: -1.5 },
	f4: { x: -1.5, y: -0.5 },
	f5: { x: -1.5, y: 0.5 },
	f6: { x: -1.5, y: 1.5 },
	f7: { x: -1.5, y: 2.5 },
	f8: { x: -1.5, y: 3.5 },

	g1: { x: -2.5, y: -3.5 },
	g2: { x: -2.5, y: -2.5 },
	g3: { x: -2.5, y: -1.5 },
	g4: { x: -2.5, y: -0.5 },
	g5: { x: -2.5, y: 0.5 },
	g6: { x: -2.5, y: 1.5 },
	g7: { x: -2.5, y: 2.5 },
	g8: { x: -2.5, y: 3.5 },

	h1: { x: -3.5, y: -3.5 },
	h2: { x: -3.5, y: -2.5 },
	h3: { x: -3.5, y: -1.5 },
	h4: { x: -3.5, y: -0.5 },
	h5: { x: -3.5, y: 0.5 },
	h6: { x: -3.5, y: 1.5 },
	h7: { x: -3.5, y: 2.5 },
	h8: { x: -3.5, y: 3.5 },
};

function whatPlayerColour(username) {
	let whitePlayer = document.querySelector(".player.color-icon.is.white.text .user-link").textContent;
	if (whitePlayer.includes(username)) {
		return (-1);
	}
	return 1;
}

function playerToMove() {
	const movePositionHistoryLength = document.getElementsByTagName("kwdb").length;
	if (movePositionHistoryLength % 2 == 1) {
		return 1;
	}
	return (-1);
}

function getMoveHistory() {
	const movePositionHistory = document.getElementsByTagName("kwdb");
  let j = 0;
  let algebraicMoveHistory = [];
  for (let i = 0; i < movePositionHistory.length; i += 2) {
		const move1 = movePositionHistory[i].textContent;
		let move2 = '';
	    if (i + 1 < movePositionHistory.length) {
	    	move2 = movePositionHistory[i + 1].textContent;
	    }

	    algebraicMoveHistory.push(move1 + ' ' + move2);
	    j++;
	  }
  return algebraicMoveHistory.toString().replace(/,/g, ' ');
}

function drawArrow(startSquare, destinationSquare, opacity, color, arrowHead) {
	const svgNS = "http://www.w3.org/2000/svg";
	const newElement = document.createElementNS(svgNS, "g");

	const cgHashValue = `$400,400,${startSquare},${destinationSquare},green`;
	newElement.setAttribute("cgHash", cgHashValue);

	const lineElement = document.createElementNS(svgNS, "line");
	lineElement.setAttribute("stroke", color);
	lineElement.setAttribute("stroke-width", "0.15625");
	lineElement.setAttribute("stroke-linecap", "round");
	lineElement.setAttribute("marker-end", "url(#arrowhead-" + arrowHead + ")");
	lineElement.setAttribute("opacity", opacity);
	lineElement.setAttribute("x1", playerColour * tileCoordinates[startSquare]['x']);
	lineElement.setAttribute("y1", playerColour * tileCoordinates[startSquare]['y']);
	lineElement.setAttribute("x2", playerColour * tileCoordinates[destinationSquare]['x']);
	lineElement.setAttribute("y2", playerColour * tileCoordinates[destinationSquare]['y']);

	newElement.appendChild(lineElement);

	const parentG = document.querySelector(".cg-shapes g");
	parentG.appendChild(newElement);
}

function removeArrow() {
    const parentG = document.querySelector(".cg-shapes g");
    while (parentG.firstChild) {
      parentG.removeChild(parentG.firstChild);
    }
}

function fetchMove(depth, discrete) {
	let moveHistory = getMoveHistory()
	if (!discrete) {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://127.0.0.1:5000/api?algebra=" + moveHistory.toString() + "&depth=" + depth + "&discrete=0",
			onload: function(response) {
				var arrowElements = response.responseText.split(' ');
				if (arrowElements[1].length > 2) { arrowElements[1] = arrowElements[1].slice(0, 2); }
				drawArrow(arrowElements[0], arrowElements[1], 1, "#15781B", "g");
			}
		});
	}

	else {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://127.0.0.1:5000/api?algebra=" + moveHistory.toString() + "&depth=" + depth + "&discrete=1",
			onload: function(response) {
				let moves = JSON.parse(response.responseText);
				let bestMove = moves[0];
				let discreteMove = moves[1];

				let bestMoveStartSqr = bestMove.substring(0, 2);
				let bestMoveDestSqr = bestMove.substring(2).slice(0, 2);
				let discreteMoveStartSqr = discreteMove.substring(0, 2);
				let discreteMoveDestSqr = discreteMove.substring(2).slice(0, 2);

				drawArrow(bestMoveStartSqr, bestMoveDestSqr, 1, "#15781B", "g");
				drawArrow(discreteMoveStartSqr, discreteMoveDestSqr, 0.6, "#5C85D6", "d");
			}
		});
	}
}

function cheatWrapper() {
  let currentPlayerTurn = playerToMove();
  const moveHistory = getMoveHistory();

  if (moveHistory !== lastMoveHistory) {
    lastMoveHistory = moveHistory;
    if (currentPlayerTurn === playerColour) {
    	let depth = getDepth();
      fetchMove(depth, isDiscrete());
      }
    }
  }

function observeNewMove() {
    const targetElements = document.querySelectorAll('.last-move');
    const lastElement = targetElements[targetElements.length - 1];

    if (lastElement) {
        observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                  removeArrow();
                  cheatWrapper();
                }
            }
        });
        observer.observe(lastElement, { attributes: true });
    }
}

function getDepth() {
	if (document.getElementById("depth").value == '') {
		return "0.5"; // No need to make it string, but it makes it more consistent
	}
	return document.getElementById("depth").value;
}

function isDiscrete() {
	const discrete = document.getElementById("discrete");
	if (discrete.checked) {
		return true;
	}
	return false;
}

// ************************************ NORMAL
const markerElement = document.createElementNS("http://www.w3.org/2000/svg", "marker");
markerElement.setAttribute("id", "arrowhead-g");
markerElement.setAttribute("orient", "auto");
markerElement.setAttribute("overflow", "visible");
markerElement.setAttribute("markerWidth", "4");
markerElement.setAttribute("markerHeight", "4");
markerElement.setAttribute("refX", "2.05");
markerElement.setAttribute("refY", "2");
markerElement.setAttribute("cgKey", "g");

const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
pathElement.setAttribute("d", "M0,0 V4 L3,2 Z");
pathElement.setAttribute("fill", "#15781B");
// ************************************ NORMAL

// ************************************ DISCRETE
const markerElementD = document.createElementNS("http://www.w3.org/2000/svg", "marker");
markerElementD.setAttribute("id", "arrowhead-d");
markerElementD.setAttribute("orient", "auto");
markerElementD.setAttribute("overflow", "visible");
markerElementD.setAttribute("markerWidth", "4");
markerElementD.setAttribute("markerHeight", "4");
markerElementD.setAttribute("refX", "2.05");
markerElementD.setAttribute("refY", "2");
markerElementD.setAttribute("cgKey", "g");

const pathElementD = document.createElementNS("http://www.w3.org/2000/svg", "path");
pathElementD.setAttribute("d", "M0,0 V4 L3,2 Z");
pathElementD.setAttribute("fill", "#5C85D6");
// ************************************ DISCRETE
markerElement.appendChild(pathElement);
markerElementD.appendChild(pathElementD);

const defsElement = document.querySelector(".cg-shapes defs");

if (defsElement) {
  defsElement.appendChild(markerElement);
  defsElement.appendChild(markerElementD);
}

var player = document.getElementById("user_tag").textContent;
var playerColour = whatPlayerColour(player);

const styleElement = document.createElement('style');
const cssRules = `
.control-box {
  background-color: #333;
  color: white;
  padding: 8px;
  border-radius: 2px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.cheatButton {
  background-color: #555;
  color: white;
  border: none;
  padding: 10px 1.5%;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.cheatButton:hover {
  background-color: #444;
}

#depth {
  background-color: #ddd;
  color: #333;
  border: none;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  width: 20%;
}

p {
  color: #aaa;
  margin: 10px 0;
}

#stopCheat {
  background-color: #f00;
}

#stopCheat:hover {
  background-color: #d00;
}

#startCheat {
  width: 50%;
}

.spancont {
	width: 75%;
}

input[type="checkbox"] {
  margin-right: 5px;
}
`;
styleElement.textContent = cssRules;
document.head.appendChild(styleElement);

const controlBoxDiv = document.createElement('div');
controlBoxDiv.classList.add('control-box');
controlBoxDiv.innerHTML = `
<div class="control-box">
    <button id="startCheat" class="cheatButton">Start Cheat</button><br>
    <span class="spancont">
    <input type="checkbox" id="discrete">
    <label for="discrete">Multiple Arrows</label>
    <button id="moveButton" class="cheatButton">Get Move</button>
    <button id="stopCheat" class="cheatButton">Stop</button>
    <input id="depth" type="text" placeholder="Analysis depth (seconds)">
    <p>Warning: A piece on the board must have previously moved before starting cheat.</p>
	</span>
</div>
`;

document.body.appendChild(controlBoxDiv);

const cheatButton = document.getElementById("startCheat");
const stopButton = document.getElementById("stopCheat");
const getBestMoveButton = document.getElementById("moveButton");

getBestMoveButton.addEventListener("click", function() {
	let depth = getDepth();
	fetchMove(depth, isDiscrete());
	removeArrow();
});

stopButton.addEventListener("click", function() {
    if (observer) {
        observer.disconnect();
    }
});

cheatButton.addEventListener("click", function() {
	lastMoveHistory = getMoveHistory();
	let depth = getDepth();
  fetchMove(depth, isDiscrete());
	observeNewMove();
});
});

})();
