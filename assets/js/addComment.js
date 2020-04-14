import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commentString = document.getElementById("jsCommentString");
const deleteBtns = commentList.querySelectorAll("button");

function decreaseNumberComment() {
  let changeNumber = parseInt(commentNumber.innerText, 10) - 1;

  if (changeNumber === 1) {
    commentNumber.innerText = changeNumber;
    commentString.innerText = " comment";
  } else {
    commentNumber.innerText = changeNumber;
    commentString.innerText = " comments";
  }
}
async function deleteComment(event) {
  const li = event.target.parentElement;
  const text = event.target.parentElement.firstElementChild.innerText;
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/delete`,
    method: "POST",
    data: {
      text,
    },
  });

  if (response.status === 200) {
    decreaseNumberComment();
    li.removeChild(event.target.parentElement.firstElementChild);
    li.removeChild(event.target.parentElement.lastElementChild);
  }
}

function increaseNumber() {
  let changeNumber = parseInt(commentNumber.innerText, 10) + 1;

  if (changeNumber === 1) {
    commentNumber.innerText = changeNumber;
    commentString.innerText = " comment";
  } else {
    commentNumber.innerText = changeNumber;
    commentString.innerText = " comments";
  }
}

const addComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  span.innerHTML = comment;
  deleteBtn.innerHTML = "X";
  deleteBtn.addEventListener("click", deleteComment);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  deleteBtns.forEach((button) => addEventListener("click", deleteComment));
}

if (addCommentForm) {
  init();
}
