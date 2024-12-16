let signupForm = document.getElementById("signupForm");
let signupName = document.getElementById("signupName");
let signupEmail = document.getElementById("signupEmail");
let signupPassword = document.getElementById("signupPassword");
let selectedInput = document.querySelectorAll(".selectedInput");
let exist= document.getElementById("exist");
let success= document.getElementById("success");
let signinForm = document.getElementById("signinForm");
let signinEmail = document.getElementById("signinEmail");
let signinPassword = document.getElementById("signinPassword");
let invalid=document.getElementById('invalid');
let username=document.getElementById('username');
let logOut=document.getElementById('logout');

let users = [];
if(localStorage.getItem('allUsers')!=null){
    users=JSON.parse(localStorage.getItem('allUsers'))
}
signupForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    let user = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    if (validation(signupName.id, signupName.value) &&
    validation(signupEmail.id, signupEmail.value) &&
    validation(signupPassword.id, signupPassword.value)&&!isExist(users,user)) {
        users.push(user);
        localStorage.setItem('allUsers',JSON.stringify(users));
        success.classList.replace('d-none','d-block');
        setTimeout(function(){
            window.location.href='./index.html'
        },2000)
        console.log(users);
    }

});
for (let i = 0; i < selectedInput.length; i++) {
    selectedInput[i].addEventListener('input', function (e) {
        let inputId = e.target.id;
        let inputValue = e.target.value;
        validation(inputId, inputValue);
    })
}
function validation(id, value) {
    let regex = {
        signupName: /^[a-z]{3,15}/,
        signupEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        signupPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        resetPass: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    }
    let element = document.getElementById(id);
    let alerMsg = document.getElementById(id + "Error");
    if (regex[id].test(value) == true) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        alerMsg.classList.replace("d-block", "d-none");
        return true;

    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        alerMsg.classList.replace("d-none", "d-block");
        return false;
    }
    
}
let index;
function isExist(arr,object){
    for(let i=0;i<arr.length;i++){
        if(arr[i].email==object.email){
            index=i;
            console.log('email is exist');
            exist?.classList.replace('d-none','d-block');
            return true
        }
    }
    console.log('email is not exist');
    exist?.classList.replace('d-block','d-none')
    return false;

}
signinForm?.addEventListener('submit',function(e){
    e.preventDefault();
    let signinUser={
        email:signinEmail.value,
        password:signinPassword.value,
    }
    if(isExist(users,signinUser)&&users[index].password==signinUser.password){
        console.log('exist');
        console.log(index)
        invalid.classList.replace('d-block','d-none');
        setTimeout(function() {
            window.location.href='./home.html'
        },1000);
        localStorage.setItem('userName',users[index].name)
    }else{
        console.log('not exist');
        invalid.classList.replace('d-none','d-block');

    }
})
if(localStorage.getItem('userName')!=null){
    username.innerHTML +=localStorage.getItem("userName");
}
logOut?.addEventListener('click',function(){
    localStorage.removeItem('userName');
    window.location.href='./index.html'
})
