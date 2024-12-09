import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
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
guideMessage.style.transition = "opacity 0.2s ease"; // 부드러운 전환 효과 추가

guideMessage.addEventListener("mouseover", () => {
  guideMessage.style.opacity = "0.2";
});

guideMessage.addEventListener("mouseout", () => {
  guideMessage.style.opacity = "1";
});

captureContainer.appendChild(guideMessage);

// Selection area
const selectionArea = document.createElement("div");
selectionArea.id = "selection-area";
selectionArea.style.position = "absolute";
selectionArea.style.border = "none";
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
  }
  
  #capture-overlay {
    cursor: crosshair;
  }
  
  #selection-area {
    pointer-events: none;
  }
`;
document.head.appendChild(widgetStyles);

const createModal = (imageUrl: string) => {
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "36%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.backgroundColor = "white";
  modal.style.padding = "24px";
  modal.style.borderRadius = "12px";
  modal.style.boxShadow = "0 0px 17px rgba(0, 0, 0, 0.17)";
  modal.style.zIndex = "10000";
  modal.style.display = "flex";
  modal.style.flexDirection = "column";
  modal.style.alignItems = "center";
  modal.style.gap = "22px";
  modal.style.minWidth = "500px";

  const textContainer = document.createElement("div");
  textContainer.style.display = "flex";
  textContainer.style.flexDirection = "column";
  textContainer.style.alignItems = "center";
  textContainer.style.gap = "4px";
  textContainer.style.marginBottom = "12px";

  const titleText = document.createElement("div");
  titleText.textContent = "선택하신 옷을 내 모델에 입혀볼까요?";
  titleText.style.fontFamily = "Pretendard Variable";
  titleText.style.fontSize = "24px";
  titleText.style.fontWeight = "700";
  titleText.style.color = "#222222";
  titleText.style.letterSpacing = "-0.48px";

  const descriptionText = document.createElement("div");
  descriptionText.textContent = "상의/하의 의류만 가상 피팅이 가능해요.";
  descriptionText.style.fontFamily = "Pretendard Variable";
  descriptionText.style.fontSize = "16px";
  descriptionText.style.fontWeight = "400";
  descriptionText.style.color = "#666666";
  descriptionText.style.letterSpacing = "-0.32px";

  // 캡처된 이미지
  const image = document.createElement("img");
  image.src = imageUrl;
  image.style.maxWidth = "400px";
  image.style.maxHeight = "400px";
  image.style.objectFit = "contain";
  image.style.borderRadius = "10px";
  image.style.border = "1px solid #c6c6c6";

  // 버튼들을 감싸는 컨테이너
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "12px"; // 버튼 사이 간격
  buttonContainer.style.width = "100%";

  // 확인 버튼
  const confirmButton = document.createElement("button");
  confirmButton.textContent = "확인";
  confirmButton.style.flex = "1";
  confirmButton.style.backgroundColor = "#000";
  confirmButton.style.color = "#fff";
  confirmButton.style.padding = "12px 24px";
  confirmButton.style.border = "none";
  confirmButton.style.borderRadius = "8px";
  confirmButton.style.cursor = "pointer";
  confirmButton.style.fontFamily = "Pretendard Variable";
  confirmButton.style.fontSize = "16px";

  // 취소 버튼
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "취소";
  cancelButton.style.flex = "1";
  cancelButton.style.backgroundColor = "#fff";
  cancelButton.style.color = "#222222";
  cancelButton.style.padding = "12px 24px";
  cancelButton.style.border = "1px solid #e5e5e5";
  cancelButton.style.borderRadius = "8px";
  cancelButton.style.cursor = "pointer";
  cancelButton.style.fontFamily = "Pretendard Variable";
  cancelButton.style.fontSize = "16px";

  confirmButton.onclick = async () => {
    try {
      // Base64 이미지 URL을 Blob으로 변환
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Blob을 File 객체로 변환
      const file = new File([blob], "captured-image.png", {
        type: "image/png",
      });

      if (file) {
        document.dispatchEvent(
          new CustomEvent("file-selected", {
            detail: { file },
          })
        );
      } else {
        console.error("No file created from captured image");
      }

      const sizeChart = document.querySelector(".sc-mzs975-0.fTWOpQ");
      if (sizeChart) {
        const sizeChartHTML = sizeChart.outerHTML;
        document.dispatchEvent(
          new CustomEvent("size-chart-selected", {
            detail: { sizeChart: sizeChartHTML },
          })
        );
      } else {
        console.error("No size chart created from html");
      }
    } catch (error) {
      console.error("Error processing:", error);
    }

    modal.remove();
  };

  cancelButton.onclick = () => {
    modal.remove();
  };

  buttonContainer.appendChild(cancelButton);
  buttonContainer.appendChild(confirmButton);

  textContainer.appendChild(titleText);
  textContainer.appendChild(descriptionText);

  modal.appendChild(image);
  modal.appendChild(textContainer);
  modal.appendChild(buttonContainer);
  document.body.appendChild(modal);
};

const startCapture = () => {
  captureContainer.style.display = "block";
  guideMessage.style.display = "block";
  let isDrawing = false;
  let startX = 0;
  let startY = 0;

  captureContainer.style.display = "block";
  captureContainer.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  captureContainer.style.cursor = "crosshair";

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
    const dpr = window.devicePixelRatio || 1;

    const captureArea = {
      x: Math.round(rect.left * dpr),
      y: Math.round(rect.top * dpr),
      width: Math.round(rect.width * dpr),
      height: Math.round(rect.height * dpr),
    };

    if (captureArea.width <= 0 || captureArea.height <= 0) {
      console.error("Invalid capture area:", captureArea);
      return;
    }

    try {
      chrome.runtime.sendMessage(
        {
          type: "CAPTURE_VISIBLE_TAB",
          area: captureArea,
        },
        (response) => {
          if (response.imageData) {
            createModal(response.imageData);
          }
        }
      );
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
