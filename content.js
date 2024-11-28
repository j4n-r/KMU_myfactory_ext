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
      "Startseite"
    ) {
      removerOverlayChilds(overlay);

      drawRedBorderAroundElement(document.querySelector("#tvtvwMain_tdSales"));
    }
  } catch (e) {
    console.error("document not fully loaded", e);
  }
});
const config = { childList: true, subtree: true, attributes: true };
observer.observe(targetNode, config);

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "overlay";

  overlay.style.position = "fixed";
  overlay.style.top = "200px";
  overlay.style.right = "0";
  overlay.style.width = "10vw";
  overlay.style.height = "50vh";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = "9999"; // Ensure it's on top
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.color = "white";
  overlay.style.fontSize = "24px";
  overlay.style.fontWeight = "bold";
  overlay.style.flexDirection = "column";
  overlay.style.borderRadius = "10px 0px 0px 10px";
  overlay.style.padding = "10px";

  overlay.textContent = "DOM change detected!";

  const nextButton = document.createElement("button");
  nextButton.textContent = "Continue";

  overlay.appendChild(nextButton);
  return overlay;
}
function removerOverlayChilds(overlay) {
  overlay.innerHTML = "";
}
function drawRedBorderAroundElement(targetElement) {
  targetElement.style.border = "2px solid red";
}
