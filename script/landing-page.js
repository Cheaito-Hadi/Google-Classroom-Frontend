document.addEventListener("DOMContentLoaded", function () {
  var user_data = { role: "teacher", image: "/assets/images/profile.jpg" };
  var classes_data = [
    {
      name: "two class",
      section: "section1",
      image: "/assets/images/profile.jpg",
      description: "hello world",
    },
    {
      name: "tech class",
      section: "tech section",
      image: "/assets/images/profile.jpg",
      description: "hello tech",
    },
    {
      name: "soft class",
      section: "soft section",
      image: "/assets/images/profile.jpg",
      description: "hello soft",
    },
    {
      name: "hadi class",
      section: "soft section",
      image: "/assets/images/profile.jpg",
      description: "hello soft",
    },
  ];

  // Set the data in the local storage using the localStorage.setItem() method
  localStorage.setItem("user", JSON.stringify(user_data));
  localStorage.setItem("classes", JSON.stringify(classes_data));

  const user = JSON.parse(localStorage.getItem("user"));
  const classes = JSON.parse(localStorage.getItem("classes"));

  let profile_pic = document.querySelector(".profile-pic");
  profile_pic.style.backgroundImage = `url(${user.image})`;

  function displayClasses(title, section, description, image) {
    return `<div class="top-side-card">
                <div class="card-title">${title}</div>
                <div class="card-section">${section}</div>
            </div>
            <img src=${image} alt="" srcset="">
            <div class="description">${description}</div>`;
  }
  const class_container = document.querySelector(".card-container");
  classes.forEach((ele) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = displayClasses(
      ele.name,
      ele.section,
      ele.description,
      ele.image
    );
    console.log(card);
    class_container.appendChild(card);
  });
});

const show_sidebar = document.querySelector(".show-side-bar");
const sidebar = document.querySelector(".side-bar");
show_sidebar.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

document.addEventListener("click", function (event) {
  if (!sidebar.contains(event.target) && event.target !== show_sidebar) {
    sidebar.classList.remove("show");
  }
});
