const user = JSON.parse(localStorage.getItem("user"));

// add user profile pic - navbar and user-info-list
let profile_pic = document.querySelectorAll(".profile-pic");
profile_pic.forEach((ele) => {
  console.log(ele);
  ele.style.backgroundImage = `url(${user.image})`;
});
document.querySelector(".user-name").innerHTML = user.name;

document.querySelector(".user-email").innerHTML = user.email;

const user_info = document.querySelector(".right-side-nav .profile-pic");
const user_info_list = document.querySelector(".user-info-list");
user_info.addEventListener("click", () => {
  user_info_list.classList.toggle("show");
});

document.addEventListener("click", function (event) {
  if (!user_info_list.contains(event.target) && event.target !== user_info) {
    user_info_list.classList.remove("show");
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
const update_btn = document.querySelector(".update");
const upload_image = document.getElementById("profile-image");
console.log(upload_image);

update_btn.addEventListener("click", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const file = upload_image.files[0];
  const user_id = user.id;
  console.log(file);
  console.log(user_id);
  let data = new FormData();
  data.append("profile_image", file);
  data.append("user_id", user_id);

  try {
    const response = await fetch(
      "http://localhost/Google-Classroom-Backend/upload-images.php",
      {
        method: "POST",
        body: data,
      }
    );
    console.log(response);
    const res = await response.json();
    console.log(res.image_path);
    user.image = `http://localhost/Google-Classroom-Backend/${res.image_path}`;
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
});