console.log("connected to the client side app.js file...");
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".comment-toggle").forEach(function (toggle) {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      var comments = this.parentNode.nextElementSibling;
      comments.style.display =
        comments.style.display === "none" ? "block" : "none";
    });
  });
});
