document.addEventListener("DOMContentLoaded", function () {
  fetch("https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`there was error${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      let tBody = document.getElementById("tableBody");
      data?.map((item) => {
        const rowHTML = `
            <tr data-id="${item.id}">
              <td class="grayText">${item.id}</td>
              <td>${item.title}</td>
              <td>${item.category}</td>
              <td>${item.likes}</td>
              <td class="grayText">${item.dateUpdated}</td>
              <td class="grayText">${item.dateCreated}</td>
              <td>
                <div class="buttonContainer">
                  <button class="button" onclick="handleDelete(${item.id})">Delete</button>
                  <a href="update.html?id=${item.id}" class="button">Update</a>
                </div>
              </td>
            </tr>
          `;
        tBody.insertAdjacentHTML("beforeend", rowHTML);
      });
    })
    .catch((error) => {
      console.error("there was error", error);
    });
});
function handleDelete(id) {
  fetch(`https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("response failed");
      }
      const deleteRowWithAnimation = document.querySelector(
        `tr[data-id="${id}"]`
      );

      deleteRowWithAnimation.classList.add("deleteAnimation");
      setTimeout(() => {
        deleteRowWithAnimation.classList.add("deleted");
      }, 500);
    })
    .catch((error) => {
      console.error("error", error);
    });
}

function addNews(event) {
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

  fetch(`https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news`, {
    method: "POST",
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
