
const visitorForm = document.querySelector("#visitor-form");
const continueButton = document.querySelector("#continue-button");

visitorForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const visitorName = document
        .querySelector("#visitor-name")
        .value
        .trim();

    const visitorSource = document
        .querySelector("#visitor-source")
        .value;

    if (!visitorName || !visitorSource) {
        alert("Isi nama dan pilih sumber informasi terlebih dahulu!");
        return;
    }

    const visitorData = {
        name: visitorName,
        source: visitorSource
    };

    continueButton.disabled = true;
    continueButton.textContent = "MENGIRIM...";

    try {
        await fetch(
            "https://script.google.com/macros/s/AKfycbxHy76VY2dxbLLe7TSHHxdD430FuUkJb4GVfPBuTET1gvU_u8ecf-PvrliVfEo-hfsZ/exec",
            {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(visitorData)
            }
        );

        window.location.href = "welcome.html";

    } catch (error) {
        console.error("Pengiriman data gagal:", error);
        alert("Pengiriman gagal. Coba periksa koneksi internet kamu.");
    } 
});