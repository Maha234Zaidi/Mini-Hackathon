
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword } from "https:www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
  import { getFirestore, addDoc, collection, onSnapshot } from"https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
  
 
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

const button = document.getElementById("submit-btn")

const tbody = document.getElementById("table-body")

button.addEventListener("click", async () => {
    var classTime = document.getElementById("classTime").value;
    var schedule = document.getElementById("schedule").value;
    var teacher = document.getElementById("teacher").value;
    var section = document.getElementById("section").value;
    var course = document.getElementById("course").value;
    var batch = document.getElementById("batch").value;
    if (classTime === "" || schedule === "" || teacher === "" || section === "" || course === "" || batch === "") {
        Swal.fire(
            'Error !',
            'Please fill all required fields !',
            'error'
        )
        return null
    }
    else {
        const formData = {
            classTime,
            schedule,
            teacher,
            section,
            course,
            batch,
        }
        const colRef = collection(database, "classes")
        try {
            await addDoc(colRef, {
                ...formData,
                createdAt: new Date()
            });
            Swal.fire('Success', 'Course Created Successfully', 'success');
            document.getElementById("classTime").value = "";
            document.getElementById("schedule").value = "";
            document.getElementById("teacher").value = "";
            document.getElementById("section").value = "";
            document.getElementById("course").value = "";
            document.getElementById("batch").value = "";
            getData()
        }
        catch (error) {
            console.error("Error adding document: ", error);
            Swal.fire('Error !', 'An error occurred while creating the course.', 'error');
        }
    }
})


function getData() {
    const collectionRef = collection(database, "classes")
    onSnapshot(collectionRef, (snapshot) => {
        snapshot.docs.sort((a, b) => -1).forEach((docc, index) => {
            const d = { ...docc.data(), id: docc.id };
            const tr = document.createElement("tr");

            const indexCell = document.createElement("td");
            indexCell.innerText = index + 1;
            tr.appendChild(indexCell);

            const classTimeCell = document.createElement("td");
            classTimeCell.innerText = d.classTime;
            tr.appendChild(classTimeCell);

            const scheduleCell = document.createElement("td");
            scheduleCell.innerText = d.schedule;
            tr.appendChild(scheduleCell);

            const teacherCell = document.createElement("td");
            teacherCell.innerText = d.teacher;
            tr.appendChild(teacherCell);

            const sectionCell = document.createElement("td");
            sectionCell.innerText = d.section;
            tr.appendChild(sectionCell);

            const courseCell = document.createElement("td");
            courseCell.innerText = d.course;
            tr.appendChild(courseCell);

            const batchCell = document.createElement("td");
            batchCell.innerText = d.batch;
            tr.appendChild(batchCell);

            tbody.appendChild(tr);
        });

    })
}

getData()