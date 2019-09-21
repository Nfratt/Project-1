var isGameStarted = false;
function startbutton() {
    if (isGameStarted) {
      return;
    }
  
    isGameStarted = true;
    var x = document.getElementById("useage");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }