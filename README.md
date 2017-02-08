## small game via Firebase ##

Challenge and compare type game

### next ###


- blue screen background, white text

- compare player name in CAPS
- movement input, speed
- player panel display - colour, position, speed, scores

- position map screen
- display colour circle (or svg) and initial
- display players

- save current player to local storage, and reload on startup
- set colour by Set player
- set scores, health, speed ...?
- set player in room
- use p.id not name

- compare player strategies - score each time, add to stats?
- if ever level - find final tally and edge that way
- show edge on the bars



## player structure ideas ##
- id
- PIN no (later, for security)
- name
- status
- health value
- ammo value
- colour
- position X, Y
- speed vector, X, Y
- toggleA
- toggleB
- objects in hand

- each player has different line style?
- colour line for speed of ball

### ideas
number editor, https://github.com/tleunen/react-number-editor/tree/master/src

styles
http://react.semantic-ui.com/introduction

charts
http://recharts.org/#/en-US

native
https://github.com/lelandrichardson/react-native-pan-controller

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

references
Fraction - https://github.com/infusion/Fraction.js
http://www.xarg.org/2014/03/rational-numbers-in-javascript/  

tried react-dnd, so still in there, but it interfered with other drag components
https://react-dnd.github.io/react-dnd/docs-overview.html

used trigonometry helper,
http://codepen.io/anthonydugois/pen/JYoqqm
looked at https://react.rocks/example/TR-808 - interesting but unused
