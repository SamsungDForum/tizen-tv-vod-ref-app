declare module "redux-states" {
  type tabsEnum = "All Clips" | "Favorite Clips" | "Logs Messages" | "Advanced";

  export interface NavigationTabState {
    value: tabsEnum; 
  }
}
