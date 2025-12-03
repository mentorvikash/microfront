import React from "react";
import { createRoot } from "react-dom/client"

function Preview() {
    return <h2>Shared UI Library Running </h2>
}

createRoot(document.getElementById('root')).render(<Preview />)