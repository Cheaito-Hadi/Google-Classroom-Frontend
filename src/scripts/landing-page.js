// let user_data = {
//   id: 13,
//   name: "hassan",
//   email: "hassan@gmail.com",
//   role: "teacher",
//   image: "/assets/images/profile.jpg",
// };
// localStorage.setItem("user", JSON.stringify(user_data));
const user = JSON.parse(localStorage.getItem("user"));

document.addEventListener("DOMContentLoaded", async function () {
 
  try {
    const response = await fetch(
      "http://localhost/Google-Classroom-Backend/get-classes.php"
    );
    const res = await response.json();
    console.log(res);
    localStorage.setItem("classes", JSON.stringify(res.classes));
  } catch (error) {
    console.error(error);
  }
  const classes = JSON.parse(localStorage.getItem("classes"));
  const user = JSON.parse(localStorage.getItem("user"));

  // add user profile pic - navbar and sidebar
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

  
  // display general classroom card
  function displayGeneralClass() {
    return `<div class="top-side-card">
                <div class="card-title">Class name</div>
                <div class="card-section">section</div>
            </div>
            <img src="/assets/images/profile.jpg" alt="" srcset="">`;
  }

  const class_container = document.querySelector(".card-container");

  // Check if there are no classes
  if (classes.length === 0) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = displayGeneralClass();
    class_container.appendChild(card);
  } else {
  // display classes in card
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
      ele.class_name,
      ele.section,
      ele.subject,
      ele.image
    );
    class_container.appendChild(card);
    card.addEventListener("click", () => {
      window.location.href = `classroom.html?id=${ele.id_classroom}`;
    });
  });
  }
  // diplay classes in sidebar
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
});

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

// + list (create,join)
const class_info_btn = document.querySelector(".class-info-btn");
const join_create_list = document.querySelector(".join-create-list");
class_info_btn.addEventListener("click", () => {
  join_create_list.classList.toggle("show");
});

// show and hide create class model
const create_class = document.querySelector(".create-class");
const class_model = document.querySelector(".create-class-model");
create_class.addEventListener("click", () => {
  class_model.classList.toggle("show");
});

// style create class model
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

// update classroom db
document.querySelector(".create").addEventListener("click", createClass);
async function createClass() {
  let name_input = document.getElementById("class-name-input").value;
  let section_input = document.getElementById("class-section-input").value;
  let subjecte_input = document.getElementById("class-subject-input").value;
  let room_input = document.getElementById("class-room-input").value;
  const data = new FormData();
  data.append("user-id", user.id);
  data.append("name", name_input);
  data.append("section", section_input);
  data.append("subject", subjecte_input);
  data.append("room", room_input);
  data.append("image", "/assets/images/profile.jpg");

  try {
    const response = await fetch(
      "http://localhost/Google-Classroom-Backend/create_class_room.php",
      {
        method: "POST",
        body: data,
      }
    );
    const res = await response.json();
    localStorage.setItem("classes", JSON.stringify(res.classes));
    localStorage.setItem("teacher-info", JSON.stringify(res.teacher));
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}

// join class model
const join_class_btn = document.querySelector(".join-class");
const join_class_model = document.querySelector(".join-class-model");
join_class_btn.addEventListener("click", () => {
  join_class_model.classList.toggle("show");
});

document.querySelector(".cancel-join").addEventListener("click", () => {
  join_class_model.classList.remove("show");
});

const join_model = document.querySelector("#course");
JSON.parse(localStorage.getItem("classes")).forEach((ele) => {
  const option_class = document.createElement("option");
  option_class.innerHTML = ele.class_name;
  option_class.value = ele.id_classroom;
  join_model.appendChild(option_class);
});

// update student db
const join_btn = document.querySelector(".join");
join_btn.addEventListener("click", async function () {
  const selectedOption = join_model.value;
  const joined_class = new FormData();
  joined_class.append("user_id", user.id);
  joined_class.append("id_classRoom", selectedOption);
  try {
    const response = await fetch(
      "http://localhost/Google-Classroom-Backend/joined_class.php",
      {
        method: "POST",
        body: joined_class,
      }
    );
    console.log(response);
    const res = await response.json();
    console.log(res);
    localStorage.setItem("student", JSON.stringify(res.student));
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
});

const user_info = document.querySelector(".right-side-nav .profile-pic");
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
  if (
    !join_create_list.contains(event.target) &&
    event.target !== class_info_btn
  ) {
    join_create_list.classList.remove("show");
  }
  if (!class_model.contains(event.target) && event.target !== create_class) {
    class_model.classList.remove("show");
  }
  if (
    !join_class_model.contains(event.target) &&
    event.target !== join_class_btn
  ) {
    join_class_model.classList.remove("show");
  }
  if (!user_info_list.contains(event.target) && event.target !== user_info) {
    user_info_list.classList.remove("show");
  }
});

document.querySelector(".sign-out").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/index.html";
});