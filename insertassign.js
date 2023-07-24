const assignments = document.getElementById("assign")


assignments.addEventListener("click", async() => {
    const instructions = document.getElementById("instructions").value;
    const title = document.getElementById("description").value;
    const topic = document.getElementById("topic").value;
    const date = '2023-07-23';
    const teacherid = 10;
    const classroomid = 10;
    try {
      const data = new FormData();
      data.append("instructions", instructions);
      data.append("title", title);
      data.append("topic", topic);
      data.append("due_date", date);
      data.append("teacherid",teacherid);
      data.append("classroomid",classroomid);
  
  
      // const response = await fetch("http://127.0.0.1:8001/Google-Classroom-Backend/teachers/assignments.php", {
      //   method: "POST",
      //   body: data,
      //   headers: {
      //     "Content-type": "application/json;"
      //   }
      // })

      const response = await fetch("http://localhost:8080/teachers/assignments.php", {
        method: "POST",
        body: data
        })
    } catch (error) {
      console.log(error)
    }
  })