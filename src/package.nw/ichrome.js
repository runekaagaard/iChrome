const win = nw.Window.get()
const zooms = {
  nw: 0,
  wv: 1,
}
const wv = document.getElementById("webview")

function nwZoom() { win.zoomLevel = zooms.nw }
function nwZoomOut() { zooms.nw -= 0.05; nwZoom() }
function nwZoomIn() { zooms.nw += 0.05; nwZoom() }
function wvZoom() { wv.setZoom(zooms.wv) }
function wvZoomOut() { zooms.wv -= 0.02; wvZoom() }
function wvZoomIn() { zooms.wv += 0.02; wvZoom() }
function wvReload() { wv.setAttribute("src", wv.getAttribute("src")) }

function icons() {
  document.getElementById("nw-zoom-out").addEventListener("click", nwZoomOut)
  document.getElementById("nw-zoom-in").addEventListener("click", nwZoomIn)
  document.getElementById("webview-zoom-out").addEventListener("click", wvZoomOut)
  document.getElementById("webview-zoom-in").addEventListener("click", wvZoomIn)
  document.getElementById("fullscreen").addEventListener("click", () => win.toggleFullscreen())
  document.getElementById("reload").addEventListener("click", wvReload)
  document.getElementById("choose-device").addEventListener("change", function(e) {
    document.getElementById("device").className = "device "+ e.target.value
  })
  document.getElementById("go").addEventListener("click", function(e) {
    wv.setAttribute("src", document.getElementById("url").value)
  })
}

function shortcuts() {
  for (const [key, active] of [
    ["Ctrl+Shift+P", nwZoomIn],
    ["Ctrl+Shift+M", nwZoomOut],
    ["Ctrl+Shift+I", wvZoomIn],
    ["Ctrl+Shift+O", wvZoomOut],
    ["Ctrl+Shift+S", () => { win.toggleFullscreen()}],
    ["Ctrl+Shift+R", wvReload],
  ]) {
    nw.App.registerGlobalHotKey(new nw.Shortcut({key, active}));
  }
}

function main() {
  // Allow video
  document.getElementById("device").addEventListener('permissionrequest', function permissionRequest(e) {
    e.request.allow();
  })

  // Register icon clicks and keyboard shortcuts()
  icons()
  shortcuts()

  // Fixes that sometimes the zoomlevel inside the webview is wrong until the zoomlevel is changed.
  setTimeout(function() {
    nwZoom()
    wvZoom()
  }, 100)

  // Remove scrollbar in webview context.
  wv.insertCSS({code: "body::-webkit-scrollbar { display: none; }"})
}

main()
