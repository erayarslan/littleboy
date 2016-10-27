var i = 0;

onmessage = function (event) {
  if (event.data == "start") {
    count();
  }
};

function count() {
  postMessage(i++);
  setTimeout(function () {
    count();
  }, 1000)
}