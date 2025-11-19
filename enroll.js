document.getElementById("enrollForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("studentName").value;
    const regno = document.getElementById("studentReg").value;
    const file = document.getElementById("photo").files[0];

    if (!file) {
        alert("Please upload a photo");
        return;
    }

    const formData = new FormData();
    formData.append("name", name);      // MUST MATCH FASTAPI
    formData.append("regno", regno);    // MUST MATCH FASTAPI
    formData.append("photo", file);     // MUST MATCH FASTAPI

    try {
        const response = await fetch("http://127.0.0.1:8000/enroll", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        document.getElementById("status").textContent = result.message;
    } catch (error) {
        document.getElementById("status").textContent =
            "Enrollment failed — backend not reachable.";
    }
});
