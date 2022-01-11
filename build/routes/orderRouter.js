"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var orderController_1 = __importDefault(require("../controllers/orderController"));
var authController_1 = __importDefault(require("../controllers/authController"));
var router = express_1["default"].Router();
router.use(authController_1["default"].protect);
router.route('/').get(orderController_1["default"].getAll).post(orderController_1["default"].createOne);
router
    .route('/:id')
    .get(orderController_1["default"].getOne)["delete"](orderController_1["default"].deleteOne);
router
    .route('/:id/products')
    .get(orderController_1["default"].getOrderProducts)
    .post(orderController_1["default"].addProduct);
exports["default"] = router;
