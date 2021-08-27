declare module "*.svg" {
  import React from "react";
  import { SVgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;

  export default content;
}
