const recovery = document.getElementById("recovery");

recovery.addEventListener("click", async(e) => {
  e.preventDefault();
  const recovery_email  = document.getElementById("recovery-email").value;

try {
  const data = new FormData();
  data.append("email",recovery_email);
  console.log(data);
  const response = await fetch("http://localhost:8080/forgot.php", {
      method: "POST",
      body: data
      })

if (response.ok) {
  const responseData = await response.json();

  if (responseData.length > 0) {
    const password = responseData[0].password;
    const dataContainer = document.getElementById("data-container");
    dataContainer.innerHTML = '';
    const divElement = document.createElement("div");
    divElement.textContent = `your password is: ${password}`;
    dataContainer.appendChild(divElement);
  }
}
} catch(error) {
  console.log(error)
}
})