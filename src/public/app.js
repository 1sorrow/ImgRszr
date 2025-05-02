
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();  // prevent normal form submission

  const fileInput = document.getElementById('fileInput');
  const widthInput = document.getElementById('widthInput');
  const heightInput = document.getElementById('heightInput');
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'Uploading...';

  const formData = new FormData();
  formData.append('image', fileInput.files[0]);
  formData.append('width', widthInput.value);
  formData.append('height', heightInput.value);

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();  // parse JSON response

    if (res.ok) {
      // success message
      resultDiv.innerHTML = `<p>${data.message}</p>`;
      
      // download button
      const downloadBtn = document.createElement('button');
      downloadBtn.textContent = '⬇️ Download Resized Image';
      downloadBtn.classList.add('download-btn');
      
      // download logic
      downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = data.imageUrl;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
      
      resultDiv.appendChild(downloadBtn);
      
      // display resized img
      const img = document.createElement('img');
      img.src = data.imageUrl;
      img.alt = 'Resized Image';
      img.style.marginTop = '1rem';
      img.style.maxWidth = '100%';
      img.style.border = '2px solid #000';
      img.style.borderRadius = '8px';
      resultDiv.appendChild(img);

    } else {
      // throw error
      resultDiv.innerHTML = `<p>Error: ${data.error}</p>`;
    }
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = '<p>An error occurred while uploading.</p>';
  }
});
