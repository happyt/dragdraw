// Initialize Firebase
var config = {
  apiKey: "AIzaSyBEV_nobmOnrlLgx4dq34U5X2ZeV7H4BNE",
  authDomain: "draw-6bba6.firebaseapp.com",
  databaseURL: "https://draw-6bba6.firebaseio.com",
  storageBucket: "draw-6bba6.appspot.com",
  messagingSenderId: "393848162065"
};
firebase.initializeApp(config);

const SIZE = 800
const DOT = 25

var pointsData = firebase.database().ref().child('players');

var players = [];

// converts from Firebase object format to an array
const objectToPlayers = (fbObject) => {
    const playerList = [];       // is there a players list entry
      Object.keys(fbObject).forEach(key => {
        fbObject.id = key
        playerList.push(fbObject[key]);
      })
    return playerList;
}

const playerColour = (player) => {
    if (!player.colour) return color(99,99,99)
    return color(player.colour.r, player.colour.g, player.colour.b)
}

function setup() {
  createCanvas(SIZE, SIZE);
  background(60);
  fill(255);
//   pointsData.on("child_added", function (point) {
//      console.log(point.val)
//      points.push(point.val())
//   });

    pointsData.on("value", snapshot => {
        const playersObject = snapshot.val()
        players = objectToPlayers(playersObject);   
    });
}

function draw() {
    background(60);
    for (var i = 0; i < players.length; i++) {
        fill(playerColour(players[i]))
        ellipse(players[i].posX + 20, SIZE - 20 - players[i].posY, DOT, DOT)
    } 
}