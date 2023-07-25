const pages = {};

pages.teacher_url = "http://localhost/Google-Classroom-Backend/teachers.php";
pages.student_url = "http://localhost/Google-Classroom-Backend/students.php";
pages.number_url =
  "http://localhost/Google-Classroom-Backend/count_students.php";
const teacher_body = document.getElementById("teacher-body");
const student_body = document.getElementById("student-body");
const number_of_students = document.getElementById("number-of-students");
pages.createItem = (first_name, last_name) => {
  return `
    <div class="user-info flex">
        <img class="user-image" src="https://lh3.googleusercontent.com/a/default-user=s32-c" alt="profile image">
        <div>${first_name} ${last_name}</div>
    </div>
    `;
};

pages.getTeacher = async () => {
  try {
    const response = await fetch(pages.teacher_url);
    const json = await response.json();
    json.forEach((teacher) => {
      const firstName = teacher.first_name;
      const lastName = teacher.last_name;
      const new_item = pages.createItem(firstName, lastName);
      teacher_body.innerHTML += new_item;
    });
  } catch (e) {
    console.log("Error: " + e);
  }
};
pages.getStudent = async () => {
  try {
    const response = await fetch(pages.student_url);
    const json = await response.json();
    json.forEach((student) => {
      const s_firstName = student.first_name;
      const s_lastName = student.last_name;
      const new_item = pages.createItem(s_firstName, s_lastName);
      student_body.innerHTML += new_item;
    });
  } catch (e) {
    console.log("Error: " + e);
  }
};
pages.getNumber = async () => {
  try {
    const response = await fetch(pages.number_url);
    const json = await response.json();
    number_of_students.innerHTML = json + " students";
  } catch (e) {
    console.log("Error :" + e);
  }
};

document
  .querySelector(".classwork-navigation")
  .addEventListener("click", () => {
    window.location.href = "/src/pages/classwork.html";
  });

document.querySelector(".stream-navigation").addEventListener("click", () => {
  window.location.href = "/src/pages/classroom.html";
});
