// state //

// https://nwjs.readthedocs.io/en/latest/References/Window/
const win = nw.Window.get()
const zooms = {
  nw: 0,
  wv: 1,
}
// https://developer.chrome.com/docs/extensions/reference/webviewTag/
const wv = document.getElementById("webview")

// utils //

function event(id, event_type, func) {
  document.getElementById(id).addEventListener(event_type, func)
}

// commands //

function nwZoom() { win.zoomLevel = zooms.nw }
function nwZoomOut() { zooms.nw -= 0.05; nwZoom() }
function nwZoomIn() { zooms.nw += 0.05; nwZoom() }
function wvZoom() { wv.setZoom(zooms.wv) }
function wvZoomOut() { zooms.wv -= 0.02; wvZoom() }
function wvZoomIn() { zooms.wv += 0.02; wvZoom() }
function wvReload() { wv.setAttribute("src", wv.getAttribute("src")) }
function wvBack() { wv.back() }
function wvForward() { wv.forward() }
function toggleFullscreen() { win.toggleFullscreen() }
function destroyScrollbar() { wv.insertCSS({code: "body::-webkit-scrollbar { display: none !important; }"}) }
function open() {
  let src = prompt("Enter url:")
  if (!src.includes("://")) src = "https://" + src
  wv.setAttribute("src", src)
  setTimeout(() => {
    destroyScrollbar()
  }, 1)
  
}

// app //

function commands() {
  // Register icon clicks and keyboard shortcuts.
  for (const [key, id, func] of [
    ["Ctrl+Shift+G", "open", open],
    ["Ctrl+Shift+M", "nw-zoom-out", nwZoomOut],
    ["Ctrl+Shift+P", "nw-zoom-in", nwZoomIn],
    ["Ctrl+Shift+O", "webview-zoom-out", wvZoomOut],
    ["Ctrl+Shift+I", "webview-zoom-in", wvZoomIn],
    ["Ctrl+Shift+A", "back", wvBack],
    ["Ctrl+Shift+B", "forward", wvForward],
    ["Ctrl+Shift+S", "fullscreen", toggleFullscreen],
    ["Ctrl+Shift+R", "reload", wvReload],
  ]) {
    event(id, "click", func)
    nw.App.registerGlobalHotKey(new nw.Shortcut({key, active: func}));
  }

  // Other commands
  event("choose-device", "change", (e) =>
    document.getElementById("device").className = "device "+ e.target.value
  )
  event("color", "input", (e) =>
    document.querySelector("body").style["background-color"] = e.target.value
  )
}

function main() {
  // Allow video
  event("device", "permissionrequest", (e) => e.request.allow())

  // Register icon clicks and keyboard commands()
  commands()

  // Fixes that sometimes the zoomlevel inside the webview is wrong until the zoomlevel is changed.
  setTimeout(() => {
    nwZoom()
    wvZoom()
  }, 100)

  // Remove scrollbar in webview context.
  destroyScrollbar()
}

main()
