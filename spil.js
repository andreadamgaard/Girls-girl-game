window.addEventListener("load", sidenVises);
let points;
let liv;
let myRand;

//opretter konstanter for mine karaktere
const gg1 = document.querySelector("#girlsgirl_container1");
const gg2 = document.querySelector("#girlsgirl_container2");
const gg3 = document.querySelector("#girlsgirl_container3");

const pm1 = document.querySelector("#pickme_container1");
const pm2 = document.querySelector("#pickme_container2");

function sidenVises() {
  console.log("sidenVises");
  //Skjul andre skærme
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  //Vis start skærm
  document.querySelector("#start").classList.remove("hide");
  //Klik på start_knap
  document.querySelector("#start_knap").addEventListener("click", startGame);
}

function startGame() {
  points = 0;
  document.querySelector("#point").textContent = points;

  liv = 3;
  document.querySelector("#liv").textContent = liv;

  console.log("startGame");
  //Skjul andre skærme
  document.querySelector("#start").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");

  //starter timer-animation (time)
  document.querySelector("#time_sprite").classList.add("time");
  document.querySelector("#time_board").addEventListener("animationend", stopSpil);

  //starter fald på min gode karakter
  gg1.classList.add("fald", "pos" + nytRanTal(10)), "delay" + nytRanTal(6);
  gg1.addEventListener("animationiteration", girlReset);

  gg2.classList.add("fald", "pos" + nytRanTal(10)), "delay" + nytRanTal(6);
  gg2.addEventListener("animationiteration", girlReset);
  gg2.addEventListener("mousedown", clickGirl);

  gg3.classList.add("fald", "pos" + nytRanTal(10)), "delay" + nytRanTal(6);
  gg3.addEventListener("animationiteration", girlReset);
  gg3.addEventListener("mousedown", clickGirl);

  //starter fald på min onde karakter
  pm1.classList.add("fald", "pos" + nytRanTal(10), "delay" + nytRanTal(6));
  pm1.addEventListener("animationiteration", pickMeReset);
  pm1.addEventListener("mousedown", clickPickMe);

  pm2.classList.add("fald", "pos" + nytRanTal(10), "delay" + nytRanTal(6));
  pm2.addEventListener("animationiteration", pickMeReset);
  pm2.addEventListener("mousedown", clickPickMe);

  //når animationen er færdig kaldes stopSpil
  document.querySelector("#time_sprite").addEventListener("animationend", stopSpil);
}

function clickGirl() {
  console.log(clickGirl);

  //gør så lyden kan køre igen hurtigt efter og ik skal vente til slut
  //document.querySelector("#wuhuu").currentTime = 0;
  //document.querySelector("#yas_girl").currentTime = 0;
  //vælger mellem 2 forskellige lyde
  if (Math.random() < 0.5) {
    document.querySelector("#wuhuu").play();
  } else {
    document.querySelector("#yas_girl").play();
  }
  //ryd op, så man ikke kan kilkke på den samme flere gange
  this.removeEventListener("mousedown", clickGirl);

  //frys (pause), op_ned-animationen
  this.classList.add("frys");

  //Tæl en op på points og udskriv
  points++;
  document.querySelector("#point").textContent = points;

  //Start forsvind-animationer på sprite element (firstElementChild er sprite elementet)
  this.firstElementChild.classList.add("forsvindGood");

  //Lyt efter forsvind-animationer er færdig
  this.addEventListener("animationend", girlReset);
}

function girlReset() {
  console.log("girlReset");
  //ryd op, fjern alt er på container og sprite
  this.classList = "";
  this.firstElementChild.classList = "";

  //For at kunne genstarte op_ned animationen, da vi fjener og tilføjer den i samme function
  this.offsetLeft;

  //giv animationer, speed og positioner igen
  this.classList.add("fald", "pos" + nytRanTal(10), "delay" + nytRanTal(6));

  //Lyt efter klik på element
  this.addEventListener("mousedown", clickGirl);
}

function clickPickMe() {
  console.log(clickPickMe);

  //gør så lyden kan køre igen hurtigt efter og ik skal vente til slut
  document.querySelector("#pick_me").currentTime = 0;

  // lyd til dårlige element sat ind
  document.querySelector("#pick_me").play();

  //ryd op, så man ikke kan kilkke på den samme flere gange
  this.removeEventListener("mousedown", clickPickMe);

  //frys (pause), op_ned-animationen
  this.classList.add("frys");

  //Tæl en ned på points og udskriv
  liv--;
  document.querySelector("#liv").textContent = liv;

  //Start forsvind-animationer på sprite element (firstElementChild er sprite elementet)
  this.firstElementChild.classList.add("forsvindBad");

  //Lyt efter forsvind-animationer er færdig
  this.addEventListener("animationend", pickMeReset);

  if (liv <= 0) {
    console.log("ikke flere liv");
    stopSpil();
    //kan også skrives if (0 >= liv) - næbet skal altid gå mod 0
  }
}

function pickMeReset() {
  console.log("pickMeReset");

  //ryd op, fjern alt er på container og sprite
  this.classList = "";
  this.firstElementChild.classList = "";

  //For at kunne genstarte op_ned animationen, da vi fjener og tilføjer den i samme function
  this.offsetLeft;

  //giv animationer, speed og positioner igen
  this.classList.add("fald", "pos" + nytRanTal(10), "delay" + nytRanTal(6));

  //Lyt efter forsvind-animationer er færdig
  this.addEventListener("mousedown", clickPickMe);
}

function stopSpil() {
  console.log("stopSpil");
  document.querySelector("#time_sprite").classList.remove("time");
  document.querySelector("#time_board").removeEventListener("animationend", stopSpil);

  //... til levelComplete eller gameOver

  //gg1
  gg1.classList = "";
  gg1.firstElementChild.classList = "";
  gg1.removeEventListener("animationiteration", girlReset);
  gg1.removeEventListener("mousedown", clickGirl);
  gg1.removeEventListener("animationend", girlReset);

  //gg2
  gg2.classList = "";
  gg2.firstElementChild.classList = "";
  gg2.removeEventListener("animationiteration", girlReset);
  gg2.removeEventListener("mousedown", clickGirl);
  gg2.removeEventListener("animationend", girlReset);

  //GG3
  gg3.classList = "";
  gg3.firstElementChild.classList = "";
  gg3.removeEventListener("animationiteration", girlReset);
  gg3.removeEventListener("mousedown", clickGirl);
  gg3.removeEventListener("animationend", girlReset);

  //pm1
  pm1.classList = "";
  pm1.firstElementChild.classList = "";
  pm1.removeEventListener("animationiteration", pickMeReset);
  pm1.removeEventListener("mousedown", clickPickMe);
  pm1.removeEventListener("animationend", pickMeReset);

  //pm2
  pm2.classList = "";
  pm2.firstElementChild.classList = "";
  pm2.removeEventListener("animationiteration", pickMeReset);
  pm2.removeEventListener("mousedown", clickPickMe);
  pm2.removeEventListener("animationend", pickMeReset);

  if (liv <= 0) {
    gameOver();
  } else if (points >= 12) {
    levelComplete();
  } else {
    gameOver();
  }
}

function gameOver() {
  console.log("gameOver");

  document.querySelector("#not_like_most").play();

  //Vis gameover skærm
  document.querySelector("#game_over").classList.remove("hide");
  //Klik på genstart1
  document.querySelector("#genstart1").addEventListener("mousedown", startGame);
}

function levelComplete() {
  console.log("levelComplete");
  document.querySelector("#amazing").play();

  //Vis levelComplete skærm
  document.querySelector("#level_complete").classList.remove("hide");
  //Klik på genstart2
  document.querySelector("#genstart2").addEventListener("mousedown", startGame);
}

//Gør så du kan få et random tal nemmere. Sæt navnet ind med det parameter ind du vil have som her: nytRanTal(9)
function nytRanTal(max) {
  return (minRand = Math.floor(Math.random() * max) + 1);
}
