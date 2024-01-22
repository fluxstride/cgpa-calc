const gpaText = document.querySelector(".gpa");
const gpaClassText = document.querySelector(".gpaClass");
const restartButton = document.querySelector(".restart");

const gpa = localStorage.getItem("GPA");

const goBack = () => history.back();

if (!gpa) {
  history.back();
}

let gpaClass = "";

if (gpa >= 4.5) {
  gpaClass = "First Class";
} else if (gpa >= 3.5) {
  gpaClass = "2nd Class Upper";
} else if (gpa >= 2.5) {
  gpaClass = "2nd Class Lower";
} else {
  gpaClass = "3rd Class Lower";
}

gpaText.setAttribute("data-gpa", gpa);
gpaClassText.innerHTML = gpaClass;

restartButton.addEventListener("click", goBack);

window.addEventListener("beforeunload", () => {
  localStorage.removeItem("GPA");
});
