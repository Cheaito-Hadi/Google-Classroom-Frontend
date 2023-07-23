const displayTitles = async () => {
  try {
    const response = await fetch("http://localhost:8080/Google-Classroom-Backend/stream.php");
    const data = await response.json();


  const titlesContainer = document.getElementById("titles-container");

    data.forEach(title => {
      const divElement = document.createElement("div");
      divElement.textContent = title;
      divElement.classList.add("title-box");
      titlesContainer.appendChild(divElement);
    });
  } catch(error) {console.log(error)};
};
