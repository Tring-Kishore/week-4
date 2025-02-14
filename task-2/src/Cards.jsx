import React from 'react';

const Cards = ({ id, name, data}) => {
  console.log("data is",data);
    return (
      <>
      
        <div className="card">
            <h3>ID : {id}</h3>
            <p>Name : {name}</p>
            <img src="https://picsum.photos/150/150" alt={name} />
            {/* <p>Details:{data?.price ? data.price : "Price Not Given"}</p> */}
            <p>Details:</p>
            <p>
              
              {data && Object.entries(data).map(([key,value]) => {
                console.log("key is", key, "value is", value);
                return (
                <span>{key} - {value}</span>
                )
            })}
            </p>
        </div>
      
      </>
    );
};

export default Cards;
