// ==========================================
// CONTACT FORM
// ==========================================
console.log("Contact JS Loaded");
const contactForm = document.getElementById("contactForm");

console.log(contactForm);

if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {
        console.log("Form Submitted");

        e.preventDefault();

        const sendBtn = document.getElementById("sendBtn");

        sendBtn.disabled = true;
        sendBtn.innerText = "Sending...";

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const { error } = await client
            .from("contact_messages")
            .insert([
                {
                    name,
                    email,
                    subject,
                    message
                }
            ]);

            console.log("Insert Error:", error);

        if (error) {

            alert("❌ Failed to send message.");

            console.error(error);

        } else {

            alert("✅ Message sent successfully!");

            contactForm.reset();

        }

        sendBtn.disabled = false;
        sendBtn.innerText = "Send Message";

    });

}