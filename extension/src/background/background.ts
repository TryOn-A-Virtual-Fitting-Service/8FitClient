chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type === "CAPTURE_VISIBLE_TAB") {
    const { area } = request;

    chrome.tabs.captureVisibleTab({ format: "png" }, (dataUrl) => {
      console.log("Capture Area:", area);
      console.log("Canvas Size:", {
        width: area.width,
        height: area.height,
      });

      // Canvas를 사용하여 이미지 크롭
      const canvas = new OffscreenCanvas(area.width, area.height);
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("Failed to get canvas context");
        return;
      }

      // 비동기로 이미지 로드 및 크롭
      fetch(dataUrl)
        .then((response) => response.blob())
        .then((blob) => createImageBitmap(blob))
        .then((imageBitmap) => {
          ctx.drawImage(
            imageBitmap,
            area.x,
            area.y,
            area.width,
            area.height,
            0,
            0,
            area.width,
            area.height
          );

          // 크롭된 이미지를 데이터 URL로 변환
          canvas.convertToBlob().then((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              sendResponse({ imageData: reader.result });
            };
            reader.readAsDataURL(blob);
          });
        });
    });

    return true; // 비동기 응답을 위해 true 반환
  }
});
