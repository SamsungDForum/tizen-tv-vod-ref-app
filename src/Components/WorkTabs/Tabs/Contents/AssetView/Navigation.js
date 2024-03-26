import { nav, navConfig } from "../../../../../../libs/spatial-navigation";

const navSection = "asset-view";

function addNavigationSection() {
  const cfg = { ...navConfig };
  cfg.selector = "div.asset-view-asset";
  cfg.leaveFor = { up: "@fullscreen-video-button", left: "@left-navigation-bar", down: "" };
  nav.add(navSection, cfg);
}

function removeNavigationSection() {
  nav.remove(navSection);
}

function refreshNavigationSection() {
  removeNavigationSection();
  addNavigationSection();
}

export { refreshNavigationSection };
