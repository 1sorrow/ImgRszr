document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("uploadForm");
  const fileInput = document.getElementById("fileInput");
  const widthInput = document.getElementById("widthInput");
  const heightInput = document.getElementById("heightInput");
  const resultDiv = document.getElementById("result");
  const carouselTrack = document.querySelector(".carousel-track");

  // ✅ Validate file type before upload
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/bmp",
      "image/tiff",
    ];

    if (file && !allowedTypes.includes(file.type)) {
      alert("Only image files are allowed");
      fileInput.value = "";
    }
  });

  // ✅ Submit form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        resultDiv.innerHTML = `<p class="error">${data.error}</p>`;
      } else {
        resultDiv.innerHTML = `<p class="success">${data.message}</p>
          <img src="${data.imageUrl}" alt="Resized image" />
        `;
        addImageToGallery(data.imageUrl, data.filename);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      resultDiv.innerHTML = `<p class="error">Upload failed</p>`;
    }
  });

  // ✅ Add image to gallery
  function addImageToGallery(url, name) {
    const img = document.createElement("img");
    img.src = url;
    img.alt = name;
    img.classList.add("clickable");
    img.addEventListener("click", () => {
      // Prefill image name, width, height for resizing
      const filenameOnly = name.replace(/^resized-\d+-/, "");
      widthInput.value = "";
      heightInput.value = "";
      fileInput.value = "";
      resultDiv.innerHTML = `
        <form id="resizeForm">
          <p>Resizing <strong>${filenameOnly}</strong></p>
          <input type="number" name="width" placeholder="Width (px)" required />
          <input type="number" name="height" placeholder="Height (px)" required />
          <button type="submit">Resize Again</button>
        </form>
      `;

      const resizeForm = document.getElementById("resizeForm");
      resizeForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const width = resizeForm.elements.width.value;
        const height = resizeForm.elements.height.value;

        try {
          const res = await fetch("/api/resize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageName: name, width, height }),
          });

          const data = await res.json();
          if (data.error) {
            resultDiv.innerHTML = `<p class="error">${data.error}</p>`;
          } else {
            resultDiv.innerHTML = `<p class="success">${data.message}</p>
              <img src="${data.imageUrl}" alt="Resized again" />
            `;
            addImageToGallery(data.imageUrl, data.imageUrl.split("/").pop());
          }
        } catch (err) {
          console.error("Resize failed:", err);
          resultDiv.innerHTML = `<p class="error">Resize failed</p>`;
        }
      });
    });

    carouselTrack.appendChild(img);
  }

  // ✅ Load gallery on page load
  async function loadGallery() {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      carouselTrack.innerHTML = "";
      data.files.forEach((filename) => {
        const imgUrl = `/images/${filename}`;
        addImageToGallery(imgUrl, filename);
      });
    } catch (err) {
      console.error("Failed to load gallery:", err);
    }
  }

  loadGallery();
});
