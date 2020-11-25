

var ctx = document.getElementById('canvas');
var context = ctx.getContext('2d');

autoSetCanvasSize(ctx)

listenToMouse(ctx)
var eraserEnabled = false
// 四个功能
pen.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active');
  eraser.classList.remove('active');
}
eraser.onclick = function () {
  eraserEnabled = true
  eraser.classList.add('active');
  pen.classList.remove('active');
}
shanchu.onclick = function () {
  context.clearRect(0, 0, ctx.width, ctx.height)
}
download.onclick = async function  ()  {
  // alert('1111')
  var link = document.createElement('a');
  var canvas = document.getElementById('canvas')
  var dataUrl = canvas.toDataURL();

  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const objectUrl = window.URL.createObjectURL(blob);

  link.href = objectUrl;
  // link.download = `filename${+new Date()}.png`;
  // link.target = '_blank';

  // link.href = './main.js';
  link.download = `1.png`;
  link.target = '_blank';
  link.click();


  console.log('dataUrl++++', objectUrl)
  // canvas.toBlob(function (blobObj) {
  //   console.log('11111', blobObj)
  // })

  // let bstr = atob(dataUrl.split(",")[1]);
  // let n = bstr.length;
  // let u8arr = new Uint8Array(n);
  // while (n--) {
  //   u8arr[n] = bstr.charCodeAt(n);
  // }
  // let blob = new Blob([u8arr]);
  // console.log('blon++++', blob)
  // window.navigator.msSaveOrOpenBlob(blob, "chart-download" + "." + "png");


  // var linkUrl = dataURLtoBlob(dataUrl)
  // console.log('datr++++', linkUrl)

  // link.href = linkUrl;
  // link.download = `filename${+new Date()}.png`;
  // link.click();
}
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}


/**
 * 颜色获取针对颜色进行东西
  */
balckBg.onclick = function () {
  context.strokeStyle = 'black';
  context.fillStyle = 'black';
  balckBg.classList.add('active');
  redBg.classList.remove('active');
  greenBg.classList.remove('active');
  blueBg.classList.remove('active');
}
redBg.onclick = function () {
  context.strokeStyle = 'red';
  context.fillStyle = 'red';
  redBg.classList.add('active');
  balckBg.classList.remove('active');
  greenBg.classList.remove('active');
  blueBg.classList.remove('active');
}
greenBg.onclick = function () {
  context.strokeStyle = 'green';
  context.fillStyle = 'green';
  greenBg.classList.add('active');
  redBg.classList.remove('active');
  balckBg.classList.remove('active');
  blueBg.classList.remove('active');
}
blueBg.onclick = function () {
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

  window.onresize = function () {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height); 
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
  if (canvas.ontouchstart === undefined) {
    canvas.onmousedown = function (e) {
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
    canvas.onmousemove = function (e) {
      var x = e.clientX
      var y = e.clientY

      if (!using) { return }

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
    canvas.onmouseup = function (e) {
      using = false
    }
  } else {
    canvas.ontouchstart = function (e) {
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
    canvas.ontouchmove = function (e) {
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY

      if (!using) { return }

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
    canvas.ontouchend = function () {
      using = false
    }
  }

}
