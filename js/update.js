document.addEventListener("DOMContentLoaded", function () {
  let id = new URLSearchParams(window.location.search).get("id");
  if (id) {
    fetch(`https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`there was error${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        document.getElementById("title").value = data.title;
        document.getElementById("description").value = data.description;
        document.getElementById("category").value = data.category;
        document.getElementById("firstname").value = data.editorFirstName;
        document.getElementById("secondname").value = data.editorLastName;
      });
  }
});

function updateNews(event) {
  event.preventDefault();
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let category = document.getElementById("category").value;
  let editorFirstName = document.getElementById("firstname").value;
  let editorLastName = document.getElementById("secondname").value;
  let data = {
    title: title,
    description: description,
    category: category,
    editorFirstName: editorFirstName,
    editorLastName: editorLastName,
  };
  let id = new URLSearchParams(window.location.search).get("id");
  if (id) {
    fetch(`https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          alert("something went wrong");
          throw new Error("response failed");
        }
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("error", error);
      });
  }
}
