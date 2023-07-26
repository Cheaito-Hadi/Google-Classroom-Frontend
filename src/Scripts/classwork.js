let is_teacher = false;
let is_student = false;
const urlParams = new URLSearchParams(window.location.search);
const classroom_id = urlParams.get("id");
const teacher = JSON.parse(localStorage.getItem("teacher"));
const student = JSON.parse(localStorage.getItem("student"));
if (teacher) {
  for (i = 0; i < teacher.length; i++) {
    if (teacher[i].classRoom_id == classroom_id) {
      is_teacher = true;
    }
  }
} else if (student) {
  for (i = 0; i < student.length; i++) {
    if (student[i].classRoom_id == classroom_id) {
      is_student = true;
    }
  }
}
function viewAssignment(arr_assign) {
  const assign_list = document.getElementById("ul-assign");

  assign_list.innerHTML = "";

  const topics_set = new Set();
  for (let i = 0; i < arr_assign.length; i++) {
    topics_set.add(arr_assign[i].topic);
  }

  const topics = [...topics_set];
  topics.forEach((item) => {
    let assign_ul = document.createElement("ul");
    assign_ul.innerHTML = `${item}`;
    arr_assign.forEach((assignment) => {
      if (assignment.topic == item) {
        let assign_li = document.createElement("li");
        assign_li.innerHTML = `
            <div class="title-li" id="li-title"><svg focusable="false" width="24" height="24"
                        viewBox="0 0 24 24" class=" NMm5M hhikbc svg-blue">
                        <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z"></path>
                        <path
                            d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z">
                        </path>
                    </svg><span>${assignment.title}</span></div>
                    <div class="due-date">Due: ${assignment.due_date}</div>`;
        assign_ul.appendChild(assign_li);
        assign_li.classList.add("assign-li");
      }
    });
    assign_list.appendChild(assign_ul);
  });
}

async function fetchAssignment() {
  const formData = new FormData();
  formData.append("class_room_id", classroom_id);
  try {
    const response = await fetch(
      "http://localhost/Google-Classroom-Backend/fetchAssignment.php",
      {
        method: "POST",
        body: formData,
      }
    );
    const json = await response.json();
    const assignments = json.assignments;
    console.log(assignments);
    viewAssignment(assignments);
  } catch (e) {
    console.log(e);
  }
}

fetchAssignment();

document.querySelector(".people-navigation").addEventListener("click", () => {
  window.location.href = `/src/pages/people.html?id=${classroom_id}`;
});

document.querySelector(".stream-navigation").addEventListener("click", () => {
  window.location.href = `/src/pages/classroom.html?id=${classroom_id}`;
});

const create_btn = document.querySelector(".create-assignment-btn");
if (is_student) {
  create_btn.style.display = "none";
}
create_btn.addEventListener("click", () => {
  window.location.href = `/src/pages/assignment.html?id=${classroom_id}`;
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

const user = JSON.parse(localStorage.getItem("user"));

let profile_pic = document.querySelectorAll(".profile-pic");
profile_pic.forEach((ele) => {
  console.log(ele);
  ele.style.backgroundImage = `url(${user.image})`;
});

const user_name = document.querySelectorAll(".user-name");
user_name.forEach((ele) => {
  ele.innerHTML = user.name;
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
