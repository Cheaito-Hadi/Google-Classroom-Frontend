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
        let description = document.getElementById("description").value;
        let instructions = document.getElementById("instructions").value;
        let time = document.getElementById("time").value;

        let formData = new FormData();
        formData.append("title", description)
        formData.append("instarction", instructions)
        formData.append("due_date", time)

        let options = {
            method: "POST",
            body: formData
        }
        try {
            const response = await fetch("http://localhost/Google-Classroom-Backend/addAssignment.php", options)
            let json = response.json()
            console.log(json)
        }
        catch (e){
            console.log("Failed to fetch", e)
        }
    })

}