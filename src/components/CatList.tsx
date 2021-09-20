import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CatDataService from "../services/CatService";
import ICatData from "../types/Cat";
import { withRouter } from "react-router-dom";

const CatsList: React.FC = () => {
  const [cats, setCats] = useState<Array<ICatData>>([]);
  const [currentCat, setCurrentcat] = useState<ICatData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect(() => {
    retrieveCats();
  }, []);

  const retrieveCats = () => {
    CatDataService.getAll()
      .then((response) => {
        setCats(response.data.results);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveCat = (cat: ICatData, index: number) => {
    setCurrentcat(cat);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        {cats.length ? <h4>Cats List</h4> : null}
        <ul className="list-group">
          {cats &&
            cats.map((cat, id) => (
              <li
                className={
                  "list-group-item " + (id === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCat(cat, id)}
                key={id}
              >
                {cat.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentCat ? (
          <div>
            <h4>Cat</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentCat.name}
            </div>
            <Link to={"/cats/" + currentCat.id} className="badge badge-warning">
              Edit
            </Link>
          </div>
        ) : cats.length ? (
          <div>
            <br />
            <p>Please click on a Cat...</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default withRouter(CatsList);
