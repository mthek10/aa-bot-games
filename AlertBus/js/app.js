// Demo citations
let citations = [
    {
        id: "TC-896836",
        licensePlateImage: 'images/plate1.jpg',
        violation: 'Speeding',
        date: '2023-04-15',
        description: 'Driving 20mph over the speed limit',
        ownerName: 'John Doe',
        streetAddress: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345'
    },
    {
        id: "TC-259993",
        licensePlateImage: 'images/plate2.jpg',
        violation: 'Parking',
        date: '2023-04-16',
        description: 'Parked in a no-parking zone',
        ownerName: 'Jane Smith',
        streetAddress: '456 Elm St',
        city: 'Springfield',
        state: 'IL',
        zip: '67890'
    },
    {
        id: "TC-344103",
        licensePlateImage: 'images/plate3.jpg',
        violation: 'Red Light',
        date: '2023-04-17',
        description: 'Ran a red light at Main St. intersection',
        ownerName: 'Bob Johnson',
        streetAddress: '789 Oak Ave',
        city: 'Metropolis',
        state: 'NY',
        zip: '54321'
    },
    {
        id: "TC-439157",
        licensePlateImage: 'images/plate4.jpg',
        violation: 'Expired Registration',
        date: '2023-04-18',
        description: 'Vehicle registration expired 3 months ago',
        ownerName: 'Alice Brown',
        streetAddress: '321 Pine Rd',
        city: 'Smallville',
        state: 'TX',
        zip: '98765'
    },
    {
        id: "TC-705905",
        licensePlateImage: 'images/plate5.jpg',
        violation: 'Illegal Turn',
        date: '2023-04-19',
        description: 'Made an illegal U-turn at busy intersection',
        ownerName: 'Charlie Wilson',
        streetAddress: '654 Cedar Ln',
        city: 'Riverside',
        state: 'FL',
        zip: '13579'
    }
];

// DOM elements
const mainContent = document.getElementById('mainContent');
const citationListLink = document.getElementById('citationList');
const newCitationLink = document.getElementById('newCitation');

// Event listeners
citationListLink.addEventListener('click', showCitationList);
newCitationLink.addEventListener('click', showNewCitationForm);

// Functions
function showCitationList() {
    setActiveLink(citationListLink);
    let html = `
        <h2>Citation List</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>License Plate</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;

    citations.forEach((citation) => {
        html += `
            <tr>
                <td>${citation.id}</td>
                <td><img src="${citation.licensePlateImage}" alt="License Plate" style="width: 100px; height: auto;"></td>
                <td>${citation.date}</td>
                <td class="action-buttons">
                    ${citation.submittedAt 
                        ? `<button disabled>Citation Submitted: ${new Date(citation.submittedAt).toLocaleString()}</button>`
                        : `<button onclick="viewCitation('${citation.id}')" class="view-button">Process Citation</button>`
                    }
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    mainContent.innerHTML = html;
}

function showNewCitationForm() {
    setActiveLink(newCitationLink);
    const html = `
        <h2>New Citation</h2>
        <form id="newCitationForm">
            <label for="licensePlate">License Plate:</label>
            <input type="text" id="licensePlate" required>

            <label for="licensePlateImage">License Plate Image URL:</label>
            <input type="text" id="licensePlateImage" required>

            <label for="violation">Violation:</label>
            <input type="text" id="violation" required>

            <label for="date">Date:</label>
            <input type="date" id="date" required>

            <label for="makeModel">Make/Model:</label>
            <input type="text" id="makeModel" required>

            <label for="vehicleWeight">Vehicle Weight (lbs):</label>
            <input type="number" id="vehicleWeight" required>

            <label for="description">Description:</label>
            <textarea id="description" required></textarea>

            <button type="submit">Submit Citation</button>
        </form>
    `;

    mainContent.innerHTML = html;

    document.getElementById('newCitationForm').addEventListener('submit', submitNewCitation);
}

function submitNewCitation(e) {
    e.preventDefault();

    const newCitation = {
        id: `TC-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
        licensePlate: document.getElementById('licensePlate').value,
        licensePlateImage: document.getElementById('licensePlateImage').value,
        violation: document.getElementById('violation').value,
        date: document.getElementById('date').value,
        description: document.getElementById('description').value,
        vehicleWeight: document.getElementById('vehicleWeight').value,
        makeModel: document.getElementById('makeModel').value
    };

    citations.push(newCitation);
    showCitationList();
}

function viewCitation(id) {
    const citation = citations.find(c => c.id === id);
    const html = `
        <div class="citation-view">
            <h2>Citation Details</h2>
            <form id="citationForm">
                <input type="hidden" id="citationId" value="${citation.id}">
                <div class="image-container">
                    <div class="image-box">
                        <img src="${citation.licensePlateImage}" alt="License Plate" class="license-plate-image">
                        <p>License Plate Image</p>
                    </div>
                </div>
                <div class="citation-info">
                    <h3>Owner Info</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <label for="ownerName">Name:</label>
                            <input type="text" id="ownerName" name="ownerName" value="${citation.ownerName || ''}">
                        </div>
                        <div class="info-item">
                            <label for="streetAddress">Street Address:</label>
                            <input type="text" id="streetAddress" name="streetAddress" value="${citation.streetAddress || ''}">
                        </div>
                        <div class="info-item">
                            <label for="city">City:</label>
                            <input type="text" id="city" name="city" value="${citation.city || ''}">
                        </div>
                        <div class="info-item">
                            <label for="state">State:</label>
                            <input type="text" id="state" name="state" value="${citation.state || ''}">
                        </div>
                        <div class="info-item">
                            <label for="zip">ZIP:</label>
                            <input type="text" id="zip" name="zip" value="${citation.zip || ''}">
                        </div>
                    </div>
                    <h3>Vehicle Info</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <label for="makeModel">Make/Model:</label>
                            <input type="text" id="makeModel" name="makeModel" value="${citation.makeModel || ''}">
                        </div>
                        <div class="info-item">
                            <label for="licensePlate">License Plate:</label>
                            <input type="text" id="licensePlate" name="licensePlate" value="${citation.licensePlate || ''}">
                        </div>
                        <div class="info-item">
                            <label for="vinNumber">VIN Number:</label>
                            <input type="text" id="vinNumber" name="vinNumber" value="${citation.vinNumber || ''}">
                        </div>
                        <div class="info-item">
                            <label for="vehicleState">State:</label>
                            <input type="text" id="vehicleState" name="vehicleState" value="${citation.vehicleState || ''}">
                        </div>
                        <div class="info-item">
                            <label for="registrationExpiration">Registration Expiration:</label>
                            <input type="date" id="registrationExpiration" name="registrationExpiration" value="${citation.registrationExpiration || ''}">
                        </div>
                        <div class="info-item">
                            <label for="vehicleWeight">Vehicle Weight (lbs):</label>
                            <input type="number" id="vehicleWeight" name="vehicleWeight" value="${citation.vehicleWeight || ''}">
                        </div>
                    </div>
                    <div class="citation-details">
                        <h3>Citation Details</h3>
                        <div class="info-item">
                            <label for="violation">Violation:</label>
                            <input type="text" id="violation" name="violation" value="${citation.violation}">
                        </div>
                        <div class="info-item">
                            <label for="date">Date:</label>
                            <input type="date" id="date" name="date" value="${citation.date}">
                        </div>
                        <div class="info-item">
                            <label for="description">Description:</label>
                            <textarea id="description" name="description">${citation.description}</textarea>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" onclick="showCitationList()" class="action-button back-button">Back to List</button>
                    <button type="button" onclick="saveCitationChanges()" class="action-button save-button">Save Changes</button>
                    <button type="button" id="submitCitationButton" class="action-button submit-button" disabled>Submit Citation</button>
                </div>
            </form>
        </div>
    `;

    mainContent.innerHTML = html;
    document.querySelectorAll('#citationForm input, #citationForm textarea').forEach(input => {
        input.addEventListener('input', checkAllFieldsFilled);
    });
    document.getElementById('submitCitationButton').addEventListener('click', submitCitation);
    checkAllFieldsFilled();
}

function saveCitationChanges() {
    const id = document.getElementById('citationId').value;
    const index = citations.findIndex(c => c.id === id);

    citations[index] = {
        ...citations[index],
        ownerName: document.getElementById('ownerName').value,
        streetAddress: document.getElementById('streetAddress').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        licensePlate: document.getElementById('licensePlate').value,
        makeModel: document.getElementById('makeModel').value,
        vinNumber: document.getElementById('vinNumber').value,
        vehicleState: document.getElementById('vehicleState').value,
        registrationExpiration: document.getElementById('registrationExpiration').value,
        vehicleWeight: document.getElementById('vehicleWeight').value,
        violation: document.getElementById('violation').value,
        date: document.getElementById('date').value,
        description: document.getElementById('description').value
    };

    alert('Changes saved successfully!');
    checkAllFieldsFilled();
}

function checkAllFieldsFilled() {
    const inputs = document.querySelectorAll('#citationForm input, #citationForm textarea');
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
    document.getElementById('submitCitationButton').disabled = !allFilled;
}

function submitCitation() {
    const id = document.getElementById('citationId').value;
    const index = citations.findIndex(c => c.id === id);
    const submissionTimestamp = new Date().toISOString();

    citations[index] = {
        ...citations[index],
        ownerName: document.getElementById('ownerName').value,
        streetAddress: document.getElementById('streetAddress').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        licensePlate: document.getElementById('licensePlate').value,
        makeModel: document.getElementById('makeModel').value,
        vinNumber: document.getElementById('vinNumber').value,
        vehicleState: document.getElementById('vehicleState').value,
        registrationExpiration: document.getElementById('registrationExpiration').value,
        vehicleWeight: document.getElementById('vehicleWeight').value,
        violation: document.getElementById('violation').value,
        date: document.getElementById('date').value,
        description: document.getElementById('description').value,
        submittedAt: submissionTimestamp
    };

    alert('Citation submitted successfully!');
    showCitationList();
}

function setActiveLink(activeLink) {
    document.querySelectorAll('nav ul li a').forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Initial load
showCitationList();
