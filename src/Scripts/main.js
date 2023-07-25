const displayAllTitles = async () => {
  try {
    await displayTitles();
    await display_announcements();
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener("DOMContentLoaded", displayAllTitles);

const postButton = document.getElementById("announce");
postButton.addEventListener("click", displayAllTitles);
const urlParams = new URLSearchParams(window.location.search);
const classroom_id = urlParams.get("id");
document
  .querySelector(".classwork-navigation")
  .addEventListener("click", () => {
    window.location.href = `/src/pages/classwork.html?id=${classroom_id}`;
  });

document.querySelector(".people-navigation").addEventListener("click", () => {
  window.location.href = `/src/pages/people.html?id=${classroom_id}`;
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

// const classes_sidebar = document.querySelector(".classes-list");
// classes.forEach((ele) => {
//   const sidebar_class = document.createElement("div");
//   sidebar_class.classList.add("class");
//   sidebar_class.innerHTML = sidebarClasses(
//     ele.class_name,
//     ele.section,
//     ele.image
//   );
//   classes_sidebar.appendChild(sidebar_class);
//   sidebar_class.addEventListener("click", () => {
//     window.location.href = `/src/pages/classroom.html?id=${ele.id_classroom}`;
//   });
// });

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
