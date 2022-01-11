"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var productController_1 = __importDefault(require("../controllers/productController"));
var authController_1 = __importDefault(require("../controllers/authController"));
var router = express_1["default"].Router();
router
    .route('/')
    .get(productController_1["default"].getAll)
    .post(authController_1["default"].protect, productController_1["default"].createOne);
router
    .route('/:id')
    .get(productController_1["default"].getOne)
    .patch(authController_1["default"].protect, productController_1["default"].updateOne)["delete"](authController_1["default"].protect, productController_1["default"].deleteOne);
router.get('/category/:category', productController_1["default"].getByCategory);
exports["default"] = router;
