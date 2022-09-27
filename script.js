// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAmwF9f_NcLZKyfkBd085ei6naKD3w2XWY",
    authDomain: "metrik-2021.firebaseapp.com",
    databaseURL: "https://metrik-2021-default-rtdb.firebaseio.com",
    projectId: "metrik-2021",
    storageBucket: "metrik-2021.appspot.com",
    messagingSenderId: "1010705620781",
    appId: "1:1010705620781:web:3f37a31e5750531d223da4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const form = document.querySelector("form"),
    fileInput = document.querySelector(".file-input"),
    progressArea = document.querySelector(".progress-area"),
    dropArea = document.querySelector(".drag-area"),
    button = dropArea.querySelector(".fas fa-cloud-upload-alt"),
    input = dropArea.querySelector("input"),
    dragText = dropArea.querySelector("h3"),
    uploadedArea = document.querySelector(".uploaded-area");

$(document).ready(function() {
    $('input[id^=file]').hide();
    $('.drag-area').click(function() {
        $(this).prev('input').click();
    })
});


let file;
// input.addEventListener("change", function() {
//     //getting user select file and [0] this means if user select multiple files then we'll select only the first one
//     file = this.files[0];
//     dropArea.classList.add("active");
//     if (file) {
//         let fileName = file.name;
//         if (fileName.length >= 12) {
//             let splitName = fileName.split('.');
//             fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
//         }
//         uploadFile(file, fileName);
//     } //calling function
// });
//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add("active");
    dragText.textContent = "Browse file or drag here to upload";
});
//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Browse file or drag here to upload";
});
//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = event.dataTransfer.files[0];
    if (file) {
        let fileName = file.name;
        if (fileName.length >= 12) {
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
        }
        uploadFile(file, fileName);
    } //calling function
});


form.addEventListener("click", () => {
    fileInput.click();
});

fileInput.onchange = ({
    target
}) => {
    let file = target.files[0];
    if (file) {
        let fileName = file.name;
        if (fileName.length >= 12) {
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
        }
        uploadFile(file, fileName);
    }
}

function uploadFile(berkas, name) {
    var storage = firebase.storage().ref(name);
    var upload = storage.put(berkas);
    upload.on("state_changed",
        function progress(snapshot) {
            var percentage =
                Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            // document.getElementById("progress").value = percentage;
            let progressHTML = `<li class="row2">
                      <i class="fas fa-file-alt"></i>
                      <div class="content">
                        <div class="details">
                          <span class="name">${name} • Uploading</span>
                          <span class="percent">${percentage}%</span>
                        </div>
                        <progress value="${percentage}" max="100" id="progress"></progress>
                      </div>
                    </li>`;
            uploadedArea.classList.add("onprogress");
            progressArea.innerHTML = progressHTML;
        },

        function error() {
            alert("error uploading file");
        },

        function complete() {
            progressArea.innerHTML = "";
            let uploadedHTML = `<li class="row2">
                        <div class="content upload">
                          <i class="fas fa-file-alt"></i>
                          <div class="details">
                            <span class="name">${name} • Uploaded</span>
                          </div>
                        </div>
                        <i class="fas fa-check"></i>
                      </li>`;
            uploadedArea.classList.remove("onprogress");
            uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
        }
    );
}