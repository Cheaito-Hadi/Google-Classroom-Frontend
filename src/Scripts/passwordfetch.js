const recovery = document.getElementById("recovery");

recovery.addEventListener("click", async (e) => {
  e.preventDefault();
  const recovery_email = document.getElementById("recovery-email").value;
  const recovery_answer = document.getElementById("question").value;

try {
  const data = new FormData();
  data.append("email",recovery_email);
  data.append("answer",recovery_answer);
  console.log(data);
  const response = await fetch("http://localhost/Google-Classroom-Backend/forgot.php", {
      method: "POST",
      body: data,
    });


      const responseData = await response.json();
      console.log(responseData)

      if (responseData.status == "success" ) {
        // const password = responseData[0].password;
        const dataContainer = document.getElementById("data-container");
        dataContainer.innerHTML = '';
        const formElement = document.createElement("form");

        const newPasswordInput = document.createElement("input");
        newPasswordInput.setAttribute("type", "password");
        newPasswordInput.classList.add("recovered-password");
        newPasswordInput.setAttribute("placeholder", "Enter new password");

        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit";

        dataContainer.appendChild(formElement);
        formElement.appendChild(newPasswordInput);
        formElement.appendChild(submitButton);

        submitButton.addEventListener("click", async (e) => {
          e.preventDefault();
          const new_password = newPasswordInput.value;

          try {
            const updatePassword = new FormData();
            updatePassword.append("email", recovery_email);
            updatePassword.append("new_password", new_password);

            const request_pass = await fetch("http://localhost/Google-Classroom-Backend/resetPassword.php", {
              method: "POST",
              body: updatePassword,
            });
            console.log(request_pass)
            
              const updatedPass = await request_pass.json();
              if (updatedPass.status === "success") {
                console.log("change password");
              } else {
                console.log("Failed");
              }
           
          } catch (error) {
            console.log(error);
          }
        });
      } else {
        console.log("Sorry, recovery failed");
      }

  } catch (error) {
    console.log(error);
  }
})