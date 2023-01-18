import React from "react";
import { Dimensions } from "react-native";

const useViewDimension = (size: number, orientation: string) => {
  if (orientation === "h")
    return (Dimensions.get("window").height * size) / 100;
  else return (Dimensions.get("window").width * size) / 100;
};

export default useViewDimension;
