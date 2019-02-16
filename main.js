var ctx = document.getElementById('canvas');
var context = ctx.getContext('2d');

autoSetCanvasSize(ctx)

listenToMouse(ctx)
var eraserEnabled = false
// 四个功能
pen.onclick = function() {
  eraserEnabled = false
  pen.classList.add('active');
  eraser.classList.remove('active');
}
eraser.onclick = function() {
  eraserEnabled =true
  eraser.classList.add('active');
  pen.classList.remove('active');
}
shanchu.onclick = function() {
  context.clearRect(0, 0, ctx.width, ctx.height)
}
download.onclick = function() {
  var link = document.createElement('a');
  link.download = 'filename.png';
  link.href = document.getElementById('canvas').toDataURL()
  link.click();
}
/**
 * 颜色获取针对颜色进行东西
  */
balckBg.onclick = function() {
  context.strokeStyle = 'black';
  context.fillStyle = 'black';
  balckBg.classList.add('active');
  redBg.classList.remove('active');
  greenBg.classList.remove('active');
  blueBg.classList.remove('active');
}
redBg.onclick = function() {
  context.strokeStyle = 'red';
  context.fillStyle = 'red';
  redBg.classList.add('active');
  balckBg.classList.remove('active');
  greenBg.classList.remove('active');
  blueBg.classList.remove('active');
}
greenBg.onclick = function() {
  context.strokeStyle = 'green';
  context.fillStyle = 'green';
  greenBg.classList.add('active');
  redBg.classList.remove('active');
  balckBg.classList.remove('active');
  blueBg.classList.remove('active');
}
blueBg.onclick = function() {
  context.strokeStyle = 'blue';
  context.fillStyle = 'blue';
  blueBg.classList.add('active');
  redBg.classList.remove('active');
  greenBg.classList.remove('active');
  balckBg.classList.remove('active');
}
/******/

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.fillStyle = 'black'
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  // context.strokeStyle = 'black'
  context.moveTo(x1, y1) // 起点
  context.lineWidth = 5
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

function listenToMouse(canvas) {
  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  if(canvas.ontouchstart === undefined) {
    canvas.onmousedown = function(e) {
        var x = e.clientX
        var y = e.clientY
        using = true
        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          lastPoint = {
            "x": x,
            "y": y
          }
        }
      }
      canvas.onmousemove = function(e) {
        var x = e.clientX
        var y = e.clientY
    
        if (!using) {return}
    
        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          var newPoint = {
            "x": x,
            "y": y
          }
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
    
      }
      canvas.onmouseup = function(e) {
        using = false
      }
  } else {
      canvas.ontouchstart = function(e) {
        var x = e.touches[0].clientX
        var y = e.touches[0].clientY
        using = true
        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          lastPoint = {
            "x": x,
            "y": y
          }
        }
      }
      canvas.ontouchmove = function(e) {
        var x = e.touches[0].clientX
        var y = e.touches[0].clientY
    
        if (!using) {return}
    
        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          var newPoint = {
            "x": x,
            "y": y
          }
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
    
      }
      canvas.ontouchend = function() {
        using = false
      }
  }
  
}