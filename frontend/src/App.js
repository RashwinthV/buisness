import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./components/Layout";
import ProfileCard from "./Pages/Profile";
import LoginForm from "./Pages/Login&register/Login";
import RegisterForm from "./Pages/Login&register/Register";
import { UserProvider } from "./context/userContext.js";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
