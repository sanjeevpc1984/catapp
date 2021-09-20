import React, { ChangeEvent, useState } from "react";

import CatDataService from "../services/CatService";
import ICatData from "../types/Cat";

const AddCat: React.FC = () => {
  const initialCatState = {
    id: null,
    name: "",
  };
  const [cat, setCat] = useState<ICatData>(initialCatState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCat({ ...cat, [name]: value });
  };

  const saveCat = () => {
    const data = {
      name: cat.name,
    };

    CatDataService.create(data)
      .then((response) => {
        setCat({
          id: response.data.id,
          name: response.data.name,
        });
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newCat = () => {
    setCat(initialCatState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCat}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={cat.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <button onClick={saveCat} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCat;
