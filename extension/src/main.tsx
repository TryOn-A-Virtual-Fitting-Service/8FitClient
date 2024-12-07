import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import TryOnWidget from "./components/TryOnWidget";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <TryOnWidget />
    </RecoilRoot>
  </React.StrictMode>
);
