const announcements = document.getElementById("announce");

announcements.addEventListener("click", async (e) => {
  e.preventDefault();
  const teacher_id = document.getElementById("ins-id").value;
  const announce_title = document.getElementById("announce-title").value;
  const announce_text = document.getElementById("announce-text").value;
  const files = "abc.docx";
  const classroom_id = 10;

  try {
    const data = new FormData();
<<<<<<< HEAD
    data.append("teacher_id", teacher_id);
    data.append("title", announce_title);
    data.append("announcement", announce_text);
    data.append("files", files);
    data.append("classroom_id", classroom_id);
    const response = await fetch(
      "http://localhost:8080/announcements/announce.php",
      {
        method: "POST",
        body: data,
      }
    );
  } catch (error) {
=======
    data.append("teacher_id",teacher_id);
    data.append("title",announce_title);
    data.append("announcement",announce_text);
    data.append("files",files);
    data.append("classroom_id",classroom_id);
    const response = await fetch("http://localhost:8080/Google-Classroom-Backend/announce.php", {
      method: "POST",
      body: data
      })
  } catch(error) {
>>>>>>> 5a94f2b7cc435435e75ff468d5b3c54eff5b68d1
    console.log(error);
  }
});
