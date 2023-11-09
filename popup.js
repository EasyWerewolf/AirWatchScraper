// function for testing script
function scrapeDataYT() {
    // Check if the current page is not YouTube, and navigate to YouTube if it's not
    if (!window.location.href.includes("youtube.com")) {
        window.location.href = "https://www.youtube.com/";
    }

    // Wait for the YouTube page to load fully (you might need to adjust the timing)
    setTimeout(() => {
        // Find the YouTube search input field and set the search query to "test"
        const searchInput = document.querySelector('input[name="search_query"]');
        if (searchInput) {
            searchInput.value = "this works";
            searchInput.dispatchEvent(new Event("input", { bubbles: true }));
            searchInput.click();

                // Trigger the "Enter" key press event to perform the search
                const enterKeyEvent = new KeyboardEvent("keydown", {
                    key: "Enter",
                    code: "Enter",
                    keyCode: 13,
                    which: 13,
                    bubbles: true,
                });
                searchInput.dispatchEvent(enterKeyEvent);
        } else {
            alert("YouTube search input field not found.");
        }
    }, 2000);

    
}


// Actual function to scrape data from AirWatch
function scrapeData() {
    // Check if the current page is not Airwatch and Navigate to Airwatch if not
    if (!window.location.href.includes("Device/List")) {
        window.location.href = "https://jefferson.awmdm.com/AirWatch/#/Device/List";
    }

    // Wait for the page to load fully (you might need to adjust the timing)
    setTimeout(() => {
        // Find the YouTube search input field and set the search query to "test"
        const searchInput = document.querySelector('#SearchText');
        if (searchInput) {
            searchInput.value = "PDAV298";  //will change this later to implement a list of pda's
            searchInput.dispatchEvent(new Event("input", { bubbles: true }));
            //searchInput.click();

            // Trigger the "Enter" key press event to perform the search
            const enterKeyEvent = new KeyboardEvent("keydown", {
                key: "Enter",
                code: "Enter",
                keyCode: 13,
                which: 13,
                bubbles: true,
            });
            searchInput.dispatchEvent(enterKeyEvent);

            // Add an event listener for the new page's DOMContentLoaded event
            // document.addEventListener("DOMContentLoaded", function () {
            //     // Now you can interact with the fully loaded DOM of the new page
            //     // For example, click on the first element on the new page here
            //     // Ensure that you adjust the selector as needed
            //     const firstElement = document.querySelector('#FriendlyName > a');
            //     if (firstElement) {
            //         firstElement.click();
            //     }
            // });
        } else {
            alert("Search input field not found.");
        }
    }, 2000);

    setTimeout(() => {
        const firstElement = document.querySelector('#FriendlyName > a');
        if (firstElement) {
            firstElement.click();
        }        
    }, 5000);
}

// Add an event listener for the button click
let scraper = document.getElementById('scraper');

scraper.addEventListener("click", async () => {

    // get current active tab
    let [tab] = await chrome.tabs.query({active: 
        true, currentWindow: true});
    
    // check if url is a chrome url
    if (tab.url && tab.url.startsWith("chrome://")) {
        alert("This action is not allowed on chrome:// URLs.");
    } else {
    //execute script
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: scrapeData,
        });
    }
});
