import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import ProjectPage from "./features/project/pages/index.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App>
            <ProjectPage />
        </App>
    </StrictMode>
);
