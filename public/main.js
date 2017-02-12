// Initialize Firebase
var config = {
  apiKey: "AIzaSyBEV_nobmOnrlLgx4dq34U5X2ZeV7H4BNE",
  authDomain: "draw-6bba6.firebaseapp.com",
  databaseURL: "https://draw-6bba6.firebaseio.com",
  storageBucket: "draw-6bba6.appspot.com",
  messagingSenderId: "393848162065"
};
firebase.initializeApp(config);

var pointsData = firebase.database().ref().child('players');


var points = [];


function setup() {
  createCanvas(400, 400);
  background(60);
  fill(255);
  pointsData.on("child_added", function (point) {
     console.log(point.val)
     points.push(point.val())
  });

      for (var i = 0; i < points.length; i++) {
        var point = points[i];
        console.log(point.x, point.y)
        ellipse(point.x, point.y, 5, 5)
    }
}

function draw() {

}