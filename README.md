# ImgRszr

ImgRszr is a lightweight web application that allows users to upload and resize images directly in the browser. It's built using Node.js, Express, TypeScript, Sharp, and Multer. The frontend uses vanilla HTML, CSS, and JavaScript for a sleek and simple user experience.

## Features

- Upload images through a web form
- Resize images to custom dimensions
- Download the resized image with a single click
- View a gallery of sample images to test resizing
- Black and white themed UI for clean aesthetics

## Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **Image Processing:** Sharp
- **Upload Handling:** Multer
- **Frontend:** HTML, CSS, JavaScript

## Folder Structure

```
project/
├── dist/               # Compiled output
├── images/             # Uploaded and resized images
├── node_modules/
├── src/
│   ├── controllers/    # Logic for upload and resize
│   ├── middlewares/    # Multer config
│   ├── public/         # Frontend files (index.html, CSS, JS)
│   ├── routes/         # Express route handlers
│   ├── utils/          # Utilities (if any)
│   ├── tests/          # Unit tests
│   └── index.ts        # App entry point
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/imgrszr.git
cd imgrszr
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build the project

```bash
npm run build
```

### 4. Start the server

```bash
npm start
```

Server will be running at: `http://localhost:3000`

## Usage

1. Go to the root URL.
2. Upload an image and specify the target width and height.
3. Click "Upload & Resize".
4. Download or view the resized image in the result section.

## .gitignore

Make sure to ignore `node_modules` and `dist` folders:

```
# .gitignore
node_modules/
dist/
```

## License

This project is open source and available under the MIT License.
