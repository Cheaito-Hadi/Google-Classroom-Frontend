let arrow2 = document.getElementById("arrow-2");

postsArray = ['tech', 'softskilss', 'uix']

const postsList = document.getElementById("ul-2");
postsArray.forEach((post) => {
    let listItem = document.createElement("li")
    listItem.innerHTML = `
  <input type="checkbox">
  <span>${post}</span>`
  ;
    postsList.appendChild(listItem)
})

function displayPosts() {
    const postsList = document.getElementById("ul-2");
    postsList.classList.toggle("hide")
}

arrow2.addEventListener('click', displayPosts)