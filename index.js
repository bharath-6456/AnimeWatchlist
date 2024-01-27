import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js"
import { getDatabase, ref, push, onValue ,remove } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"

// Your web app's Firebase configuration. You will get this when you create a new Firebase project.
const firebaseConfig = {
    // apiKey: "AIzaSyC675xxdqjY2OW126DGcu4bhUj7rXjSSJs",
    // authDomain: "sample-project-2c26b.firebaseapp.com",
    databaseURL: "hhttps://anime-25afd-default-rtdb.asia-southeast1.firebasedatabase.app/",
    // projectId: "sample-project-2c26b",
    // storageBucket: "sample-project-2c26b.appspot.com",
    // messagingSenderId: "509954440541",
    // appId: "1:509954440541:web:302418a276a432cc3a7cb4"
}

// Your web app's Firebase configuration
const app = initializeApp(firebaseConfig)

const database = getDatabase(app)

const thingsRef = ref(database, "things")

const inputFieldEl = document.getElementById("input-field")
const pushButtonEl = document.getElementById("push")
const thingsEl = document.getElementById("things")

pushButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    
    push(thingsRef, inputValue)
    inputFieldEl.value=""
})

onValue(thingsRef, function(snapshot) {
    if (snapshot.exists()) {
        let things = Object.entries(snapshot.val())

        thingsEl.innerHTML = ""
        
        for (let i = 0; i < things.length; i++) {
            let c=things[i]
            let cid=c[0]
            let cval=c[1]
            addtolist(c)   
        }   
    } else {
        thingsEl.innerHTML = "No things yet"
    }
})
function addtolist(item){
    let itemid=item[0]
    let itemval=item[1]
    let newel=document.createElement("li")
    newel.textContent=itemval
    newel.addEventListener("click",function(){
        
        let loctodel = ref(database, `things/${itemid}`)

        remove(loctodel)
        
    })
    thingsEl.append(newel)
}