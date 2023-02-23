var zoom = 1.0

function icons() {
  var win = nw.Window.get()
  
  document.getElementById("nw-zoom-up").addEventListener("click", function() {
    win.zoomLevel += 0.1
  })
  document.getElementById("nw-zoom-down").addEventListener("click", function() {
    win.zoomLevel -= 0.1
  })
  document.getElementById("webview-zoom-up").addEventListener("click", function() {
    zoom += 0.02
    document.getElementById("webview").setZoom(window.zoom)
  })
  document.getElementById("webview-zoom-down").addEventListener("click", function() {
    zoom -= 0.02
    document.getElementById("webview").setZoom(window.zoom)
  })
  document.getElementById("fullscreen").addEventListener("click", function() {
    win.toggleFullscreen()
  })
  document.getElementById("choose-device").addEventListener("change", function(e) {
    console.log(e, e.target.value)
    document.getElementById("device").className = "device "+ e.target.value
  })
  document.getElementById("go").addEventListener("click", function(e) {
    document.getElementById("webview").setAttribute("src", document.getElementById("url").value)
  })
}

function main() {
  // Allow video
  document.getElementById("device").addEventListener('permissionrequest', function permissionRequest(e) {
    e.request.allow();
  })

  // Register icon clicks.
  icons()

  // Fixes that sometimes the zoomlevel inside the webview is wrong until the zoomlevel is changed.
  setTimeout(function() {
    var win = nw.Window.get()
    win.zoomLevel += 0.1
    win.zoomLevel -= 0.1
  }, 100)
}

main()
