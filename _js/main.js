import "@zachleat/table-saw";
import Alpine from 'alpinejs';
import debugLog from "./_debugLog";

window.Alpine = Alpine;

function domLoaded(callback) {
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback();
}

Alpine.data("CampaignURLBuilder", () => ({
  url: "",
  id: "",
  source: "",
  medium: "",
  name: "",
  term: "",
  content: "",
  generatedURL: "",
  copySuccess: false,
  copyToClipboard() {
    navigator.clipboard.writeText(this.generatedURL).then(() => {
      debugLog("Copied to clipboard");
      this.copySuccess = true;
      setTimeout(() => {
        this.copySuccess = false;
      }, 3000);
    });
  },
  generateURL() {
    try {
      debugLog("Generating URL");
      const generatedURL = new URL(this.url);
      if (this.source)
        generatedURL.searchParams.set("utm_source", this.source);
      if (this.medium)
        generatedURL.searchParams.set("utm_medium", this.medium);
      if (this.name)
        generatedURL.searchParams.set("utm_campaign", this.name);
      if (this.id)
        generatedURL.searchParams.set("utm_id", this.id);
      if (this.term)
        generatedURL.searchParams.set("utm_term", this.term);
      if (this.content)
        generatedURL.searchParams.set("utm_content", this.content);
      this.generatedURL = generatedURL.toString();
      debugLog("Generated URL: " + this.generatedURL);
    } catch (error) {
      debugLog("Error generating URL: " + error);
      this.generatedURL = "";
    }
  },
  init() {
    debugLog("Campaign URL Builder initialized");
  }
}));


domLoaded(() => {
  Alpine.start();
});
