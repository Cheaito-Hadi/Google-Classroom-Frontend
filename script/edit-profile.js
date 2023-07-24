const user = JSON.parse(localStorage.getItem("user"));

// add user profile pic - navbar and user-info-list
let profile_pic = document.querySelectorAll(".profile-pic");
profile_pic.forEach((ele) => {
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

update_btn.addEventListener("click", async () => {
  const update_firstname = document.getElementById("first-name").value;
  const update_lastname = document.getElementById("last-name").value;
  const update_email = document.getElementById("email").value;
  const update_password = document.getElementById("password").value;

  if (upload_image.files[0] !== undefined) {
    const user = JSON.parse(localStorage.getItem("user"));
    const file = upload_image.files[0];
    const user_id = user.id;

    const image_data = new FormData();

    image_data.append("profile_image", file);
    image_data.append("user_id", user_id);

    try {
      const response = await fetch(
        "http://localhost/Google-Classroom-Backend/upload-images.php",
        {
          method: "POST",
          body: image_data,
        }
      );
      const res = await response.json();
      user.image = `http://localhost/Google-Classroom-Backend/${res.image_path}`;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error(error);
    }
  }
  const user_data = new FormData();
  if (update_firstname !== "") {
    user_data.append("first-name", update_firstname);
  }
  if (update_lastname !== "") {
    user_data.append("last-name", update_lastname);
  }
  if (update_email !== "") {
    user_data.append("email", update_email);
  }
  if (update_password !== "") {
    user_data.append("password", update_password);
  }
  const user_id = user.id;
  user_data.append("user_id", user_id);

  try {
    const user_response = await fetch(
      "http://localhost/Google-Classroom-Backend/update-profile.php",
      {
        method: "POST",
        body: user_data,
      }
    );
    const user_res = await user_response.json();
  } catch (error) {
    console.error(error);
  }
});