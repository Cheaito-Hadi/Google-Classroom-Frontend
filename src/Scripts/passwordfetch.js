const recovery = document.getElementById("recovery");

recovery.addEventListener("click", async (e) => {
  e.preventDefault();
  const recovery_email = document.getElementById("recovery-email").value;
  const recovery_answer = document.getElementById("question").value;

  try {
    const data = new FormData();
    data.append("email", recovery_email);
    data.append("answer", recovery_answer);
    console.log(data);
    const response = await fetch("http://localhost:8080/forgot.php", {
      method: "POST",
      body: data,
    });
    if (response.ok) {
      const responseData = await response.json();

        const password = responseData[0].password;
        const dataContainer = document.getElementById("data-container");
        dataContainer.innerHTML = '';
        const formElement = document.createElement("form");

        const newPasswordInput = document.createElement("input");
        newPasswordInput.setAttribute("type", "password");
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
            const updateData = new FormData();
            updateData.append("email", recovery_email);
            updateData.append("answer", recovery_answer);
            updateData.append("new_password", new_password);

            const updateResponse = await fetch("http://localhost:8080/forgot.php", {
              method: "POST",
              body: updateData,
            });

            if (updateResponse.ok) {
              const updateResult = await updateResponse.json();
              if (updateResult.status === "success") {
                console.log("Password updated successfully!");
              } else {
                console.log("Failed to update password.");
              }
            } else {
              console.log("Failed to update password. Server response not OK.");
            }
          } catch (error) {
            console.log(error);
          }
        });
      }
    } catch(error) {
      console.log(error);
    }
  })
