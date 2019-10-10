video = document.getElementById("video");
canvas = document.getElementById("canvas1");
backgroundSelect = document.getElementById("backgroundSelect");
background = document.getElementById("background");
canvas_context = this.canvas.getContext("2d");

screenshotButton = document.getElementById("take-screenshot");

screenshotButton.addEventListener("click", takeScreenshot);

backgroundSelect.addEventListener('change', (e) => {
  background.src = e.target.value;
});

function takeScreenshot() {
  var originalImage = new Image();
  var backgroundImage = new Image();
  backgroundImage.src = background.src;

  backgroundImage.onload = () => {
    originalImage.src = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    canvas_context.save();

    canvas_context.drawImage(originalImage, 0, 0, 644, 484);
    canvas_context.globalCompositeOperation = "destination-over";
    canvas_context.drawImage(backgroundImage, 0, 0, 644, 484);

    var image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    window.location.href = image;
    canvas_context.restore();
  }
}

// Get video
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function(stream) {
    // Put video input into video tag
    video.srcObject = stream;

    let self = this;

    this.video.addEventListener(
      "loadeddata",
      function() {
        self.width = self.video.videoWidth;
        self.height = self.video.videoHeight;

        self.time_callback();
      },
      false
    );
  })
  .catch(function(error) {
    console.log("Error:", error);
  });

function draw() {
  canvas_context.drawImage(video, 0, 0, this.width, this.height);
}

function time_callback() {
  if (video.paused || video.ended) {
    return;
  }

  draw();
  findColor(color);

  // Update all the time, otherwise the canvas won't be up to date with the video
  setTimeout(function() {
    this.time_callback();
  }, 0);
}

function pickedFilter() {
  var selector = document.getElementById("colorFilter");
  color = selector.options[selector.selectedIndex].value;

  time_callback();
}

// Which color? Green or blue?
pickedFilter();
colorFilter.addEventListener("change", pickedFilter);

function findColor(color) {
  let frame = this.canvas_context.getImageData(0, 0, this.width, this.height);

  let l = frame.data.length / 4;

  if (color === "Green") {
    for (let i = 0; i < l; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];

      if (g > r && g > b) {
        // If it's too dark it's probably not right
        if (g > 100) {
          // Alpha value to 0
          frame.data[i * 4 + 3] = 0;
        }
      }
    }
  } else if (color === "Red") {
    for (let i = 0; i < l; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];

      if (r > b && r > g) {
        if (r > 100) {
          frame.data[i * 4 + 3] = 0;
        }
      }
    }
  } else {
    for (let i = 0; i < l; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];

      if (b > r && b > g) {
        if (b > 100) {
          frame.data[i * 4 + 3] = 0;
        }
      }
    }
  }

  // Put the modified data back into the canvas
  this.canvas_context.putImageData(frame, 0, 0);
  return;
}
