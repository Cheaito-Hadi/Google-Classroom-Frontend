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



