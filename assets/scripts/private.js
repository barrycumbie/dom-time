// get the session we saved at sign-in.
// getItem gives back a JSON string (or null if nothing is saved);
// JSON.parse() converts that string back into a JS object so we can use
// session.role, session.username, etc. (JSON.parse(null) is just null)
const session = JSON.parse(sessionStorage.getItem("session"));

if (!session || !session.authenticated) {
  // not signed in, go sign in
  window.location.href = "signin.html";
} else {
  document.querySelector("#welcome").textContent =
    "welcome, " + session.username + " (" + session.role + ")";

  // front-end only: hiding the link is not real security
  if (session.role === "admin") {
    document.querySelector("#admin-link").hidden = false;
  }

  document.querySelector("#signout-btn").addEventListener("click", function () {
    sessionStorage.removeItem("session");
    window.location.href = "signin.html";
  });
}
