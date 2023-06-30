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

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value)
  } else {
    handleNumber(value)
  }
}

function handleNumber(number) {
 if (buffer === `0`) {
  buffer = number
 } else {
  buffer += number
  console.log(buffer)
 }
}

function handleSymbol(symbol) {
console.log(`symbol`)
}
function init1() {
  document
    .querySelector(`.button1`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}

function init2() {
  document
    .querySelector(`.button2`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}

function init3() {
  document
    .querySelector(`.button3`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}
function init4() {
  document
    .querySelector(`.button4`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}
function init5() {
  document
    .querySelector(`.button5`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}
function init6() {
  document
    .querySelector(`.button6`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}
function init7() {
  document
    .querySelector(`.button7`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}
function init8() {
  document
    .querySelector(`.button8`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}
function init9() {
  document
    .querySelector(`.button9`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}
function init0() {
  document
    .querySelector(`.button0`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}
function initminus() {
  document
    .querySelector(`.minus`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}
function initplus() {
  document
    .querySelector(`.plus`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}
function initmultiply() {
  document
    .querySelector(`.multiply`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}
function initdivide() {
  document
    .querySelector(`.divide`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}
function initpercentage() {
  document
    .querySelector(`.percentage`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}
function initplusminus() {
  document
    .querySelector(`.plusminus`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}
function initAC() {
  document
    .querySelector(`.allclear`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}
function initequals() {
  document
    .querySelector(`.equals`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}
function initperiod() {
  document
    .querySelector(`.period`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}
function initbackspace() {
  document
    .querySelector(`.backspace`)
    .addEventListener(`click`, function(event) {
    buttonClick(event.target.innerText)
  })
}
init1(); init2(); init3(); init4(); init5(); init6(); init7(); init8(); init9(); init0()
initdivide(); initpercentage(); initminus(); initmultiply();
initAC(); initequals(); initperiod(); initplus(); initplusminus(); initbackspace();

