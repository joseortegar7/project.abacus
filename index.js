// Select the button
const btn = document.querySelector(".darkmode");
// Select the stylesheet <link>
const theme = document.querySelector("#theme-link");

// Listen for a click on the button
btn.addEventListener("click", function() {
  // If the current URL contains "ligh-theme.css"
  if (theme.getAttribute("href") == "style-lightmode.css") {
    // ... then switch it to "dark-theme.css"
    theme.href = "style-darkmode.css";
  // Otherwise...
  } else {
    // ... switch it to "light-theme.css"
    theme.href = "style-lightmode.css";
  }
});