const display_announcements = async () => {
  const get_announcements = document.getElementById("announce");

  get_announcements.addEventListener("click", async (e) => {
    try {
      const response = await fetch(
        "http://localhost:8080/announcements/displayannounce.php"
      );
      const data = await response.json();
      const announcement_titles = data.titles;
      console.log(data.titles);
      const announce_container = document.getElementById("titles-container");

      announce_container.innerHTML = "";

      announcement_titles.forEach((title) => {
        if (title.trim() !== "") {
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
          titleElement.textContent = `posted a new announcement: ${title}`;
          divElement.appendChild(titleElement);
          divElement.classList.add("title-box");
          announce_container.appendChild(divElement);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
};
