const name_game = document.querySelector(".name");
const btn = document.querySelector(".btn");
function play() {
  console.log("a");
  if (name_game.style.display !== "none") {
    name_game.style.display = "none";
    btn.style.display = "none";
  } else {
    name_game.style.display = "block";
  }
}


