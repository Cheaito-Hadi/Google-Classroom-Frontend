let arrow2 = document.getElementById("arrow-2");

classArray = ['tech', 'softskilss', 'uix']
const classesList = document.getElementById("ul-2");

classArray.forEach((post) => {
    let listClass = document.createElement("li")
    listClass.innerHTML = `
  <input name="class_room_id" type="checkbox">
  <span>${post}</span>`
        ;
    classesList.appendChild(listClass)
})

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
        formData.append("title", description)
        formData.append("instruction", instruction)
        formData.append("due_date", due_date)

        let options = {
            method: 'POST',
            body: formData
        }
        try {
            const response = await fetch("http://localhost/Google-Classroom-Backend/addAssignment.php", options)
            let json = await response.json();
        }
        catch (e){
            console.log("Failed to fetch", e)
        }
    })

}
addAssignment();