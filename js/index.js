/**
 *  A simple function to calculate a students CGPA
 * @param {{creditUnit: number, grade: string}[]} studentGrades An array of student grades
 * @returns
 */
const calculateCGPA = (studentGrades) => {
  const gradingScale = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1,
    F: 0,
  };

  let totalCreditUnits = 0;
  let gradePointsSum = 0;

  let gradeIndex = 0;

  while (gradeIndex < studentGrades.length) {
    const { creditUnit, grade } = studentGrades[gradeIndex++];

    totalCreditUnits += creditUnit;
    gradePointsSum += gradingScale[grade] * creditUnit;
  }

  return (gradePointsSum / totalCreditUnits).toFixed(2);
};

const addCourseButton = document.querySelector(".addCourseBtn");
const backdrop = document.querySelector(".backdrop");
const dialog = document.querySelector(".modal");
const closeButton = document.querySelector(".close");
const courseForm = document.forms["courseForm"];
const formFields = document.querySelectorAll(".input-field");
const courseList = document.querySelector(".courseList");
const courseRows = document.querySelectorAll(".course-row");
const emptyState = document.querySelector(".emptyState");
const calculateGPAButton = document.querySelector(".calculateGPABtn");

const clearInputs = () => {
  for (field of formFields) {
    const input = field.querySelector("input");
    input.value = "";
  }
};

const closeCourseModal = () => {
  backdrop.style.visibility = "hidden";
  backdrop.style.pointerEvents = "none";
  clearInputs();
};

let courses = [];

const clearCourseList = () => {
  courseList.innerHTML = "";
  emptyState.style.display = "block";
};

courseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (emptyState.style.display === "") {
    emptyState.style.display = "none";
    courseList.style.display = "block";
    calculateGPAButton.disabled = false;
  }

  const data = new FormData(courseForm);
  const courseCode = data.get("courseCode").toLocaleUpperCase();
  const creditUnit = +data.get("creditUnit");
  const grade = data.get("grade").toLocaleUpperCase();

  courseList.innerHTML += `
  <div class="row">
            <span class="courseCode">${courseCode}</span>
            <span class="creditUnit">${creditUnit}</span>
            <span class="grade">${grade}</span>
          </div>
  `;

  courses.push({ creditUnit, grade });

  closeCourseModal();
});

addCourseButton.addEventListener("click", () => {
  backdrop.style.visibility = "visible";
  backdrop.style.pointerEvents = "all";
});

const closeModal = (e) => {
  if (e.target === e.currentTarget) {
    closeCourseModal();
  }
};

backdrop.addEventListener("click", closeModal);
closeButton.addEventListener("click", closeModal);

const calculateGPA = () => {
  clearCourseList();
  const cgpa = calculateCGPA(courses);
  localStorage.setItem("GPA", cgpa);
  window.location = "result.html";
};

calculateGPAButton.addEventListener("click", calculateGPA);
