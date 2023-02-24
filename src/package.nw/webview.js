
// Continously hides the scrollbar inside the webview tag.
function allYourBarAreBelongToUs() {
  document.head.insertAdjacentHTML(
    "beforeend",
    `<style id="hide-scrollbar">*::-webkit-scrollbar { display: none !important; }</style>`)
}
