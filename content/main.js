const targetNode = document.body;

const observer = new MutationObserver((mutationsList, observer) => {
  let overlay = document.getElementById("overlay");
  let iframe1 = document.getElementById("fraWorkplace_1");

  if (!overlay) {
    overlay = createOverlay();
    document.body.appendChild(overlay); // Append overlay to the body
  }
  try {
    if (
      iframe1.contentDocument.querySelector(".clsMainMenuTD").innerText ===
        "Startseite" &&
      !iframe1.contentDocument
        .querySelector(".clsMainMenuTD")
        .classList.contains("tourStarted")
    ) {
      console.log("tour");
      iframe1.contentDocument
        .querySelector(".clsMainMenuTD")
        .classList.add("tourStarted");
      document.querySelector("#startTour").addEventListener("click", beginTour);
    }
  } catch (e) {
    console.error("document not fully loaded", e);
  }
});
const config = { childList: true, subtree: true, attributes: true };
observer.observe(targetNode, config);

function beginTour() {
  let overlay = document.querySelector("#overlay");
  overlay.innerHTML = "";
  overlay.innerText = "Bitte klicken Sie auf Verkauf";
  let verkaufButton = document.querySelector("#tvtvwMain_tdSales");
  drawRedBorder(verkaufButton);
  verkaufButton.addEventListener("click", function handleVerkaufClick() {
    // Remove red border from Verkauf button
    verkaufButton.style.border = "0px";
    overlay.innerText = "Klicken Sie bitte auf Verkaufsbelegerfassung";
    let workplaceButton = document.querySelector(
      "#tvtvwMain_tdSales_OrderProcessing",
    );
    if (!workplaceButton) {
      console.log("Workplace button not found!");
      return;
    }
    drawRedBorder(workplaceButton);
  });
}

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "overlay";

  overlay.style.position = "fixed";
  overlay.style.bottom = "0";
  overlay.style.left = "233px";
  overlay.style.width = "50vw";
  overlay.style.height = "10vh";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = "9999"; // Ensure it's on top
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.color = "white";
  overlay.style.fontSize = "18px";
  overlay.style.fontWeight = "bold";
  overlay.style.flexDirection = "column";
  overlay.style.borderRadius = "10px 0px 0px 10px";
  overlay.style.padding = "10px";
  overlay.innerText = "Wilkommen bei MYFACTORY";

  let button = document.createElement("button");
  button.id = "startTour";
  button.innerText = "Tour Starten";
  overlay.appendChild(button);

  return overlay;
}
function removerOverlayChilds(overlay) {
  overlay.innerHTML = "";
}
function drawRedBorder(targetElement) {
  targetElement.style.border = "2px solid red";
}
