import React from "react";
import { getAuthStatus } from "../utils/api.js";

export const HomePage = () => {
  React.useEffect(() => {
    getAuthStatus()
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return <div>Home Page</div>;
};
