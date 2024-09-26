// Demo citations
let citations = [
    {
        id: "TC-896836",
        licensePlateImage: 'images/plate1.jpeg',
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
        licensePlateImage: 'images/plate2.jpeg',
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
        licensePlateImage: 'images/plate3.jpeg',
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
        licensePlateImage: 'images/plate4.jpeg',
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
        licensePlateImage: 'images/plate5.jpeg',
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
    { class: "Class 2a", range: "6,001–7,000 lb (2,722–3,175 kg)" },
    { class: "Class 2e", range: "7,001–8,500 lb (3,176–3,856 kg)" },
    { class: "Class 2b", range: "8,501–10,000 lb (3,857–4,536 kg)" },
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

// Initial load
showCitationList();

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', searchCitation);
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                searchCitation();
            }
        });
    } else {
        console.error('Search input or button not found');
    }
}

// Call initializeSearch after the content is loaded
document.addEventListener('DOMContentLoaded', initializeSearch);

// Functions
function showCitationList() {
    setActiveLink(citationListLink);
    let html = `
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Enter Citation ID">
            <button id="searchButton">Search</button>
        </div>
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
                        ? `<button disabled title="Citation Submitted: ${new Date(citation.submittedAt).toLocaleString()}">Citation Submitted</button>`
                        : `<button onclick="viewCitation('${citation.id}', true)" class="view-button">Process Citation</button>`
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
    
    // Re-initialize the search input and button
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchCitation);
    
    // Add event listener for the Enter key on the search input
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchCitation();
        }
    });
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
            <input type="text" id="age" required>

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

function viewCitation(id, editable = true) {
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
                        ${generateInfoItem('ownerName', 'Name', citation.ownerName, editable)}
                        ${generateInfoItem('streetAddress', 'Street Address', citation.streetAddress, editable)}
                        ${generateInfoItem('city', 'City', citation.city, editable)}
                        ${generateStateSelect('state', 'State', citation.state, editable)}
                        ${generateInfoItem('zip', 'ZIP', citation.zip, editable)}
                    </div>
                    <h3>Vehicle Info</h3>
                    <div class="info-grid">
                        ${generateInfoItem('vin', 'VIN', citation.vin, editable)}
                        ${generateInfoItem('make', 'Make', citation.make, editable)}
                        ${generateInfoItem('model', 'Model', citation.model, editable)}
                        ${generateInfoItem('year', 'Year', citation.year, editable)}
                        ${generateInfoItem('trim', 'Trim', citation.trim, editable)}
                        ${generateInfoItem('engine', 'Engine', citation.engine, editable)}
                        ${generateInfoItem('age', 'Age', citation.age, editable)}
                        ${generateInfoItem('manufactureLocation', 'Manufacture Location', citation.manufactureLocation, editable)}
                        ${generateInfoItem('transmission', 'Transmission', citation.transmission, editable)}
                        ${generateVehicleWeightSelect('vehicleWeight', 'Vehicle Weight Rating', citation.vehicleWeight, editable)}
                    </div>
                    <div class="citation-details">
                        <h3>Citation Details</h3>
                        ${generateInfoItem('violation', 'Violation', citation.violation, editable)}
                        ${generateInfoItem('date', 'Date', citation.date, editable, 'date')}
                        ${generateInfoItem('description', 'Description', citation.description, editable, 'textarea')}
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" onclick="showCitationList()" class="action-button back-button">Back to List</button>
                    ${editable ? `
                        <button type="button" onclick="saveCitationChanges()" class="action-button save-button">Save Changes</button>
                        <button type="button" id="submitCitationButton" class="action-button submit-button" disabled>Submit Citation</button>
                    ` : ''}
                </div>
            </form>
        </div>
    `;

    mainContent.innerHTML = html;
    if (editable) {
        document.querySelectorAll('#citationForm input, #citationForm textarea').forEach(input => {
            input.addEventListener('input', checkAllFieldsFilled);
        });
        document.getElementById('submitCitationButton').addEventListener('click', function(e) {
            e.preventDefault();
            submitCitation();
        });
        checkAllFieldsFilled();
    }
}

function generateInfoItem(id, label, value, editable, type = 'text') {
    if (!editable && !value) return '';
    const inputElement = type === 'textarea' 
        ? `<textarea id="${id}" name="${id}" ${!editable ? 'disabled' : ''}>${value || ''}</textarea>`
        : `<input type="${type}" id="${id}" name="${id}" value="${value || ''}" ${!editable ? 'disabled' : ''}>`;
    return `
        <div class="info-item">
            <label for="${id}">${label}:</label>
            ${inputElement}
        </div>
    `;
}

function generateStateSelect(id, label, value, editable) {
    if (!editable && !value) return '';
    return `
        <div class="info-item">
            <label for="${id}">${label}:</label>
            <select id="${id}" name="${id}" ${!editable ? 'disabled' : ''}>
                ${stateAbbreviations.map(abbr => `<option value="${abbr}" ${value === abbr ? 'selected' : ''}>${abbr}</option>`).join('')}
            </select>
        </div>
    `;
}

function generateVehicleWeightSelect(id, label, value, editable) {
    if (!editable && !value) return '';
    return `
        <div class="info-item">
            <label for="${id}">${label}:</label>
            <select id="${id}" name="${id}" ${!editable ? 'disabled' : ''}>
                <option value="">Select a weight class</option>
                ${weightClasses.map(wc => `<option value="${wc.class}" ${value === wc.class ? 'selected' : ''}>${wc.class}: ${wc.range}</option>`).join('')}
            </select>
        </div>
    `;
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
        vehicleWeight: document.getElementById('vehicleWeight').value || null,
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

    if (index === -1) {
        console.error('Citation not found');
        return;
    }

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
        description: document.getElementById('description').value,
        submittedAt: submissionTimestamp
    };

    alert('Citation submitted successfully!');
    showCitationList(); // This line ensures we return to the citations page
}

function setActiveLink(activeLink) {
    document.querySelectorAll('nav ul li a').forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function searchCitation() {
    const searchId = searchInput.value.trim().toUpperCase();
    console.log("Search ID:", searchId); // Debug log

    if (!searchId) {
        alert('Please enter a Citation ID to search.');
        return;
    }

    const citation = citations.find(c => c.id.toUpperCase() === searchId);
    console.log("Found citation:", citation); // Debug log

    if (citation) {
        viewCitation(citation.id, false); // Set editable to false
    } else {
        alert('Citation not found. Please check the ID and try again.');
    }
}
