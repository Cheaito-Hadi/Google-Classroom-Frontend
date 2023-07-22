let arrow2 = document.getElementById("arrow-2");

classArray = ['tech', 'softskilss', 'uix']
const classesList = document.getElementById("ul-2");

classArray.forEach((post) => {
    let listClass = document.createElement("li")
    listClass.innerHTML = `
  <input type="checkbox">
  <span>${post}</span>`
        ;
    classesList.appendChild(listClass)
})

function displayClasses() {
    const classesList = document.getElementById("ul-2");
    classesList.classList.toggle("hide")
}

arrow2.addEventListener('click', displayClasses)