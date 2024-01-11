score = 0;
cross = true;
audio = new Audio("music.mp3");
jump = new Audio("jump.mp3");
audioGo = new Audio("Gameover.mp3");
// setTimeout(() => {
//     audio.play();
// }, 1000);

//each number is the frogs for that wave, w0 = 1, w1 = 2, w2 = 4, etc...
frogs_per_wave = [1,2,4,6,6,6,8];
current_frogs = [];
current_wave = 0;

document.onkeydown = function (e) {
  if (e.keyCode == 38) {
    hero = document.querySelector(".hero");
    hero.classList.add("animateHero");
    setTimeout(() => {
      hero.classList.remove("animateHero");
    }, 1200);
  }
  if (e.keyCode == 39) {
    hero = document.querySelector(".hero");
    heroX = parseInt(
      window.getComputedStyle(hero, null).getPropertyValue("left")
    );
    hero.style.left = heroX + 50 + "px";
  }
  if (e.keyCode == 37) {
    hero = document.querySelector(".hero");
    heroX = parseInt(
      window.getComputedStyle(hero, null).getPropertyValue("left")
    );
    hero.style.left = heroX - 50 + "px";
  }

  //Testing
  if (e.keyCode == 69) {
    //createFrog();
    updateWave();
    console.log("Sending Wave: " + current_wave);
    sendWave(frogs_per_wave[current_wave]);
  }
};

setInterval(() => {
  hero = document.querySelector(".hero");
  over = document.querySelector(".over");
  won = document.querySelector(".won");
  frog = document.querySelector(".frog");

  //This must be removed soon
  //current_frogs.push(frog);

  dx = parseInt(window.getComputedStyle(hero, null).getPropertyValue("left"));
  dy = parseInt(window.getComputedStyle(hero, null).getPropertyValue("top"));

  /*
  ox = parseInt(window.getComputedStyle(frog, null).getPropertyValue("left"));
  oy = parseInt(window.getComputedStyle(frog, null).getPropertyValue("top"));
  offsetX = Math.abs(dx - ox);
  offsetY = Math.abs(dy - oy);
  */

  /*
    1. Check all frogs positions and remove them as they reach  end of screen
  */
  for(let i = 0; i < current_frogs.length; i++) {
    current_frog_ox = parseInt(window.getComputedStyle(current_frogs[i], null).getPropertyValue("left"));
    current_frog_oy = parseInt(window.getComputedStyle(current_frogs[i], null).getPropertyValue("top"));

    offsetX = Math.abs(dx - current_frog_ox);
    offsetY = Math.abs(dy - current_frog_oy);

    if (current_frog_ox < 0) {
      removeFrog(current_frogs[i]);
    };

    if (offsetX < 70 && offsetY < 45) {
      over.style.visibility = "visible";
      current_frogs[i].classList.remove("frogAni");
      audio.pause();
      audioGo.play();

      setTimeout(() => {
        audioGo.pause();
      }, 2500);

      let start = document.getElementById("start");
      start.innerHTML = "<span style='font-size:40px'>PLAY AGAIN</span>";
      start.style.visibility = "visible";
    } else if (offsetX < 145 && cross) {
      score += 1;

      updateScore(score);
      cross = false;
      setTimeout(() => {
        cross = true;
      }, 1000);
      setTimeout(() => {
        aniDur = parseFloat(
          window
            .getComputedStyle(frog, null)
            .getPropertyValue("animation-duration")
        );
        newDur = aniDur - 0;
        current_frogs.forEach((frog) => {
          current_frogs[i].style.animationDuration = newDur + "s";
        });

        current_frogs[i].style.animationDuration = newDur + "s";
      }, 500);
    }
  }

}, 10);

function updateScore(score) {
  scoreCont.innerHTML = "Your Score: " + score;
  jump.play();
}

function updateWave() {
  current_wave++;
  currentWave.innerHTML = "Wave: " + current_wave;
  sendWave();
}

function start() {
  score = 0;
  let start = document.getElementById("start");
  scoreCont.innerHTML = "Your Score: " + 0;
  start.style.visibility = "hidden";
  instructions.style.visibility = "hidden";
  over.style.visibility = "hidden";
  won.style.visibility = "hidden";
  audio.play();

  //Start first wave!
  sendWave(frogs_per_wave[current_wave]);
}

function removeFrog(frog) {
  let index = current_frogs.indexOf(frog);
  current_frogs.splice(index, 1);
  frog.remove();

  //If all frogs have cleared the screen, next wave!
  if(current_frogs.length <= 0) {
    updateWave();
    sendWave(frogs_per_wave[current_wave]);
  }
}

//Creates a new Frog element on screen!
function createFrog() {
  const frog = document.createElement('div');
  frog.classList.add("frog");
  document.getElementsByClassName("container")[0].append(frog);
  frog.classList.add("frogAni");

  //Add frog to frogs list
  current_frogs.push(frog);
  console.log(current_frogs);
}

function sendWave(amount) {

  if(current_wave == frogs_per_wave.length) {
    won.style.visibility = "visible";
  }

  for(let i = 0; i < amount; i++) {
    setTimeout(createFrog, Math.random() * (2000 - 300) + 300);
  }
}
