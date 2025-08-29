import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Main from "./pages/Main";
import WebApp from "@twa-dev/sdk";

export default function App() {
  WebApp.setBackgroundColor("#f1f5f9");
  WebApp.setHeaderColor("#ffffff");

  return (
    <div className="bg-slate-100 h-svh">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/profile/:profileId" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
