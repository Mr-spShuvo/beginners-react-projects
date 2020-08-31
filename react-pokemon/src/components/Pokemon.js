import React from "react";

const Pokemon = ({ dataName, dataImg }) => {
  return (
    <div className="pokemon-container">
      {dataName &&
        dataName.map((name, index) => (
          <div className="pokemon" key={name}>
            <div className="pokemon__img">
              <img src={dataImg[index]} alt={name} />
            </div>
            <p className="pokemon__name">{name}</p>
          </div>
        ))}
    </div>
  );
};

export default Pokemon;
