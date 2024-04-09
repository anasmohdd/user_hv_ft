import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Create from "./components/Create";
import UpdateUserForm from "./components/UpdateUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:userId" element={<UpdateUserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
