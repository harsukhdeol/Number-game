var guessItem = null;
var interval=60;
var solution ;
var results = [];
var gameOver= false;

function setup() {
  createCanvas(800, 400);
}

function draw() {
  var gameScore= getGameScore(results);


  if (gameScore.loss>=3||gameScore.total==10){// stops game
     displayGameOver(gameScore);
    gameOver= true;
    return;
  }
  background(255);
	if (frameCount==1 ||frameCount % interval==0){
		solution= null;
		guessItem= new GuessItem(width/2, height/2,10);
	}
	if (guessItem){
	guessItem.render();
	}
/*if (solution==true){
	background(255);
}else if (solution ==false){
	background(0);
}*/
  if (solution==true|| solution==false){
 solutionMessage(gameScore. total, solution);
  }
}

function solutionMessage(seed,solution){
  var trueMessages=[
    'GOOD JOB',"YOU'RE DOING GREAT",':D', 
    'OMG', 'IMPRESSIVE', 'WOW AMAZING'
    ];
  var falseMessages=[
    'KEEP TRYING','OH NO',
    'MISTAKES HAPPEN', 'WTH', ':('
    ];
  var messages; 
  push();
  
  textAlign(CENTER, CENTER);
  fill(237,34,92);
textSize(34);
  randomSeed(seed*10000);
  
  if(solution==true){
    messages= trueMessages;
    background(255);
  }else if (solution==false){
    messages=falseMessages;
    background(0);
  }
  translate(width/2, height/2);
  text(messages[parseInt(random(messages.length), 10)], 0,0);
randomSeed();
  pop();
  
}
function displayGameOver(score){
  background(255);
  push();
  textAlign(CENTER, CENTER);
  translate(width/2, height/2);
  
  
  fill(224, 118, 104);
  textSize(24);
  text("GAME OVER", 0,0);
  
  fill(0);
  translate(0, 36);
  text('You have ' +score.win +' correct guesses', 0,0);
 
  var alternatingValue= map(sin(frameCount/10), -1, 1, 0, 255);
  fill(224, 118, 104, alternatingValue);
  textSize(16);
  translate(0, 100);
  text('Press ENTER to restart', 0,0);
  pop();
}

function getGameScore(score){
  var wins= 0;
  var losses= 0;
  var total=score.length;
  
  for (var i=0; i<total; i++){
    var item = score[i];
    if(item == true){
      wins = wins+1;
         }else{
    losses= losses+1;
  }
     }
  return {win: wins, loss: losses, total: total};
}
function restartGame(){
  results= [];
  gameOver= false;
  solution= null;
  
}
	function keyPressed(){
    if (keyCode==ENTER&& gameOver==true){//restart game
      restartGame();
      return;
    }
		if (guessItem != null){
	console.log("you pressed: ", key);
	solution= guessItem.solve(key);
      if (solution){
        results.push(true);
      }else{
        results.push(false);}
			guessItem= null;
		}else{
			console.log("There's nothing to solve!");
		}	
}

function GuessItem(x, y, scl){
	this.x= x;
	this.y=y;
	this.scale= scl;
	this.content= getContent();
	this.scaleIncrement= 0.33;
	this.alpha= 255;
	this.alphaDecrement= 6;//rate of how fast text becomes transparent
	this.solved;
	this.contentMap={
    '1':'one',
    '2':'two', 
    '3':'three',
    '4': 'four',
    '5':'five',
    '6':'six',
    '7':'seven',
    '8':'eight',
    '9':'nine',
    '0':'zero'
  };
    this.colors=[
    [220,20,60],
    [255,69,0], 
     [255,215,0],
      [34,139,34],
      [102,205,170],
        [30,144,255],
      [25,25,112],
      [75,0,130],
      [139,0,139],
  [255,20,147]
    ];
  
	function getContent(){
		return String(parseInt(random(10),10));
	}
	
	this.solve= function(input){	
	if (input== this.content){
		this.solved= true;
	}else{
		this.solved= false;
	}
		return this.solved;
}

this.drawEllipse = function( size, strkeWeight, speedMultiplier, seed){
push();
  translate(this.x, this.y);
  scale(this.scale*0.5*speedMultiplier);
 randomSeed(seed);
  var clr = this.colors[parseInt(random(this.colors.length), 10)];
  stroke(clr);
  noFill();
  strokeWeight(strkeWeight);
  ellipse(0,0, size, size);
 randomSeed();
  
  pop();

}
	this.render= function(){
		if (this.solved==false){
			return;
		}
    this.drawEllipse(110,15,1.2, this.content*1000);
    this.drawEllipse(90,7,1, this.content);
     this.drawEllipse(60,5,1.1,this.content*3000);
		push();
		fill(0, this.alpha);
		textAlign(CENTER, CENTER);
		translate( this.x, this.y);
		scale(this.scale);
		text(this.contentMap[this.content],0,0);
		this.scale= this.scale+this.scaleIncrement;
		this.alpha= this.alpha- this.alphaDecrement;
		pop();
  }
}