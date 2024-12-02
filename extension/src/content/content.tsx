import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import TryOnWidget from "../components/TryOnWidget";

// 위젯을 마운트할 div 생성
const mountNode = document.createElement("div");
mountNode.id = "eight-fit-widget-root";
document.body.appendChild(mountNode);

// 스타일 적용 (기존 App.css와 index.css의 필요한 스타일만 적용)
mountNode.style.cssText = `
  position: fixed;
  left: 50%;
  bottom: 80px;
  transform: translate(340px);
  z-index: 9999;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
`;

// React 앱 마운트
const root = createRoot(mountNode);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <TryOnWidget />
    </RecoilRoot>
  </React.StrictMode>
);
