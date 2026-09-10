console.log('in private dot js');

const signedIn = sessionStorage.getItem('signedIn');


if(signedIn === 'true'){
    console.log('ye,s singed in');
}
else{
    console.log('no, not sinage in');
    window.location.href = 'signin.html'
}

