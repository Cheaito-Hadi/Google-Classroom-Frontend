const pages = {}

pages.assignment_url ="http://localhost/Google-Classroom-Backend/assignments.php"
pages.turnedin_url ="http://localhost/Google-Classroom-Backend/turned_in.php"

const teacher_names = document.getElementsByClassName("teacher-name")
const assignment_title = document.getElementById("assignment-title")
const assignment_instructions =document.getElementById("instructions")
const assignment_due_date = document.getElementById("due-date")
const assignment_post_date = document.getElementById("start-date")
const state =document.getElementById("state")
const btn_add =document.getElementById("btn-add")
const pop = document.getElementById("pop-up-click")
const link =document.getElementById("link")
const submit_pop = document.getElementById("submit-pop-up")
const cancel =document.getElementById("btn-cancel")
const work_uploaded =document.getElementById("work_uploaded")
pages.getAssignmentInfo = async () => {
    try{
        const response = await fetch(pages.assignment_url)
        const json = await response.json()
        json.forEach(element => {
            const title = element.title
            const instructions = element.instarction
            const first_name = element.first_name
            const last_name =element.last_name
            const due_date = element.due_date
            const post_date = element.post_date

            for(let i =0; i<teacher_names.length ;i++){
                teacher_names[i].innerHTML+=first_name +" "+ last_name
            }
            assignment_title.innerHTML = title
            assignment_instructions.innerHTML = instructions
            assignment_due_date.innerHTML = "Due "+ due_date
            assignment_post_date.innerHTML=post_date
        });
    }
    catch(e){
        console.log("Error : "+e)
    }
}
pages.getTurnedIn = async () => {
    try{
        const response = await fetch(pages.turnedin_url)
        const json = await response.json()
        if(json == 0 ){
            state.innerHTML = "Assigned"
        }
        else{
            state.style.color="black"
            state.innerText ="Turned in"
        }
    }
    catch(e){
        console.log("Error :" +e)
    }
}
btn_add.addEventListener('click',function(){
    pop.style.display='flex'
})
document.addEventListener('click',function(event){
    const target = event.target;
    if (target !== pop && !pop.contains(target) && target !== btn_add) {
        pop.style.display = 'none';
    }
})
link.addEventListener('click',function(){
    submit_pop.style.display="flex"
})
cancel.addEventListener('click',function(){
    submit_pop.style.display="none"
})

document.getElementById("upload_btn").addEventListener("click", function () {
    document.getElementById("fileToUpload").click();
  });
  
  document.getElementById("fileToUpload").addEventListener("change", function () {
    handleFileSelect();
  });

  function handleFileSelect() {
    const fileInput = document.getElementById("fileToUpload");
    const student_id = 2; // Replace this with student_id from local storage
    const assignment_id = 2; // Replace this with  assignment_id from local storage
  
    const formData = new FormData();
    formData.append("fileToUpload", fileInput.files[0]);
    formData.append("student_id", student_id);
    formData.append("assignment_id", assignment_id);
  
    fetch("http://localhost/Google-Classroom-Backend/assignment_uploads.php", {
      method: "POST",
      body: formData,
    })
      .then(function (response) {
        if (!response.ok) {
          console.log("Network response was not ok");
        }
        return response.json();
      })
      .then(function (data) {
        if(data.message === "File uploaded and data inserted successfully."){
            submit_pop.style.display="none"
            btn_add.style.display="none"
            work_uploaded.style.display="block"
        }
        
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  }





 
  

  
