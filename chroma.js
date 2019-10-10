video = document.getElementById("video");
c1 = document.getElementById("canvas1");
ctx1 = this.c1.getContext("2d");

background = new Image();
background.src =
  "data:image/jpeg;base64,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";

screenshotButton = document.getElementById("take-screenshot");

screenshotButton.addEventListener("click", takeScreenshot);

function takeScreenshot() {
  var originalImage = new Image();
  originalImage.src = c1
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");

  ctx1.save();

  ctx1.drawImage(originalImage, 0, 0, 644, 484);
  ctx1.globalCompositeOperation = "destination-over";
  ctx1.drawImage(background, 0, 0, 644, 484);

  var image = c1
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  window.location.href = image;
  ctx1.restore();
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
  ctx1.drawImage(video, 0, 0, this.width, this.height);
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
  let frame = this.ctx1.getImageData(0, 0, this.width, this.height);

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
  this.ctx1.putImageData(frame, 0, 0);
  return;
}
