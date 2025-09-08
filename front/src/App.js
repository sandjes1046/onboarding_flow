import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Step1 from "./onboarding/step1";
import Wizard from "./onboarding/wizard";
import LogIn from "./onboarding/logIn";
import EditOnboarding from "./admin/editOnboarding";
import DataTable from "./data/dataTable";
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="/wizard" element={<Wizard />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/admin" element={<EditOnboarding />} />
        <Route path="/data" element={<DataTable />} />

      </Routes>
    </Router>
    </Provider>
  );
}

export default App;