import Dashboard from "./components/Dashboard";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import i18n from "./components/i18n"; 

function App() {
  return (
    <I18nextProvider i18n={i18n}>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  </I18nextProvider>
  );
}

export default App;
