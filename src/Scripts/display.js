const urlParams = new URLSearchParams(window.location.search);
const classroom_id = urlParams.get("id");
const displayTitles = async () => {
  const data = new FormData();
  data.append("classroom_id", classroom_id);
  try {
    const response = await fetch("http://localhost:8080/stream.php", {
      method: "POST",
      body: data,
    });
    const data = await response.json();
    const assignments = data.assignments;
    // localStorage.setItem("assignments", JSON.stringify(assignments));
    // const class_assignments = JSON.parse(localStorage.getItem("user"));
    const titlesContainer = document.getElementById("titles-container");

    assignments.forEach((data) => {
      const divElement = document.createElement("div");
      const svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgElement.setAttribute("focusable", "false");
      svgElement.setAttribute("width", "24");
      svgElement.setAttribute("height", "24");
      svgElement.setAttribute("viewBox", "0 0 24 24");
      const pathElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      pathElement.setAttribute(
        "d",
        "M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h2v8l2.5-1.5L13 12V4h5v16z"
      );
      svgElement.appendChild(pathElement);
      svgElement.classList.add("mysvg");
      divElement.appendChild(svgElement);
      const titleElement = document.createElement("span");
      titleElement.textContent = `posted a new assignment: ${data.title}`;
      divElement.appendChild(titleElement);
      divElement.classList.add("title-box");
      titlesContainer.appendChild(divElement);
      divElement.addEventListener("click", () => {
        window.location.href = `/src/pages/assignment.html?classroom_id=${classroom_id}&assignment_id=${data.id}`;
      });
    });
  } catch (error) {
    console.log(error);
  }
};
