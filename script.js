score = 0;
cross = true;
audio = new Audio("music.mp3");
jump = new Audio("jump.mp3");
audioGo = new Audio("Gameover.mp3");
// setTimeout(() => {
//     audio.play();
// }, 1000);
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
};

setInterval(() => {
  hero = document.querySelector(".hero");
  over = document.querySelector(".over");
  frog = document.querySelector(".frog");

  dx = parseInt(window.getComputedStyle(hero, null).getPropertyValue("left"));
  dy = parseInt(window.getComputedStyle(hero, null).getPropertyValue("top"));

  ox = parseInt(window.getComputedStyle(frog, null).getPropertyValue("left"));
  oy = parseInt(window.getComputedStyle(frog, null).getPropertyValue("top"));
  offsetX = Math.abs(dx - ox);
  offsetY = Math.abs(dy - oy);

  if (offsetX < 70 && offsetY < 45) {
    over.style.visibility = "visible";
    frog.classList.remove("frogAni");
    audio.pause();
    audioGo.play();

    setTimeout(() => {
      audioGo.pause();
    }, 2500);

    let start = document.getElementById("start");
    start.innerHTML = "Play Again";
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
      frog.style.animationDuration = newDur + "s";
    }, 500);
  }
}, 10);

function updateScore(score) {
  scoreCont.innerHTML = "Your Score: " + score;
  jump.play();
}

function start() {
  score = 0;
  let start = document.getElementById("start");
  let frog = document.getElementsByClassName("frog");
  scoreCont.innerHTML = "Your Score: " + 0;
  start.style.visibility = "hidden";
  instructions.style.visibility = "hidden";
  over.style.visibility = "hidden";
  frog[0].classList.add("frogAni");
  audio.play();
}
