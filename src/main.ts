import "./style.css";
import Player from "./classes/Player";
import Vector from "./classes/Vector";
import FirstPerson from "./classes/FirstPerson";
import TopDown from "./classes/TopDown";

const player = new Player(new Vector(200, 200), 75, 400);
const topDown = new TopDown(player);
const firstPerson = new FirstPerson(player);

function draw() {
  player.update();
  topDown.draw();
  firstPerson.draw();
  requestAnimationFrame(draw);
}

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      player.pos.add(Vector.fromAngle(player.angle, 5));
      break;
    case "ArrowDown":
      player.pos.sub(Vector.fromAngle(player.angle, 5));
      break;
    case "ArrowLeft":
      player.angle = (player.angle + 5) % 360;
      break;
    case "ArrowRight":
      player.angle = (player.angle - 5) % 360;
      break;
  }

  /*if (event.key === "ArrowUp") {
    player.pos.add(Vector.fromAngle(player.angle, 5));
  }
  if (event.key === "ArrowDown") {
    player.pos.sub(Vector.fromAngle(player.angle, 5));
  }
  if (event.key === "ArrowLeft") {
    player.angle = (player.angle + 5) % 360;
  }
  if (event.key === "ArrowRight") {
    player.angle = (player.angle - 5) % 360;
  }*/
});

draw();
