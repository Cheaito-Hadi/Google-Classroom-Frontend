const next = document.getElementById("next");

next.addEventListener("click", async () => {
  const email = document.getElementById("email_in").value;

    const data = new FormData();
    data.append("email", email)
  try {
      

    const response = await fetch("http://localhost/Google-Classroom-Backend/signin.php", {
      method: "POST",
      body: data
    });

    const result = await response.json();

    if (result.status === "next step") {
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.log(error);
  }
})