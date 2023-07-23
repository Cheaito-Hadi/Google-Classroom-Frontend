    register = () => {
    const reg_btn = document.getElementById("register-btn")

    reg_btn.addEventListener('click', (e) => {
        e.preventDefault()

        let first_name = document.getElementById("first-name").value
        let last_name = document.getElementById("last-name").value
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value


        let formdata = new FormData();

        formdata.append("first-name", first_name);
        formdata.append("last-name", last_name);
        formdata.append("email", email);
        formdata.append("password", password);

        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("", requestOptions)
            .then(response => console.log(response.json()))
            .catch(error => console.log(error))

    })
}