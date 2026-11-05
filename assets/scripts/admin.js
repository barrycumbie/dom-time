// get the session we saved at sign-in.
// getItem gives back a JSON string (or null if nothing is saved);
// JSON.parse() converts that string back into a JS object so we can use
// session.role, session.username, etc. (JSON.parse(null) is just null)
const session = JSON.parse(sessionStorage.getItem("session"));

if (!session || !session.authenticated) {
  // not signed in, go sign in
  window.location.href = "signin.html";
} else if (session.role !== "admin") {
  // signed in, but not allowed here
  window.location.href = "private.html";
} else {
  // front-end only: this check is not real security
  document.querySelector("#admin-content").hidden = false;
  document.querySelector("#signout-btn").addEventListener("click", function () {
    sessionStorage.removeItem("session");
    window.location.href = "signin.html";
  });
  showAdmin();
}

async function showAdmin() {
  // the same appState object index.html uses (JSON string -> JS object)
  let appState = JSON.parse(sessionStorage.getItem("appState"));

  // if the admin never visited index.html, there's no data yet: fetch it
  if (!appState) {
    const response = await fetch("../assets/data/socks.json");
    appState = {
      app: { name: "Sock Finder", version: "0.1" },
      user: session,
      data: await response.json(),
      session: { started: new Date().toISOString() },
    };
    sessionStorage.setItem("appState", JSON.stringify(appState));
  }

  // CURRENT USER
  document.querySelector("#user-info").textContent =
    "User: " + session.username +
    " | Role: " + session.role +
    " | Authenticated: " + session.authenticated;

  // APP DATA + delete controls
  const list = document.querySelector("#record-list");
  list.innerHTML = "";
  document.querySelector("#record-count").textContent =
    appState.data.length + " records";

  appState.data.forEach(function (sock) {
    const li = document.createElement("li");
    li.textContent = sock.title + " ";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.addEventListener("click", function () {
      appState.data = appState.data.filter(function (s) {
        return s.id !== sock.id;
      });
      sessionStorage.setItem("appState", JSON.stringify(appState));
      showAdmin(); // render again with the new state
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  // sessionStorage KEYS
  const keys = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    keys.push(sessionStorage.key(i));
  }
  document.querySelector("#storage-keys").textContent = keys.join(", ");

  // APP STATE as readable JSON: object -> string. (null, 2) = pretty-print
  document.querySelector("#app-state-output").textContent = JSON.stringify(
    appState,
    null,
    2,
  );

  // DEBUG info the browser gives us
  document.querySelector("#debug-info").textContent =
    "Now: " + new Date().toLocaleString() + "\n" +
    "Page: " + window.location.href + "\n" +
    "Browser: " + navigator.userAgent + "\n" +
    "Session started: " + appState.session.started;
}
