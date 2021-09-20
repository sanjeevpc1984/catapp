import React, { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCat from "./components/AddCat";
import Cat from "./components/Cat";
import CatList from "./components/CatList";
import { ReactElement } from "react";

const App = (): ReactElement => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/cats"} className="nav-link">
              Cats
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/cats"]} component={CatList} />
          <Route exact path="/add" component={AddCat} />
          <Route path="/cats/:id" component={Cat} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
