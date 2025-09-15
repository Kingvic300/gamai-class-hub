import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./Routes";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <AppRoutes />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;