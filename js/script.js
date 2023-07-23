const next = document.getElementById("next");

next.addEventListener("click", async () => {
  const email = document.getElementById("email_in").value;

  try {
    const data = {
      email: email,
    };

    const response = await fetch("http://localhost/Google-Classroom-Backend/signin.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.status === "next step") {
      window.location.href = "password.html";
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.log(error);
  }
})