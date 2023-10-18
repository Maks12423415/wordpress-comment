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
      div.appendChild(button);
    } else {
      console.log("jest git");
    }

    if (comment.post && comment.post !== 0) {
      const post = await fetchPost(comment.post);
      if (post) {
        const h1 = document.createElement("h1");
        h1.innerHTML = post.title.rendered;
        div.appendChild(h1);
      }
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
  await fetch(url, {
    method: "DELETE",
    headers: {
      authorization: `Basic ${btoa("Maks:zaq12wsx")}`,
    },
  });
  location.reload();
}

getData();
