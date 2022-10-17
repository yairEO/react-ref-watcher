import { createRoot } from "react-dom/client";

import List from "./List";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<List />)
