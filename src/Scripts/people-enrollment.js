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
    console.error("Error: " + e);
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
    console.error("Error: " + e);
  }
};
pages.getNumber = async () => {
  try {
    const response = await fetch(pages.number_url);
    const json = await response.json();
    number_of_students.innerHTML = json + " students";
  } catch (e) {
    console.error("Error :" + e);
  }
};
const urlParams = new URLSearchParams(window.location.search);
const classroom_id = urlParams.get("id");

document
  .querySelector(".classwork-navigation")
  .addEventListener("click", () => {
    window.location.href = `/src/pages/classwork.html?id=${classroom_id}`;
  });

document.querySelector(".stream-navigation").addEventListener("click", () => {
  window.location.href = `/src/pages/classroom.html?id=${classroom_id}`;
});

const classes = JSON.parse(localStorage.getItem("classes"));

function sidebarClasses(title, section, image) {
  return `<img src=${image} class="sidebar-class-image"  alt="" srcset="">
            <div class="class-info">
                <div class="class-name-sidebar">${title}</div>
                <div class="class-section-sidebar">${section}</div>
            </div>`;
}
const show_sidebar = document.querySelector(".show-side-bar");
const sidebar = document.querySelector(".side-bar");
show_sidebar.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

const classes_sidebar = document.querySelector(".classes-list");
classes.forEach((ele) => {
  const sidebar_class = document.createElement("div");
  sidebar_class.classList.add("class");
  sidebar_class.innerHTML = sidebarClasses(
    ele.class_name,
    ele.section,
    ele.image
  );
  classes_sidebar.appendChild(sidebar_class);
  sidebar_class.addEventListener("click", () => {
    window.location.href = `/src/pages/classroom.html?id=${ele.id_classroom}`;
  });
});

const classes_local = JSON.parse(localStorage.getItem("classes"));
let class_name;
let section;
for (i = 0; i < classes_local.length; i++) {
  if (classes_local[i].id == classroom_id) {
    class_name = classes_local[i].name;
    section = classes_local[i].section;
  }
}

const user = JSON.parse(localStorage.getItem("user"));

let profile_pic = document.querySelectorAll(".profile-pic");
profile_pic.forEach((ele) => {
  ele.style.backgroundImage = `url(${user.profile_image})`;
});

const user_name = document.querySelectorAll(".user-name");
user_name.forEach((ele) => {
  ele.innerHTML = `${user.first_name} ${user.last_name}`;
});

const user_email = document.querySelectorAll(".user-email");
user_email.forEach((ele) => {
  ele.innerHTML = user.email;
});

const user_info = document.querySelector(".nav-3-wrap .profile-pic");
const user_info_list = document.querySelector(".user-info-list");
user_info.addEventListener("click", () => {
  user_info_list.classList.toggle("show");
});

const edit_profile = document.querySelector(".edit-profile");
edit_profile.addEventListener("click", () => {
  window.location.href = `edit-profile.html?user_id=${user.id}`;
});

document.addEventListener("click", function (event) {
  if (!sidebar.contains(event.target) && event.target !== show_sidebar) {
    sidebar.classList.remove("show");
  }
  if (!user_info_list.contains(event.target) && event.target !== user_info) {
    user_info_list.classList.remove("show");
  }
});

document.querySelector(".sign-out").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/index.html";
});
