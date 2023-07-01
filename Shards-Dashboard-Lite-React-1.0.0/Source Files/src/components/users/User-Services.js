import React from "react";
import axios from "axios";

const getFullUser = async id => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/v1/users/details/${id}`
    );

    return res.data;
  } catch (err) {
    //Handle error
    console.log(err);
  }
};

export { getFullUser };
