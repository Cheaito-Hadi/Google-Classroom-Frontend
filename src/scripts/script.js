const pages = {}

pages.assignment_url ="http://localhost/Google-Classroom-Backend/assignments.php"
const post_date =0
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
            post_date = element.post_date
        });
    }
    catch(e){
        console.log("Error : "+e)
    }
}
console.log(post_date)






// pages.getStudent = async  () =>{
//     try{
//       const response = await fetch(pages.student_url)
//       const json = await response.json()
//       json.forEach(student => {
//           const s_firstName = student.first_name;
//           const s_lastName = student.last_name;
//           const new_item = pages.createItem(s_firstName,s_lastName)
//           student_body.innerHTML += new_item
//       });
      
//     }
//     catch(e){
//       console.log("Error: "+e)
//     }
  
//   }