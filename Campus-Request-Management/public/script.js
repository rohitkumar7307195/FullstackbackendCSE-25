// ================================================
// GET ELEMENTS
// ================================================

const requestForm =
    document.getElementById("requestForm");

const requestsList =
    document.getElementById("requestsList");

const submitButton =
    document.getElementById("submitButton");

const cancelButton =
    document.getElementById("cancelButton");

const formTitle =
    document.getElementById("formTitle");

const requestCount =
    document.getElementById("requestCount");

const totalRequests =
    document.getElementById("totalRequests");

const pendingRequests =
    document.getElementById("pendingRequests");


// ================================================
// EDITING STATE
// ================================================

let editingId = null;


// ================================================
// GET ALL REQUESTS
// ================================================

async function getRequests() {

    try {

        const response =
            await fetch("/api/requests");

        if (!response.ok) {

            throw new Error(
                "Failed to fetch requests"
            );
        }

        const requests =
            await response.json();

        displayRequests(requests);

    } catch (error) {

        console.error(error);

        requestsList.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to load requests
                </h3>

                <p>
                    Please refresh the page and try again.
                </p>

            </div>
        `;
    }
}


// ================================================
// DISPLAY REQUESTS
// ================================================

function displayRequests(requests) {

    requestsList.innerHTML = "";


    // Request count

    requestCount.textContent =
        requests.length;

    totalRequests.textContent =
        requests.length;


    // Pending count

    const pending =
        requests.filter(
            request =>
                request.status === "Pending"
        ).length;

    pendingRequests.textContent =
        pending;


    // Empty state

    if (requests.length === 0) {

        requestsList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    📭
                </div>

                <h3>
                    No requests yet
                </h3>

                <p>
                    Your submitted campus requests
                    will appear here.
                </p>

            </div>
        `;

        return;
    }


    // Display requests

    requests.forEach(request => {

        const card =
            document.createElement("div");

        card.className =
            "request-card";


        card.innerHTML = `

            <div class="request-top">

                <div>

                    <div class="request-category">
                        ${escapeHTML(request.category)}
                    </div>

                    <span class="request-id">
                        Request #${request.id}
                    </span>

                </div>

                <span class="status">
                    ${escapeHTML(request.status)}
                </span>

            </div>


            <div class="request-info">

                <p>
                    <strong>Student:</strong>
                    ${escapeHTML(request.studentName)}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${escapeHTML(request.email)}
                </p>

            </div>


            <div class="request-description">

                <strong>Problem:</strong>

                ${escapeHTML(request.description)}

            </div>


            <div class="request-meta">

                <span>
                    Priority:
                </span>

                <span class="priority ${escapeHTML(request.priority)}">
                    ${escapeHTML(request.priority)}
                </span>

            </div>


            <div class="actions">

                <button
                    class="edit-btn"
                    onclick="editRequest(${request.id})"
                >
                    ✏ Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteRequest(${request.id})"
                >
                    🗑 Delete
                </button>

            </div>
        `;


        requestsList.appendChild(card);

    });
}


// ================================================
// SUBMIT FORM
// POST / PUT
// ================================================

requestForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const studentName =
            document
                .getElementById("studentName")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const category =
            document
                .getElementById("category")
                .value;


        const description =
            document
                .getElementById("description")
                .value
                .trim();


        const priority =
            document
                .getElementById("priority")
                .value;


        const requestData = {

            studentName,

            email,

            category,

            description,

            priority
        };


        try {

            let response;


            // UPDATE

            if (editingId !== null) {

                response =
                    await fetch(
                        `/api/requests/${editingId}`,
                        {
                            method: "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    requestData
                                )
                        }
                    );
            }


            // CREATE

            else {

                response =
                    await fetch(
                        "/api/requests",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    requestData
                                )
                        }
                    );
            }


            const data =
                await response.json();


            if (!response.ok) {

                alert(
                    data.message ||
                    "Something went wrong."
                );

                return;
            }


            alert(data.message);


            resetForm();


            await getRequests();


        } catch (error) {

            console.error(error);

            alert(
                "Unable to save request."
            );
        }
    }
);


// ================================================
// EDIT REQUEST
// ================================================

async function editRequest(id) {

    try {

        const response =
            await fetch(
                `/api/requests/${id}`
            );


        if (!response.ok) {

            alert("Request not found.");

            return;
        }


        const request =
            await response.json();


        document
            .getElementById("studentName")
            .value =
            request.studentName;


        document
            .getElementById("email")
            .value =
            request.email;


        document
            .getElementById("category")
            .value =
            request.category;


        document
            .getElementById("description")
            .value =
            request.description;


        document
            .getElementById("priority")
            .value =
            request.priority;


        editingId = id;


        formTitle.textContent =
            "Update Request";


        submitButton.innerHTML =
            `
            <span>Update Request</span>
            <span>→</span>
            `;


        cancelButton.style.display =
            "block";


        document
            .getElementById("request-form")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


    } catch (error) {

        console.error(error);

        alert(
            "Unable to load request."
        );
    }
}


// ================================================
// DELETE REQUEST
// ================================================

async function deleteRequest(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this request?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(
                `/api/requests/${id}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Unable to delete request."
            );

            return;
        }


        alert(data.message);


        await getRequests();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to delete request."
        );
    }
}


// ================================================
// CANCEL EDIT
// ================================================

cancelButton.addEventListener(
    "click",
    function () {

        resetForm();

    }
);


// ================================================
// RESET FORM
// ================================================

function resetForm() {

    requestForm.reset();

    editingId = null;

    formTitle.textContent =
        "Submit a Request";

    submitButton.innerHTML =
        `
        <span>Submit Request</span>
        <span>→</span>
        `;

    cancelButton.style.display =
        "none";
}


// ================================================
// SECURITY HELPER
// Prevent HTML injection when displaying
// user-entered data.
// ================================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ================================================
// LOAD REQUESTS
// ================================================

getRequests();