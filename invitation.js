
const envelope = document.querySelector("#envelope");
const openButton = document.querySelector("#open-invitation");
const eventDetails = document.querySelector("#event-details");

openButton.addEventListener("click", () => {
    envelope.classList.add("opened");

    openButton.textContent = "INVITATION UNLOCKED ✨";
    openButton.disabled = true;

    setTimeout(() => {
        eventDetails.classList.add("visible");

        eventDetails.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 900);
});
