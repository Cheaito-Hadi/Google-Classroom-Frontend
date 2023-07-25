let arrow2 = document.getElementById("arrow-2");

// classArray = ['tech', 'softskilss', 'uix'] 
//    const response = await fetch(
//      "http://localhost/Google-Classroom-Backend/get_classes.php",);
//    let json = await response.json();
//    const classes=json.classes;
//   const urlParams = new URLSearchParams(window.location.search);
//   const classroom_id = urlParams.get("id");

const classesList = document.getElementById("ul-2");

const classes = JSON.parse(localStorage.getItem("classes"));
const teacher = JSON.parse(localStorage.getItem("teacher"));


const teacher_classes = new Set();

for (let i = 0; i < teacher.length; i++) {
  teacher_classes.add(teacher[i].classRoom_id);
}

// const techer_matching_class = teacher.find(
//   (obj) => obj.classRoom_id === classroom_id
// );
// const teacher_id = techer_matching_class.id;

classes.forEach((post) => {
    if (teacher_classes.has(post.id)) {
      let listClass = document.createElement("li");
      listClass.innerHTML = `
        <input name="class_room_id" type="checkbox" value="${post.id}">
        <span>${post.name}</span>`;
      classesList.appendChild(listClass);
    }
});
  const checkbox = listClass.querySelector('input[name="class_room_id"]');
let class_room_id;
  checkbox.addEventListener('change', (event) => {
    if (event.target.checked) {
    class_room_id = event.target.value;
    }
});
function displayClasses() {
    const classesList = document.getElementById("ul-2");
    classesList.classList.toggle("hide")
}

arrow2.addEventListener('click', displayClasses)

function addAssignment() {

    let assign = document.getElementById("assign")
    assign.addEventListener('click', async function () {
      let description = document.getElementById("title").value;
      let instruction = document.getElementById("instruction").value;
      let due_date = document.getElementById("due_date").value;

      let formData = new FormData();
      formData.append("title", description);
      formData.append("instruction", instruction);
      formData.append("due_date", due_date);
      formData.append("class_room_id", class_room_id);
      const techer_matching_class = teacher.find(
        (obj) => obj.classRoom_id === class_room_id
      );
      const teacher_id = techer_matching_class.id
      formData.append("techer_id", teacher_id);

      let options = {
        method: "POST",
        body: formData,
      };
      try {
        const response = await fetch(
          "http://localhost/Google-Classroom-Backend/addAssignment.php",
          options
        );
        let json = await response.json();
      } catch (e) {
        console.log("Failed to fetch", e);
      }
    })

}
addAssignment();

document.querySelector(".exit").addEventListener("click", () => {
  window.location.href = `/src/pages/classwork.html?id=${classroom_id}`;
});