// ==========================================
// CONTACT MESSAGES
// ==========================================

const messagesContainer = document.getElementById("messagesContainer");
const backDashboard = document.getElementById("backDashboard");

let currentMessageId = null;

// Back Button
if (backDashboard) {
    backDashboard.addEventListener("click", () => {
        window.location.href = "dashboard.html";
    });
}

async function loadMessages() {
    // Check if client is defined
    if (typeof client === 'undefined') {
        console.error("Supabase client is not defined!");
        messagesContainer.innerHTML = "<p>Error: Database connection failed.</p>";
        return;
    }

    console.log("Client:", client);

    try {
        const { data: sessionData, error: sessionError } = await client.auth.getSession();

        console.log("Session:", sessionData);
        console.log("Session Error:", sessionError);

        // Check if user is authenticated
        if (!sessionData.session) {
            messagesContainer.innerHTML = "<p>Please log in to view messages.</p>";
            return;
        }

        const { data, error } = await client
            .from("contact_messages")
            .select("*")
            .order("created_at", { ascending: false });

        console.log("Data:", data);
        console.log("Error:", error);

        if (error) {
            console.error("Database error:", error);
            messagesContainer.innerHTML = `<p>Failed to load messages: ${error.message}</p>`;
            return;
        }

        if (!data || data.length === 0) {
            messagesContainer.innerHTML = "<p>No messages found.</p>";
            return;
        }

        messagesContainer.innerHTML = "";

        data.forEach(msg => {
            // Escape HTML content to prevent XSS
            const safeName = escapeHtml(msg.name || 'No name');
            const safeEmail = escapeHtml(msg.email || 'No email');
            const safeSubject = escapeHtml(msg.subject || 'No subject');
            const safeMessage = escapeHtml(msg.message || 'No message');
            const dateStr = msg.created_at ? new Date(msg.created_at).toLocaleString() : 'Unknown date';

            messagesContainer.innerHTML += `
                <div class="message-card">
                    <h3>${safeName}</h3>
                    <p><strong>📧 Email:</strong> ${safeEmail}</p>
                    <p><strong>📝 Subject:</strong> ${safeSubject}</p>
                    <small>📅 ${dateStr}</small>
                    <br><br>
                    <button class="view-btn" onclick="viewMessage(
    ${msg.id},
                        '${safeName.replace(/'/g, "\\'")}',
                        '${safeEmail.replace(/'/g, "\\'")}',
                        '${safeSubject.replace(/'/g, "\\'")}',
                        \`${safeMessage.replace(/`/g, '\\`').replace(/'/g, "\\'")}\`,
                        '${dateStr.replace(/'/g, "\\'")}'
                    )">
                        👁 View
                    </button>
                </div>
            `;
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        messagesContainer.innerHTML = `<p>Error loading messages: ${error.message}</p>`;
    }
}

function viewMessage(id, name, email, subject, message, date){

    currentMessageId = id;

    document.getElementById("modalName").textContent = name;

    document.getElementById("modalEmail").textContent = email;

    document.getElementById("modalSubject").textContent = subject;

    document.getElementById("modalMessage").textContent = message;

    document.getElementById("modalDate").textContent = date;

    document.getElementById("messageModal").classList.add("active");

}

const closeModal = document.getElementById("closeModal");

console.log(closeModal);
if(closeModal){

    closeModal.addEventListener("click", ()=>{

        document.getElementById("messageModal").classList.remove("active");

    });

}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load messages when page loads
document.addEventListener('DOMContentLoaded', loadMessages);

async function deleteCurrentMessage() {

    if (!currentMessageId) return;

    const confirmDelete = confirm("Are you sure you want to delete this message?");

    if (!confirmDelete) return;

    const { error } = await client
        .from("contact_messages")
        .delete()
        .eq("id", currentMessageId);

    if (error) {

        alert("❌ Delete failed.");

        console.error(error);

        return;

    }

    alert("✅ Message deleted successfully.");

    document.getElementById("messageModal").classList.remove("active");

    loadMessages();

}

const deleteButton = document.getElementById("deleteMessage");

if (deleteButton) {

    deleteButton.addEventListener("click", deleteCurrentMessage);

}