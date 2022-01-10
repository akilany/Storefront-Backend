"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var userController_1 = __importDefault(require("../controllers/userController"));
var authController_1 = __importDefault(require("../controllers/authController"));
var router = express_1["default"].Router();
router.post('/login', authController_1["default"].login);
router.post('/signup', authController_1["default"].signup);
router.patch('/:id/change-password', userController_1["default"].changePassword);
router
    .route('/')
    .get(authController_1["default"].protect, userController_1["default"].getAll)
    .post(authController_1["default"].protect, userController_1["default"].createOne);
router
    .route('/:id')
    .get(authController_1["default"].protect, userController_1["default"].getOne)
    .patch(authController_1["default"].protect, userController_1["default"].updateOne)["delete"](authController_1["default"].protect, userController_1["default"].deleteOne);
exports["default"] = router;
