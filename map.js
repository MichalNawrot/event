// Fetching data from JSON file
fetch("stations.json")
    .then(response => response.json())
    .then(data => {
        const stationsContainer = document.getElementById("stations-container");
        const modalsContainer = document.getElementById('modals-container');
        data.forEach(stationData => {
            // Create HTML station dynamically
            rowA = stationData.coordinates.y[0].toString()
            rowB = stationData.coordinates.y[1].toString()
            columnA = stationData.coordinates.x[0].toString()
            columnB = stationData.coordinates.x[1].toString()
            var stationLandscapeHTML = `<button id="${stationData.id}"
                                       class="station grid-item modal-button landscape"
                                       data-modal-target="modal-${stationData.id}"
                                       style="background-color: ${stationData.background};
                                              background-image: url('./icons/${stationData.id}.svg');
                                              grid-area: ${rowA} / ${columnA} / ${rowB} / ${columnB};"
                                       ></button>`;
            var stationPortraitHTML = `<button id="${stationData.id}"
                                       class="station grid-item modal-button portrait"
                                       data-modal-target="modal-${stationData.id}"
                                       style="background-color: ${stationData.background};
                                              background-image: url('./icons/${stationData.id}.svg');
                                              grid-area: ${columnA} / ${19 - rowA + 1} / ${columnB} / ${19 - rowB + 1};"
                                       ></button>`;
            stationsContainer.innerHTML += stationLandscapeHTML;
            stationsContainer.innerHTML += stationPortraitHTML;
            var modalHTML = `<div id="modal-${stationData.id}" class="modal">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <div style="flex:1;display:flex;justify-content:start;align-items:center;">
                                            <img src="./icons/${stationData.id}.svg" alt="" 
                                                 style="max-height:max(1em,30px);
                                                        flex:0 1 2.5rem;
                                                        margin-right:0.2em">
                                            <h2 style="flex:1;">${stationData.name}</h2>
                                        </div>
                                        <span class="close">&times;</span>
                                    </div>
                                    <div class="modal-body">
                                        <p>${stationData.description}</p>
                                    </div>
                                </div>
                            </div>`;
            // Append the modal HTML to the modal-container div in the HTML
            modalsContainer.innerHTML += modalHTML;
        });
    })
    .catch(error => console.error("Error fetching data:", error));

document.addEventListener('click', function (e) {
    if (!e.target.matches('.modal-button')) {
        return;
    } else {
        const modalTarget = e.target.attributes["data-modal-target"].value;
        const modal = document.getElementById(modalTarget);
        // Open the modal
        modal.style.display = "block";

        // Get the close button inside the modal
        const closeButton = modal.querySelector(".close");

        // Close the modal when the close button is clicked
        closeButton.addEventListener("click", () => {
            modal.style.display = "none";
        });

        // Close the modal when user clicks outside the modal content
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    };
});