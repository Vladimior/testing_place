import './App.css';
import Person from "../Person/person";
import Planet from "../Planet/planets";
import Starship from "../Starship/starship";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "../Layout/layout";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Person />} />
                  <Route path="planets" element={<Planet />} />
                  <Route path="starship" element={<Starship />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
