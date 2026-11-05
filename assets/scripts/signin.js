const signinBtn = document.querySelector("#signin-btn");
const pwdBox = document.querySelector("#pwd-box");
const userBox = document.querySelector("#user-box");
const message = document.querySelector("#message");

async function findUser(userName, password) {
  const response = await fetch("../assets/data/users.json");

  if (!response.ok) {
    throw new Error("Could not load local JSON");
  }

  // response.json() reads the JSON TEXT (a string) from users.json and PARSES it
  // into a real JS array of objects we can use. (async, so we await it)
  const users = await response.json(); // JSON text from the file -> JS array of objects

  // OLD WAY: hard-code each array item. Breaks as soon as a 3rd user is added,
  // and the password is stored in a global variable.
  //
  // if(userName == data[0].name){
  //   // garfied
  //   jsonPassword = data[0].password;
  //   console.log('garfield json pwd: ', jsonPassword);
  // }
  // else if(userName == data[1].name){
  //     jsonPassword = data[1].password;
  //     console.log('jon json pwd: ', jsonPassword);
  // }

  // NEW WAY: .find() walks the array for us and returns the FIRST user where
  // the function returns true (or undefined if nobody matches).
  // Why it beats a hand-written loop: no counter or index to manage, no
  // "let match = null" variable to set, it stops as soon as it finds a match,
  // and it reads like English: "find the user with this name and password".
  // It works for 2 users or 200 without changing the code.
  return users.find(
    (user) =>
      user.name.toLowerCase() === userName.toLowerCase() &&
      user.password === password,
  );
}

signinBtn.addEventListener("click", async function () {
  try {
    const user = await findUser(userBox.value.trim(), pwdBox.value);

    if (!user) {
      message.textContent = "nope. try again.";
      pwdBox.value = "";
      return;
    }

    const session = {
      username: user.name,
      authenticated: true,
      role: user.role,
    };
    // sessionStorage can ONLY store strings, so JSON.stringify() converts our
    // JS object into a JSON string: '{"username":"Jon","authenticated":true,...}'
    sessionStorage.setItem("session", JSON.stringify(session)); // JS object -> JSON string
    window.location.href = "private.html";
  } catch (error) {
    console.error(error);
    message.textContent = "something went wrong. try again later.";
  }
});
