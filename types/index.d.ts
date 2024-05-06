// @ts-ignore
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const value: any;
  export default value;
}
declare module "VideoContent.json" {
  const value: Array<import('../src/Components/usePlayerFactory/utils/playAssetCurrentTypes').Media>;
  export default value;
}
