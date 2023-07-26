const next = document.getElementById("next")
const email_container = document.querySelector(".container-email")
const password_container = document.querySelector(".container-password")
password_container.style.display = "none"


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
            localStorage.setItem("email", JSON.stringify(email));
            email_container.style.display = "none"
            password_container.style.display = "block"
        }
        else {
            console.error("User not found");
        }
    } catch (error) {
        console.error(error);
    }
})
    const login = document.getElementById("login")
    login.addEventListener("click", async () => {
      const password = document.getElementById("password").value;
      const user_email = JSON.parse(localStorage.getItem("email"));

      const data = new FormData();

      data.append("email", user_email);
      data.append("password", password);
      try {
        const response = await fetch(
          "http://localhost/Google-Classroom-Backend/password.php",
          {
            method: "POST",
            body: data,
          }
        );

        const result = await response.json();

        if (result.status === "logged-in") {
          window.location.href = "/src/pages/landing-page.html";
          localStorage.setItem("user", JSON.stringify(result.user));
        } else {
          document.querySelector(".wrong-password").innerHTML =
            "Wrong password";
        }
      } catch (error) {
        console.error(error);
      }
    });
