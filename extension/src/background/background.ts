chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type === "CAPTURE_VISIBLE_TAB") {
    const { area } = request;

    chrome.tabs.captureVisibleTab({ format: "png" }, (dataUrl) => {
      const canvas = new OffscreenCanvas(area.width, area.height);
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("Failed to get canvas context");
        return;
      }

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

          canvas.convertToBlob().then((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              sendResponse({ imageData: reader.result });
            };
            reader.readAsDataURL(blob);
          });
        });
    });

    return true;
  }
});
