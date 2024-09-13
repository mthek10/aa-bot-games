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

const stateAbbreviations = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const weightClasses = [
    { class: "Class 1", range: "6,000 lb (2,722 kg) or less" },
    { class: "Class 2", range: "6,001–10,000 lb (2,722–4,536 kg)" },
    { class: "Class 2a", range: "6,001–8,500 lb (2,722–3,856 kg)" },
    { class: "Class 2b", range: "8,501–10,000 lb (3,856–4,536 kg)" },
    { class: "Class 3", range: "10,001–14,000 lb (4,536–6,350 kg)" },
    { class: "Class 4", range: "14,001–16,000 lb (6,350–7,257 kg)" },
    { class: "Class 5", range: "16,001–19,500 lb (7,258–8,845 kg)" },
    { class: "Class 6", range: "19,501–26,000 lb (8,846–11,793 kg)" },
    { class: "Class 7", range: "26,001–33,000 lb (11,794–14,969 kg)" },
    { class: "Class 8", range: "33,001 lb (14,969 kg) and above" }
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

            <label for="vin">VIN:</label>
            <input type="text" id="vin" required>

            <label for="make">Make:</label>
            <input type="text" id="make" required>

            <label for="model">Model:</label>
            <input type="text" id="model" required>

            <label for="year">Year:</label>
            <input type="number" id="year" required>

            <label for="trim">Trim:</label>
            <input type="text" id="trim" required>

            <label for="engine">Engine:</label>
            <input type="text" id="engine" required>

            <label for="age">Age:</label>
            <input type="number" id="age" required>

            <label for="manufactureLocation">Manufacture Location:</label>
            <input type="text" id="manufactureLocation" required>

            <label for="transmission">Transmission:</label>
            <input type="text" id="transmission" required>

            <label for="vehicleWeight">Vehicle Weight Rating:</label>
            <select id="vehicleWeight" name="vehicleWeight" required>
                <option value="">Select a weight class</option>
                ${weightClasses.map(wc => `<option value="${wc.class}">${wc.class}: ${wc.range}</option>`).join('')}
            </select>

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
        vin: document.getElementById('vin').value,
        make: document.getElementById('make').value,
        model: document.getElementById('model').value,
        year: document.getElementById('year').value,
        trim: document.getElementById('trim').value,
        engine: document.getElementById('engine').value,
        age: document.getElementById('age').value,
        manufactureLocation: document.getElementById('manufactureLocation').value,
        transmission: document.getElementById('transmission').value,
        vehicleWeight: document.getElementById('vehicleWeight').value
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
                            <select id="state" name="state">
                                ${stateAbbreviations.map(abbr => `<option value="${abbr}" ${citation.state === abbr ? 'selected' : ''}>${abbr}</option>`).join('')}
                            </select>
                        </div>
                        <div class="info-item">
                            <label for="zip">ZIP:</label>
                            <input type="text" id="zip" name="zip" value="${citation.zip || ''}">
                        </div>
                    </div>
                    <h3>Vehicle Info</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <label for="vin">VIN:</label>
                            <input type="text" id="vin" name="vin" value="${citation.vin || ''}">
                        </div>
                        <div class="info-item">
                            <label for="make">Make:</label>
                            <input type="text" id="make" name="make" value="${citation.make || ''}">
                        </div>
                        <div class="info-item">
                            <label for="model">Model:</label>
                            <input type="text" id="model" name="model" value="${citation.model || ''}">
                        </div>
                        <div class="info-item">
                            <label for="year">Year:</label>
                            <input type="number" id="year" name="year" value="${citation.year || ''}">
                        </div>
                        <div class="info-item">
                            <label for="trim">Trim:</label>
                            <input type="text" id="trim" name="trim" value="${citation.trim || ''}">
                        </div>
                        <div class="info-item">
                            <label for="engine">Engine:</label>
                            <input type="text" id="engine" name="engine" value="${citation.engine || ''}">
                        </div>
                        <div class="info-item">
                            <label for="age">Age:</label>
                            <input type="number" id="age" name="age" value="${citation.age || ''}">
                        </div>
                        <div class="info-item">
                            <label for="manufactureLocation">Manufacture Location:</label>
                            <input type="text" id="manufactureLocation" name="manufactureLocation" value="${citation.manufactureLocation || ''}">
                        </div>
                        <div class="info-item">
                            <label for="transmission">Transmission:</label>
                            <input type="text" id="transmission" name="transmission" value="${citation.transmission || ''}">
                        </div>
                        <div class="info-item">
                            <label for="vehicleWeight">Vehicle Weight Rating:</label>
                            <select id="vehicleWeight" name="vehicleWeight">
                                ${weightClasses.map(wc => `<option value="${wc.class}" ${citation.vehicleWeight === wc.class ? 'selected' : ''}>${wc.class}: ${wc.range}</option>`).join('')}
                            </select>
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
        vin: document.getElementById('vin').value,
        make: document.getElementById('make').value,
        model: document.getElementById('model').value,
        year: document.getElementById('year').value,
        trim: document.getElementById('trim').value,
        engine: document.getElementById('engine').value,
        age: document.getElementById('age').value,
        manufactureLocation: document.getElementById('manufactureLocation').value,
        transmission: document.getElementById('transmission').value,
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
