const urlParams = new URLSearchParams(window.location.search);
const classroom_id = urlParams.get("id");
const displayTitles = async () => {
  const data = new FormData();
  data.append("classroom_id", classroom_id);
  try {
    const response = await fetch("http://localhost/Google-Classroom-Backend/stream.php", {
      method: "POST",
      body: data
    });
    const json = await response.json();
    const assignments = json.assignment;
    const titlesContainer = document.getElementById("titles-container");

    assignments.forEach((data) => {
      const divElement = document.createElement("div");
      const svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgElement.setAttribute("focusable", "false");
      svgElement.setAttribute("width", "24");
      svgElement.setAttribute("height", "24");
      svgElement.setAttribute("viewBox", "0 0 24 24");
      const pathElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      pathElement.setAttribute(
        "d",
        "M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h2v8l2.5-1.5L13 12V4h5v16z"
      );
      svgElement.appendChild(pathElement);
      svgElement.classList.add("mysvg");
      divElement.appendChild(svgElement);
      const titleElement = document.createElement("span");
      titleElement.textContent = `posted a new assignment: ${data.title}`;
      divElement.appendChild(titleElement);
      divElement.classList.add("title-box");
      titlesContainer.appendChild(divElement);
      divElement.addEventListener("click", () => {
        window.location.href = `/src/pages/classroom_submit.html?classroom_id=${classroom_id}&assignment_id=${data.id}`;
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const display_announcements = async () => {
  const get_announcements = document.getElementById("announce");

  const urlParams = new URLSearchParams(window.location.search);
  const classroom_id = urlParams.get("id");
  const user = JSON.parse(localStorage.getItem("user"));

  get_announcements.addEventListener("click", async (e) => {
    const data = new FormData();
    data.append("classroom_id", classroom_id);

    try {
      const response = await fetch(
        "http://localhost/Google-Classroom-Backend/displayannounce.php",
        {
          method: "POST",
          body: data,
        }
      );
      const data = await response.json();
      const announcements = data.anoncments;
      localStorage.setItem("student", JSON.stringify(announcements));
      const class_anoncments = JSON.parse(localStorage.getItem("user"));
      const announce_container = document.getElementById("titles-container");

      announce_container.innerHTML = "";
      // const url = `/src/pages/assignment.html?classroom_id=${classroom_id}&student_id=${student_id}`;
      announcements.forEach((data) => {
        if (data.content.trim() !== "") {
          const divElement = document.createElement("div");
          const svgElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          svgElement.setAttribute("focusable", "false");
          svgElement.setAttribute("width", "24");
          svgElement.setAttribute("height", "24");
          svgElement.setAttribute("viewBox", "0 0 24 24");
          const pathElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          pathElement.setAttribute(
            "d",
            "M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h2v8l2.5-1.5L13 12V4h5v16z"
          );
          svgElement.appendChild(pathElement);
          svgElement.classList.add("mysvg");
          divElement.appendChild(svgElement);
          const titleElement = document.createElement("span");
          titleElement.textContent = `posted a new announcement: ${data.content}`;
          divElement.appendChild(titleElement);
          divElement.classList.add("title-box");
          announce_container.appendChild(divElement);
          divElement.addEventListener("click", () => {
            window.location.href = `/src/pages/assignment.html?classroom_id=${classroom_id}&announcment_id=${data.id}`;
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
};

const announcements = document.getElementById("announce");

announcements.addEventListener("click", async (e) => {
  e.preventDefault();
  const announce_text = document.getElementById("announce-text").value;
  const files = "abc.docx";
  const user = JSON.parse(localStorage.getItem("user"));

  const urlParams = new URLSearchParams(window.location.search);
  const classroom_id = urlParams.get("id");
  const techer_matching_class = teacher.find(
    (obj) => obj.classRoom_id === class_room_id
  );
  const teacher_id = techer_matching_class.id;

  try {
    const data = new FormData();
    data.append("techer_id", teacher_id);
    data.append("announcement", announce_text);
    data.append("files", files);
    data.append("classroom_id", classroom_id);
    const response = await fetch(
      "http://localhost/Google-Classroom-Backend/announce.php",
      {
        method: "POST",
        body: data,
      }
    );
  } catch (error) {
    console.log(error);
  }
});

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
document
  .querySelector(".classwork-navigation")
  .addEventListener("click", () => {
    window.location.href = `/src/pages/classwork.html?id=${classroom_id}`;
  });

document.querySelector(".people-navigation").addEventListener("click", () => {
  window.location.href = `/src/pages/people.html?id=${classroom_id}`;
});

// const classes = JSON.parse(localStorage.getItem("classes"));
// function sidebarClasses(title, section, image) {
//   return `<img src=${image} class="sidebar-class-image"  alt="" srcset="">
//             <div class="class-info">
//                 <div class="class-name-sidebar">${title}</div>
//                 <div class="class-section-sidebar">${section}</div>
//             </div>`;
// }
// const show_sidebar = document.querySelector(".show-side-bar");
// const sidebar = document.querySelector(".side-bar");
// show_sidebar.addEventListener("click", () => {
//   sidebar.classList.toggle("show");
// });

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

//show and hide sidebar
const show_sidebar = document.querySelector(".show-side-bar");
const sidebar = document.querySelector(".side-bar");
show_sidebar.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});
document.addEventListener("click", (event) => {
  if (!sidebar.contains(event.target) && event.target !== show_sidebar) {
    sidebar.classList.remove("show");
  }
});

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
