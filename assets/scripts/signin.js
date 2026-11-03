//TODO: make a doc ready function

console.log("in signin dot js");

const signinBtn = document.querySelector("#signin-btn");
const pwdBox = document.querySelector("#pwd-box");
const userBox = document.querySelector("#user-box");

// const hardCodePwd = 'lasagna';
let jsonPassword = ''; 
// TODO:  remove for demo. 
// pwdBox.value = hardCodePwd; 

//fetch()

async function loadOptions(userName) {
  const response = await fetch("../assets/data/users.json");

  if (!response.ok) {
    throw new Error("Could not load local JSON");
  }

  const data = await response.json();
  console.log("json data: ", data);
  
  if(userName == data[0].name){
    // garfied
    jsonPassword = data[0].password; 
    console.log('garfield json pwd: ', jsonPassword); 
  }
  else if(userName == data[1].name){
      jsonPassword = data[1].password; 
      console.log('jon json pwd: ', jsonPassword); 
  } 

}



signinBtn.addEventListener("click", async function () {
  console.log("pwd value: ", pwdBox.value);
  console.log("user value: ", userBox.value);
  const userPwd = pwdBox.value; 
  const userName = userBox.value; 

  await loadOptions(userName);


console.log('use pwd: ', userPwd);
// console.log('hard code pwd: ', hardCodePwd);
//console.log('json pwd: ', jsonPassword);

  if(userPwd == jsonPassword){
    console.log('signed in');
    sessionStorage.setItem('signedIn', 'true');
    // sessionStorage.setItem('signedIn', '');
    console.log('now go to private page');
    //window.location.href = "private.html"
  }
  else{
    console.log('NOT signed in');
    document.querySelector('#message').textContent = "nope. try again."
    //  TODO: try this. document.querySelector('#message').placeholder = "nope. try again."
    pwdBox.value = ''; 
  }

});
