import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import html2canvas from "html2canvas";
import TryOnWidget from "../components/TryOnWidget";

const captureContainer = document.createElement("div");
captureContainer.id = "capture-overlay";
captureContainer.style.position = "fixed";
captureContainer.style.top = "0";
captureContainer.style.left = "0";
captureContainer.style.width = "100%";
captureContainer.style.height = "100%";
captureContainer.style.zIndex = "9998";
captureContainer.style.display = "none";
captureContainer.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
document.body.appendChild(captureContainer);

const createOverlay = () => {
  const top = document.createElement("div");
  const right = document.createElement("div");
  const bottom = document.createElement("div");
  const left = document.createElement("div");

  [top, right, bottom, left].forEach((div) => {
    div.style.position = "fixed";
    div.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    div.style.display = "none";
    captureContainer.appendChild(div);
  });

  return { top, right, bottom, left };
};

const overlays = createOverlay();

const guideMessage = document.createElement("div");
guideMessage.style.position = "fixed";
guideMessage.style.top = "14%";
guideMessage.style.left = "50%";
guideMessage.style.transform = "translate(-50%, -50%)";
guideMessage.style.backgroundColor = "rgb(255, 255, 255, 0.9)";
guideMessage.style.padding = "26px 280px";
guideMessage.style.borderRadius = "12px";
guideMessage.style.color = "#000";
guideMessage.style.fontWeight = "100";
guideMessage.style.fontSize = "23px";
guideMessage.style.zIndex = "9999";
guideMessage.textContent = "옷 사진 부분에 드래그해주세요";
guideMessage.style.width = "fit-content";
guideMessage.style.minWidth = "max-content";
guideMessage.style.whiteSpace = "nowrap";
guideMessage.style.display = "none";
captureContainer.appendChild(guideMessage);

// Selection area
const selectionArea = document.createElement("div");
selectionArea.id = "selection-area";
selectionArea.style.position = "absolute";
selectionArea.style.border = "2px dashed #ffffff";
selectionArea.style.backgroundColor = "transparent";
selectionArea.style.display = "none";
selectionArea.style.zIndex = "9999";
captureContainer.appendChild(selectionArea);

const widgetStyles = document.createElement("style");
widgetStyles.textContent = `
  #eight-fit-widget-root {
    position: fixed;
    left: 50%;
    bottom: 80px;
    transform: translate(340px);
    z-index: 9997;
    font-family: "Pretendard Variable", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    margin-bottom: 190px;
  }
  
  #capture-overlay {
    cursor: crosshair;
  }
  
  #selection-area {
    pointer-events: none;
  }
`;
document.head.appendChild(widgetStyles);

const startCapture = () => {
  captureContainer.style.display = "block";
  guideMessage.style.display = "block";
  let isDrawing = false;
  let startX = 0;
  let startY = 0;

  captureContainer.style.display = "block";
  captureContainer.style.backgroundColor = "rgba(0, 0, 0, 0.7)";

  const handleMouseDown = (e: MouseEvent) => {
    guideMessage.style.display = "none";
    isDrawing = true;
    startX = e.clientX;
    startY = e.clientY;

    overlays.top.style.display = "block";
    overlays.top.style.left = "0";
    overlays.top.style.top = "0";
    overlays.top.style.width = "100%";
    overlays.top.style.height = "100%";

    captureContainer.style.backgroundColor = "transparent";

    selectionArea.style.display = "block";
    selectionArea.style.left = `${startX}px`;
    selectionArea.style.top = `${startY}px`;
    selectionArea.style.width = "0";
    selectionArea.style.height = "0";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDrawing) return;

    const currentX = e.clientX;
    const currentY = e.clientY;

    const width = currentX - startX;
    const height = currentY - startY;

    const left = width > 0 ? startX : currentX;
    const top = height > 0 ? startY : currentY;
    const right = width > 0 ? currentX : startX;
    const bottom = height > 0 ? currentY : startY;

    selectionArea.style.width = `${Math.abs(width)}px`;
    selectionArea.style.height = `${Math.abs(height)}px`;
    selectionArea.style.left = `${left}px`;
    selectionArea.style.top = `${top}px`;

    overlays.top.style.display = "block";
    overlays.top.style.left = "0";
    overlays.top.style.top = "0";
    overlays.top.style.width = "100%";
    overlays.top.style.height = `${top}px`;

    overlays.right.style.display = "block";
    overlays.right.style.left = `${right}px`;
    overlays.right.style.top = `${top}px`;
    overlays.right.style.width = "100%";
    overlays.right.style.height = `${bottom - top}px`;

    overlays.bottom.style.display = "block";
    overlays.bottom.style.left = "0";
    overlays.bottom.style.top = `${bottom}px`;
    overlays.bottom.style.width = "100%";
    overlays.bottom.style.height = "100%";

    overlays.left.style.display = "block";
    overlays.left.style.left = "0";
    overlays.left.style.top = `${top}px`;
    overlays.left.style.width = `${left}px`;
    overlays.left.style.height = `${bottom - top}px`;
  };

  const handleMouseUp = async () => {
    if (!isDrawing) return;
    isDrawing = false;

    const rect = selectionArea.getBoundingClientRect();

    try {
      const canvas = await html2canvas(document.body, {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
        backgroundColor: null,
      });

      const imageData = canvas.toDataURL("image/png");
      console.log("Captured image:", imageData);
    } catch (error) {
      console.error("Capture failed:", error);
    }

    cleanup();
  };

  const cleanup = () => {
    guideMessage.style.display = "none";
    captureContainer.style.display = "none";
    selectionArea.style.display = "none";

    overlays.top.style.display = "none";
    overlays.right.style.display = "none";
    overlays.bottom.style.display = "none";
    overlays.left.style.display = "none";

    document.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  document.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};

const hideElement = () => {
  const element = document.querySelector(
    ".gtm-impression-popup._qr_1g9ok_1"
  ) as HTMLElement;
  if (element) {
    element.style.display = "none";
  }
};

const mountNode = document.createElement("div");
mountNode.id = "eight-fit-widget-root";
document.body.appendChild(mountNode);

// React 앱 마운트
const root = createRoot(mountNode);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <TryOnWidget screenCaptureStart={startCapture} />
    </RecoilRoot>
  </React.StrictMode>
);

// 페이지 변경을 감지하여 계속 체크
const observer = new MutationObserver(() => {
  hideElement();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
