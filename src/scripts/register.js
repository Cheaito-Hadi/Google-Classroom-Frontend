register = () => {
    const reg_btn = document.getElementById("register-btn")

    reg_btn.addEventListener('click', (e) => {
        e.preventDefault()

        let first_name = document.getElementById("first-name").value;
        let last_name = document.getElementById("last-name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let question = document.getElementById("security").value;


        let formdata = new FormData();

        formdata.append("first_name", first_name);
        formdata.append("last_name", last_name);
        formdata.append("email", email);
        formdata.append("password", password);
        formdata.append("question",question);

        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(
          "http://localhost/Google-Classroom-Backend/register.php",
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.status == "success") {
              window.location.href = "/index.html";
            } else {
              document.querySelector(".already-exist").innerHTML =
                "email is already exist";
            }
          })
          .catch((error) => console.error(error));


    })
}
register();