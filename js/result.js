const gpaText = document.querySelector(".gpa");
const gpaClassText = document.querySelector(".gpaClass");
const restartButton = document.querySelector(".restart");

const gpa = localStorage.getItem("GPA");

const goBack = () => history.back();

if (!gpa) {
  goBack();
}

const gpaClassLookupMap = new Map([
  [4.5, "First Class"],
  [3.5, "2nd Class Upper"],
  [2.5, "2nd Class Lower"],
  [0, "3rd Class"],
]);

const convertGpaToClass = (gpa) => {
  for (let [key, value] of gpaClassLookupMap) {
    if (gpa >= parseFloat(key)) {
      return value;
    }
  }
};

const gpaClass = convertGpaToClass(gpa);

gpaText.setAttribute("data-gpa", gpa);
gpaText.setAttribute("style", "--gpa-percent: " + (gpa / 5) * 100 + "%");
gpaClassText.innerHTML = gpaClass;

restartButton.addEventListener("click", goBack);

window.addEventListener("beforeunload", () => {
  localStorage.removeItem("GPA");
});
