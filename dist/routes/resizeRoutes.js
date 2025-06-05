"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resizeController_1 = require("../controllers/resizeController");
const router = (0, express_1.Router)();
// post /api/resize
router.post("/", (req, res, next) => {
    Promise.resolve((0, resizeController_1.resizeImage)(req, res)).catch(next);
});
exports.default = router;
