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
    window.location.href = "/src/pages/classwork.html";
  });

document.querySelector(".people-navigation").addEventListener("click", () => {
  window.location.href = "/src/pages/people.html";
});
