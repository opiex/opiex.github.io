var stages = [];

var Stage = function(path, levelName, creatorName, creatorUrl){
  if (typeof levelName === 'undefined') { this.levelName = 'No-name'; }
  else {this.levelName = levelName;};
  if (typeof creatorName === 'undefined') { this.creatorName = 'Someone'; }
  else {this.creatorName = creatorName;};
  if (typeof creatorUrl === 'undefined') { this.creatorUrl = 'No-name'; }
  else {this.creatorUrl = creatorUrl;};
  this.path = path;
  this.length = 0;
  this.updateLengthOfValidCubes();
}

Stage.prototype.updateLengthOfValidCubes = function(){
  for(var i = 0; i < this.path.length; i++){
    if(this.path[i].length != 3) {this.length++};
  }
}

var sentences = [
'young padawan',
'mr. know it all',
'mr. titty pants',
'sherlock holmes',
'fox mulder',
'miss marple',
'philip marlowe',
'mr. peanutbutter',
'pretty face'];

var currentSentence = sentences[Math.floor(Math.random()*sentences.length)];

$('#tut03 p').text("good luck " +currentSentence + ".");

function parseCurrentStageNumber(){
  // /^([a-z0-9]{5,})$/.test('abc1');   // false
  // var level = window.location.hash;
  var queryDict = {}
  location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})
  var levelNumber = parseInt(queryDict.level);
  if(levelNumber){
    console.log("level number: " +levelNumber +", num of stages: " +(stages.length - 1));
    if(levelNumber > stages.length){
      alert("nice try. but there aren't so many levels. lol");
      levelNumber = 1;
    }
  }
  else{
    levelNumber = 1;
  }
  console.log('level: ' +levelNumber);
  return levelNumber;
}
