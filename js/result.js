const gpaText = document.querySelector(".gpa");
const gpa = localStorage.getItem("GPA");

if (!gpa) {
  window.history.back();
}

gpaText.innerHTML = `Your GPA is ${gpa}`;

window.addEventListener("beforeunload", () => {
  localStorage.removeItem("GPA");
});
