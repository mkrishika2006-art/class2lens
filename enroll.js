// ===== API URL (Replace later with your Render backend URL) =====
const API_BASE = "https://your-backend.onrender.com"; 

// ===== Camera Setup =====
const video = document.getElementById("camera");
const canvas = document.getElementById("snapshot");
const captureBtn = document.getElementById("captureBtn");

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        alert("Camera access denied!");
        console.error(err);
    });

// ===== Capture Image =====
let capturedImage = null;

captureBtn.addEventListener("click", () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    capturedImage = canvas.toDataURL("image/jpeg");

    alert("Photo captured successfully!");
});

// ===== Submit enrollment =====
document.getElementById("enrollForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!capturedImage) {
        alert("Please capture a photo first!");
        return;
    }

    const name = document.getElementById("studentName").value;
    const reg = document.getElementById("studentReg").value;

    const payload = {
        name: name,
        register_no: reg,
        image: capturedImage
    };

    try {
        const res = await fetch(`${API_BASE}/enroll`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        alert("Student enrolled successfully!");

    } catch (err) {
        console.error(err);
        alert("Enrollment failed!");
    }
});
