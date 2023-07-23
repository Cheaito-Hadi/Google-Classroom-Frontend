let user_data = {
  id: 13,
  role: "teacher",
  image: "/assets/images/profile.jpg",
};
let classes_data = [
  {
    id: "1",
    name: "two class",
    section: "section1",
    image: "/assets/images/profile.jpg",
    subject: "hello world",
  },
  {
    id: "2",
    name: "tech class",
    section: "tech section",
    image: "/assets/images/profile.jpg",
    subject: "hello tech",
  },
  {
    id: "3",
    name: "soft class",
    section: "soft section",
    image: "/assets/images/profile.jpg",
    subject: "hello soft",
  },
  {
    id: "4",
    name: "hadi class",
    section: "soft section",
    image: "/assets/images/profile.jpg",
    subject: "hello soft",
  },
];

// Set the data in the local storage using the localStorage.setItem() method
localStorage.setItem("user", JSON.stringify(user_data));
localStorage.setItem("classes", JSON.stringify(classes_data));

const user = JSON.parse(localStorage.getItem("user"));
const classes = JSON.parse(localStorage.getItem("classes"));
document.addEventListener("DOMContentLoaded", function () {
  let profile_pic = document.querySelectorAll(".profile-pic");
  profile_pic.forEach((ele) => {
    console.log(ele);
    ele.style.backgroundImage = `url(${user.image})`;
  });

  function displayClasses(title, section, subject, image) {
    return `<div class="top-side-card">
                <div class="card-title">${title}</div>
                <div class="card-section">${section}</div>
            </div>
            <img src=${image} alt="" srcset="">
            <div class="description">${subject}</div>`;
  }
  const class_container = document.querySelector(".card-container");
  classes.forEach((ele) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = displayClasses(
      ele.name,
      ele.section,
      ele.subject,
      ele.image
    );
    class_container.appendChild(card);
    card.addEventListener("click", () => {
      window.location.href = `stream.html?id=${ele.id}`;
    });
  });

  function sidebarClasses(title, section, image) {
    return `<img src=${image} class="sidebar-class-image"  alt="" srcset="">
            <div class="class-info">
                <div class="class-name-sidebar">${title}</div>
                <div class="class-section-sidebar">${section}</div>
            </div>`;
  }
  const classes_sidebar = document.querySelector(".classes-list");
  classes.forEach((ele) => {
    const sidebar_class = document.createElement("div");
    sidebar_class.classList.add("class");
    sidebar_class.innerHTML = sidebarClasses(ele.name, ele.section, ele.image);
    classes_sidebar.appendChild(sidebar_class);
  });
});

const show_sidebar = document.querySelector(".show-side-bar");
const sidebar = document.querySelector(".side-bar");
show_sidebar.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

const class_info_btn = document.querySelector(".class-info-btn");
const join_create_list = document.querySelector(".join-create-list");
class_info_btn.addEventListener("click", () => {
  join_create_list.classList.toggle("show");
});

const create_class = document.querySelector(".create-class");
const class_model = document.querySelector(".create-class-model");
create_class.addEventListener("click", () => {
  class_model.classList.toggle("show");
});

document.addEventListener("click", function (event) {
  if (!sidebar.contains(event.target) && event.target !== show_sidebar) {
    sidebar.classList.remove("show");
  }
  if (
    !join_create_list.contains(event.target) &&
    event.target !== class_info_btn
  ) {
    join_create_list.classList.remove("show");
  }
  if (!class_model.contains(event.target) && event.target !== create_class) {
    class_model.classList.remove("show");
  }
});

const inputFields = document.querySelectorAll(".input");
const miniLabels = document.querySelectorAll(".label");

inputFields.forEach((inputField, index) => {
  const miniLabel = miniLabels[index];

  inputField.addEventListener("focus", () => {
    miniLabel.classList.add("active");
    inputField.removeAttribute("placeholder");
  });

  inputField.addEventListener("blur", () => {
    if (inputField.value === "") {
      miniLabel.classList.remove("active");
      inputField.setAttribute("placeholder", miniLabel.innerHTML);
    }
  });
});

document.querySelector(".cancel").addEventListener("click", () => {
  class_model.classList.remove("show");
});

document.querySelector(".create").addEventListener("click", createClass);

async function createClass() {
  let name_input = document.getElementById("class-name-input").value;
  let section_input = document.getElementById("class-section-input").value;
  let subjecte_input = document.getElementById("class-subject-input").value;
  let room_input = document.getElementById("class-room-input").value;
  //   console.log(name_input);
  //   console.log(section_input);
  //   console.log(subjecte_input);
  //   console.log(room_input);
  const data = new FormData();
  data.append("user-id", user.id);
  data.append("name", name_input);
  data.append("section", section_input);
  data.append("subject", subjecte_input);
  data.append("room", room_input);
  data.append("image", "/assets/images/profile.jpg");

  try {
    const response = await fetch(
      "http://localhost/Google-Classroom-Backend/teachers/create_class_room.php",
      {
        method: "POST",
        body: data,
      }
    );
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}
