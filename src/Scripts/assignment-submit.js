const pages = {};

pages.assignment_url =
  "http://localhost/Google-Classroom-Backend/assignments_data.php";
pages.turnedin_url = "http://localhost/Google-Classroom-Backend/turned_in.php";

//Hi it is a small edit, dont forget to delete that

const teacher_names = document.getElementsByClassName("teacher-name");
const assignment_title = document.getElementById("assignment-title");
const assignment_instructions = document.getElementById("instructions");
const assignment_due_date = document.getElementById("due-date");
const assignment_post_date = document.getElementById("start-date");
pages.getAssignmentInfo = async () => {
  try {
    const response = await fetch(pages.assignment_url);
    const json = await response.json();
    json.forEach((element) => {
      const title = element.title;
      const instructions = element.instarction;
      const first_name = element.first_name;
      const last_name = element.last_name;
      const due_date = element.due_date;
      const post_date = element.post_date;

      for (let i = 0; i < teacher_names.length; i++) {
        teacher_names[i].innerHTML += first_name + " " + last_name;
      }
      assignment_title.innerHTML = title;
      assignment_instructions.innerHTML = instructions;
      assignment_due_date.innerHTML = "Due " + due_date;
      assignment_post_date.innerHTML = post_date;
    });
  } catch (e) {
    console.log("Error : " + e);
  }
};

const state = document.getElementById("state");
const btn_add = document.getElementById("btn-add");
const work_uploaded = document.getElementById("work_uploaded");
const mark_as_done = document.getElementById("mark-as-done");

pages.getTurnedIn = async () => {
  try {
    const response = await fetch(pages.turnedin_url);
    const json = await response.json();
    if (json == 0) {
      state.innerHTML = "Assigned";
    } else {
      state.style.color = "black";
      state.innerText = "Turned in";
      btn_add.style.display = "none";
      work_uploaded.style.display = "block";
      mark_as_done.style.display = "none";
    }
  } catch (e) {
    console.log("Error :" + e);
  }
};

const pop = document.getElementById("pop-up-click");
btn_add.addEventListener("click", function () {
  pop.style.display = "flex";
});

document.addEventListener("click", function (event) {
  const target = event.target;
  if (target !== pop && !pop.contains(target) && target !== btn_add) {
    pop.style.display = "none";
  }
});

const link = document.getElementById("link");
const submit_pop = document.getElementById("submit-pop-up");
link.addEventListener("click", function () {
  submit_pop.style.display = "flex";
});

const cancel = document.getElementById("btn-cancel");
cancel.addEventListener("click", function () {
  submit_pop.style.display = "none";
});

document.getElementById("upload_btn").addEventListener("click", function () {
<<<<<<< HEAD
  document.getElementById("fileToUpload").click();
});

document.getElementById("fileToUpload").addEventListener("change", function () {
  handleFileSelect();
});

const student_id = 1; // Replace this with student_id from local storage
const assignment_id = 1; // Replace this with  assignment_id from local storage
function handleFileSelect() {
  const fileInput = document.getElementById("fileToUpload");

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
=======
    document.getElementById("fileToUpload").click();
  });
  
  document.getElementById("fileToUpload").addEventListener("change", function () {
    handleFileSelect();
  });
  const urlParams = new URLSearchParams(window.location.search);
  const assignment_id = urlParams.get("assignment_id");
  function handleFileSelect() {
    const fileInput = document.getElementById("fileToUpload");
    
  
    const formData = new FormData();
    formData.append("fileToUpload", fileInput.files[0]);
    formData.append("student_id", student_id);
    formData.append("assignment_id", assignment_id);
  
    fetch("http://localhost/Google-Classroom-Backend/assignment_uploads.php", {
      method: "POST",
      body: formData,
>>>>>>> 464ab6cc07406fc0dc85dd45ee6b0a7db4839687
    })
    .then(function (data) {
      if (data.message === "File uploaded and data inserted successfully.") {
        submit_pop.style.display = "none";
        btn_add.style.display = "none";
        work_uploaded.style.display = "block";
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

mark_as_done.addEventListener("click", function () {
  const formData = new FormData();
  formData.append("student_id", student_id);
  formData.append("assignment_id", assignment_id);

  fetch("http://localhost/Google-Classroom-Backend/turn_assignment_in.php", {
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
      if (data.message === "Turned in") {
        mark_as_done.style.display = "none";
        state.style.color = "black";
        state.innerText = "Turned in";
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
});
