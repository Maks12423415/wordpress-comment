async function getData() {
  const commentsData = await fetch(
    "http://localhost/wordpress/wp-json/wp/v2/comments"
  );
  const comments = await commentsData.json();

  for (let i in comments) {
    const comment = comments[i];
    const div = document.createElement("div");
    div.classList.add("divy");
    const p = document.createElement("p");
    p.innerHTML = comment.content.rendered;

    if (comment.post && comment.post !== 0) {
      const post = await fetchPost(comment.post);
      if (post) {
        const h1 = document.createElement("h1");
        h1.innerHTML = post.title.rendered;
        div.appendChild(h1);
      }
    }

    if (
      comment.content.rendered.includes("kupa") ||
      comment.content.rendered.includes("Kupa")
    ) {
      div.style.backgroundColor = "red";
      const button = document.createElement("button");
      button.innerHTML = "DELETE";
      button.addEventListener("click", () => {
        changeStatus(comment.id);
      });

      const button2 = document.createElement("button");
      button2.innerHTML = "Dopowiedz";
      button2.addEventListener("click", () => {
        odp(comment.id);
      });
      div.appendChild(button2);
      div.appendChild(button);
    } else {
      console.log("jest git");
    }

    div.appendChild(p);
    document.querySelector("#main").appendChild(div);
  }
}

async function fetchPost(postId) {
  const url = new URL(
    `http://localhost/wordpress/wp-json/wp/v2/posts/${postId}`
  );
  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Basic ${btoa("Maks:zaq12wsx")}`,
    },
  });
  return data.json();
}

async function changeStatus(commentId) {
  const url = new URL(
    `http://localhost/wordpress/wp-json/wp/v2/comments/${commentId}`
  );
  const data2 = await fetch(url, {
    method: "DELETE",
    headers: {
      authorization: `Basic ${btoa("Maks:zaq12wsx")}`,
    },
  });
  location.reload();
}

getData();

async function odp(id) {
  const url3 = new URL(
    `http://localhost/wordpress/wp-json/wp/v2/comments/${id}`
  );
  const tresc = prompt("Wprowadź tresc odpowiedzi");
  const data3 = await fetch(url3, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Basic ${btoa("Maks:zaq12wsx")}`,
    },
    body: JSON.stringify({
      post: id,
      content: tresc,
    }),
  });
  //location.reload();
}
