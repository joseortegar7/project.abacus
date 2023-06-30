const lightsOff = document.querySelector(".lights-off");
const lightsOn = document.querySelector(".lights-on");
const theme = document.querySelector("#theme-link");

lightsOff.addEventListener("click", function() {
  if (theme.getAttribute("href") == "style-lightmode.css") {
    theme.href = "style-darkmode.css";
  }
});

lightsOn.addEventListener("click", function() {
  if (theme.getAttribute("href") == "style-darkmode.css") {
    theme.href = "style-lightmode.css";
  }
});