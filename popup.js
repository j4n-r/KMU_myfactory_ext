console.log(document);

document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("login");
  console.log(loginButton);

  if (loginButton) {
    loginButton.addEventListener("click", () => {
      window.open(
        "https://myfactory.privatecloud.mobi/HWR/ie50/system/login/sysloginbackground.aspx?login=start&apptype=-3",
        "_blank",
      );
    });
  } else {
    console.error("Login button not found on the page.");
  }

  // Start observing the URL changes
  observeURLChanges();
});

function observeURLChanges() {
  // Listen for 'popstate' event, which is triggered when the URL changes in a SPA
  window.addEventListener("popstate", handleRouting);

  // Also, check the initial page load in case we're already on the correct URL
  console.log("handle routing");
  handleRouting();
}

// Function to handle routing when the URL changes
function handleRouting() {
  let url = window.location.href;
  console.log("Current URL:", url);

  if (url.startsWith("https://myfactory.privatecloud.mobi")) {
    buildOverlay(); // Trigger overlay if the URL matches
  }
}

// Function to build the overlay
function buildOverlay() {
  // Check if overlay already exists to avoid adding multiple overlays
  if (document.getElementById("custom-overlay")) {
    return;
  }

  const overlay = document.createElement("div");
  overlay.id = "custom-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "1000";

  const content = document.createElement("div");
  content.style.backgroundColor = "white";
  content.style.padding = "20px";
  content.style.borderRadius = "8px";
  content.style.textAlign = "center";
  content.innerHTML = `
    <h2>Overlay Title</h2>
    <p>This is a simple overlay message!</p>
    <button id="close-overlay">Close</button>
  `;

  overlay.appendChild(content);

  // Append overlay to the body
  document.body.appendChild(overlay);

  // Add event listener to close button
  document.getElementById("close-overlay").addEventListener("click", () => {
    document.body.removeChild(overlay);
  });
}
