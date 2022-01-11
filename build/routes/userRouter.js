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
router.use(authController_1["default"].protect);
router.route('/').get(userController_1["default"].getAll).post(userController_1["default"].createOne);
router
    .route('/:id')
    .get(userController_1["default"].getOne)
    .patch(userController_1["default"].updateOne)["delete"](userController_1["default"].deleteOne);
router.patch('/:id/change-password', userController_1["default"].changePassword);
exports["default"] = router;
