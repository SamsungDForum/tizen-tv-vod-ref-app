declare namespace dashjs {
  export interface Protection {
    createProtectionSystem(config: object): void;
    getClassName(): 'Protection';
  } 
}