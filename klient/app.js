async function getData() {
  const data = await fetch(
    "http://localhost:80/wordpress/wp-json/wp/v2/comments"
  );

  const json = await data.json();

  console.log(json);

  for (let i in json) {
    const div = document.createElement("div");
    div.classList.add("divy");

    const p = document.createElement("p");
    p.innerHTML = json[i].content.rendered;

    if (
      json[i].content.rendered.includes("kupa") ||
      json[i].content.rendered.includes("Kupa")
    ) {
      div.style.backgroundColor = "red";
      const button = document.createElement("button");
      button.innerHTML = "DELETE";
      button.addEventListener("click", () => {
        changeStatus(json[i].id);
      });
      div.appendChild(button);
    } else {
      console.log("jest git");
    }

    div.appendChild(p);

    document.querySelector("#main").appendChild(div);
  }
}
getData();

async function changeStatus(id) {
  const url = new URL(
    `http://localhost:80/wordpress/wp-json/wp/v2/comments/${id}`
  );

  const data = await fetch(url, {
    method: "DELETE",
    headers: {
      authorization: `Basic ${btoa("Maks:zaq12wsx")}`,
    },
  });
  location.reload();
}
