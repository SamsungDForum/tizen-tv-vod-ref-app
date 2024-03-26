export type SpatialCfg = {
    selector: string;
    straightOnly: boolean;
    straightOverlapThreshold: number;
    rememberSource: boolean;
    disabled: boolean;
    defaultElement: string;    
    enterTo: string;          
    leaveFor: null | Object;             
    restrict: string;
    tabIndexIgnoreList:string;
    navigableFilter: null | Object;
  }