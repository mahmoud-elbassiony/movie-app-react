// declare module "*.jpg";
// declare module "*.png";
// declare module "*.svg";

declare module "*.jpg" {
  const path: string;
  export default path;
}

declare module "*.png" {
  const path: string;
  export default path;
}

declare module "*.svg" {
  const path: string;
  export default path;
}

// npm install --save-dev file-loader
