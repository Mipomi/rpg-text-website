
const maxLines = 5;

let monsterHidup = true;
let modeJelajah = false;
let modePelatihan = false;
let sedangJelajah = false;

// variable palsu
// let newExp = 0;
let dapatexp = 0;


// Player
let level = 0;
let hpPlayer = 400;
let exp = 100;
const attackPlayer = 1999;
const defensMonster = 100;
const calAttackPlayer = attackPlayer > defensMonster ? attackPlayer - defensMonster : defensMonster - attackPlayer;

// Monster
const attackMonster = 9;
const defensPlayer = 190;
let hpMonster = 294;
const calAttackMonster = attackMonster > defensPlayer ? attackMonster - defensPlayer : defensPlayer - attackMonster;


function command(){
  const inputText = document.getElementById('inputText').value.toLowerCase();
    
  switch(inputText){
    case "attack":
      Attack();
      break;
    case "jelajah":
      explore(); 
      break;
    case "status":
      status();
      break;
    case "shop":
      battle('membuka toko');
      break;
    case "home":
      home();
      break;
    default:
      battle(`<span style="color: red;">PERINTAH TIDAK ADA, SILAHKAN ISI DENGAN BENAR!!</span>`);
      break;
    }
    document.getElementById('inputText').value = '';
}

function Attack() {
  if(modeJelajah && monsterHidup){
    hpMonster -= calAttackPlayer;
    battle(`<span style="color: blue;">Kamu memberikan <span style="color: red;">${calAttackPlayer} damage</span> ke monster.</span>`);
    if(hpMonster <= 0){
      dapatexp += 1090;
      if(dapatexp >= exp){
        level += 1;

        exp * 2;
        console.log("level up " + level + " " + exp);
      }
      modeJelajah = false;
      monsterHidup = false; 
      console.log('pfkaj');
    }
  } else{
    battle('Attack tidak bisa di gunakan');
  }
}

function status(){
  battle("ini status");
}

function home(){
  battle('kembali kerumah');
}

function explore(){
  if(!sedangJelajah && monsterHidup){
    sedangJelajah = true;
    modeJelajah = true;
    modePelatihan = false;
    battle('sedang menjelajah....');
    monsterAttack();
  }else{
    battle('jelajah tidak bisa di gunakan');
  }
}


function battle(message) {
  const outputContainer = document.getElementById('output-container');
    if (outputContainer.childElementCount >= maxLines){
        outputContainer.removeChild(outputContainer.lastChild);
    }
  const newParagraph = document.createElement('p');
  newParagraph.innerHTML = message;
  outputContainer.appendChild(newParagraph);
  outputContainer.insertBefore(newParagraph, outputContainer.firstChild);
}

function monsterAttack() {
  battle('monster menyerang');
  let monsterInterval = setInterval(function(){
    hpPlayer -= calAttackMonster;
    battle(`monster menyerangmu dan memberikan <span style="color: red;">${calAttackMonster} damage</span> ke kamu ${hpPlayer}.`);
    if(hpMonster <= 0){
      clearInterval(monsterInterval);
      console.log('ini dari monster attack');
    }else if(hpPlayer <= 0){
      clearInterval(monsterInterval);
      console.log('kamu telah dikalahkan')
    }
  }, 3000);
}

document.getElementById("inputText").addEventListener("keyup", function(event) {
  event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("command").click();
    }
});

