var can;
var ct;
var ox = 0, oy = 0, x = 0, y = 0;
var mf = false;

var w = $('.canvas').width();
var h = $('.canvas').height();
$('#canvas').attr('width', w);
$('#canvas').attr('height', h);

function mam_draw_init() {
  can = document.getElementById("can");
  can.addEventListener("touchstart", onDown, false);
  can.addEventListener("touchmove", onMove, false);
  can.addEventListener("touchend", onUp, false);
  can.addEventListener("mousedown", onMouseDown, false);
  can.addEventListener("mousemove", onMouseMove, false);
  can.addEventListener("mouseup", onMouseUp, false);
  // 2次元キャンバスを作成
  ct = can.getContext("2d");
  ct.strokeStyle = "#000000";
  // ct.lineWidth = 1000;
  // ct.lineJoin = "round";　//文字の角を丸くする
  // ct.lineCap = "round"; //線端を丸くする
  // can.width = 500;
  // can.height = 500;
  clearCan();
}
function onDown(event) {
  mf = true;
  ox = event.touches[0].pageX - event.target.getBoundingClientRect().left;
  oy = event.touches[0].pageY - event.target.getBoundingClientRect().top;
  event.stopPropagation();
}
function onMove(event) {
  if (mf) {
    x = event.touches[0].pageX - event.target.getBoundingClientRect().left;
    y = event.touches[0].pageY - event.target.getBoundingClientRect().top;
    drawLine();
    ox = x;
    oy = y;
    event.preventDefault();
    event.stopPropagation();
  }
}
function onUp(event) {
  mf = false;
  event.stopPropagation();
}
function onMouseDown(event) {
  ox = event.clientX - event.target.getBoundingClientRect().left;
  oy = event.clientY - event.target.getBoundingClientRect().top;
  mf = true;
}
function onMouseMove(event) {
  if (mf) {
    x = event.clientX - event.target.getBoundingClientRect().left;
    y = event.clientY - event.target.getBoundingClientRect().top;
    drawLine();
    ox = x;
    oy = y;
  }
}
function onMouseUp(event) {
  mf = false;
}
function drawLine() {
  ct.beginPath();
  ct.moveTo(ox, oy);
  ct.lineTo(x, y);
  ct.lineWidth = 20;
  ct.lineJoin = "round";　//文字の角を丸くする
  ct.lineCap = "round"; //線端を丸くする
  ct.stroke();
}
function clearCan() {
  ct.fillStyle = "rgb(255,255,255)";
  ct.fillRect(0, 0, can.getBoundingClientRect().width, can.getBoundingClientRect().height);
}

// 画像のサーバーへのPOST
function sendImage() {
  // Canvas要素をPNG画像として保存
  var img = document.getElementById("can").toDataURL('image/png');
  img = img.replace('image/png', 'image/octet-stream');
  $.ajax({
    type: "POST",
    url: "http://localhost:5000",
    data: {
      "img": img
    }
  })
  // 送信に成功した場合の処理
  .done( (data) => {
    // $('#xxx')指定したID要素を取得
    $('#answer').html('答えは<span class="answer">'+data['ans']+'</span>です')
    $('#tweet').html('<a href="https://twitter.com/" class="tweet-button">結果をTweetする</a>')
  });
}