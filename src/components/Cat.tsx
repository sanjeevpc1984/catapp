import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import CatDataService from "../services/CatService";
import ICatData from "../types/Cat";

interface RouterProps {
  // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

const Cat: React.FC<Props> = (props: Props) => {
  const initialCatState = {
    id: null,
    name: "",
    url: "",
  };
  const [currentCat, setCurrentCat] = useState<ICatData>(initialCatState);

  const getCat = (id: string) => {
    CatDataService.get(id)
      .then((response) => {
        setCurrentCat(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCat(props.match.params.id);
  }, [props.match.params.id]);

  const deleteCat = () => {
    CatDataService.remove(currentCat.id)
      .then((response) => {
        props.history.push("/cats");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCat ? (
        <div className="edit-form">
          <h4>Cat</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentCat.name}
                disabled
              />
            </div>
            <div className="form-group">
              <img src={currentCat.url} alt="Cat pictures" />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteCat}>
            Delete
          </button>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Cat;
