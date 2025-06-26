import { registerSW } from "virtual:pwa-register";

registerSW({
  immediate: true,
  onRegisteredSW(url: string) {
    console.log("SW registered at", url);
  },
  onOfflineReady() {
    console.log("App ready to work offline");
  },
});
