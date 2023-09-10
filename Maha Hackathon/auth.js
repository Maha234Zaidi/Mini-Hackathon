import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js"
import { getFirestore, addDoc, collection, onSnapshot, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyCn3_uTmHHr0IXrN2HMTxKU0k_-0niBh0c",
    authDomain: "mini-hackathon-b17e5.firebaseapp.com",
    projectId: "mini-hackathon-b17e5",
    storageBucket: "mini-hackathon-b17e5.appspot.com",
    messagingSenderId: "490698101154",
    appId: "1:490698101154:web:2c215bc0cc997ebf0822fb",
    measurementId: "G-L58GNK6DR3"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const database = getFirestore()
const loginButton = document.getElementById('login-btn');
const signupButton = document.getElementById('signup-btn');

// for login

loginButton.addEventListener("click", async (event) => {

    // const emailInput = event.target.elements.email;
    // const passwordInput = event.target.elements.password;

    let formData = {
        email: "maha@gmail.com",
        password: "123456789",
    };

    console.log(formData);

    if (formData.email === "" || formData.password === "") {
        Swal.fire(
            'Error',
            'Please Fill All Fields',
            'error'
        );
    }

    else {
        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then(async (res) => {
                Swal.fire('Success', 'Login Successfully', 'success');
                emailInput.value = '';
                passwordInput.value = '';
                setTimeout(() => {
                    window.location.href = "http://127.0.0.1:5500/index.html"
                }, 2000);
                // const docRef = doc(database, "users", res.user.uid)
                // const user = await getDoc(docRef)
                // console.log(user);
            })
            .catch((err) => {
                console.log(err);
                Swal.fire('Error', err.code, 'error');
            })
    }

})

// for signup

signupButton.addEventListener("click", (event) => {

    event.preventDefault();

    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    let formData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
    };

    console.log(formData);

    if (
        formData.firstName === "" ||
        formData.lastName === "" ||
        formData.email === "" ||
        formData.password === ""
    ) {
        Swal.fire(
            'Error',
            'Please Fill All Fields',
            'error'
        );
    }

    else {
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then(async (res) => {
                const docRef = doc(database, "users", res.user.uid)
                setDoc(docRef, {
                    ...formData,
                    createdAt: new Date()
                })
                Swal.fire('Success', 'Account Created Successfully', 'success');
                firstNameInput.value = '';
                lastNameInput.value = '';
                emailInput.value = '';
                passwordInput.value = '';
                confirmPasswordInput.value = '';
                setTimeout(() => {
                    window.location.href = "http://127.0.0.1:5500/login.html"
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                Swal.fire('Error', err.code, 'error');
            })
    }

})