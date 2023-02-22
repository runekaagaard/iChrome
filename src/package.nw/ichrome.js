function icons() {
  var win = nw.Window.get()
  
  document.getElementById("plus").addEventListener("click", function() {
    win.zoomLevel += 0.1
  })
  document.getElementById("minus").addEventListener("click", function() {
    win.zoomLevel -= 0.1
  })
  document.getElementById("fullscreen").addEventListener("click", function() {
    win.toggleFullscreen()
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
  }, 0)
}

main()
