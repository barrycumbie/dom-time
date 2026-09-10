// $('#signinBtn').on('click', function () {

// });

console.log("in signin dot js");

const signinBtn = document.querySelector("#signin-btn");
const pwdBox = document.querySelector("#pwd-box");
const hardCodePwd = 'lasagna';
// TODO:  remove for demo. 
pwdBox.value = hardCodePwd; 

signinBtn.addEventListener("click", function () {
  console.log("pwd value: ", pwdBox.value);

  const userPwd = pwdBox.value; 
//   IF password is lasagna
//     signed in!
// ELSE
//     show an error

// pwdBox.value === lasagna

console.log('use pwd: ', userPwd);
console.log('hard code pwd: ', hardCodePwd);

  if(userPwd == hardCodePwd){
    console.log('signed in');
    sessionStorage.setItem('signedIn', 'true');
    // sessionStorage.setItem('signedIn', '');
    window.location.href = "private.html"
  }
  else{
    console.log('NOT signed in');
    document.querySelector('#message').textContent = "nope. try again."
    //  TODO: try this. document.querySelector('#message').placeholder = "nope. try again."
    pwdBox.value = ''; 
  }

});

// demo stuff

// gets an id, 1 dom element
const inputBoxId = document.getElementById("pwd-box");
// get an array of all the elemetns with that class [ ]
const inputBoxesClass = document.getElementsByClassName("pwd-class");
// get an array of all the elemetns with that tag [oneinputbox]
const inputBoxesTag = document.getElementsByTagName("input");
