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
