"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var userRouter_1 = __importDefault(require("./routes/userRouter"));
var errorController_1 = __importDefault(require("./controllers/errorController"));
var appError_1 = __importDefault(require("./utils/appError"));
dotenv_1["default"].config();
var app = (0, express_1["default"])();
var PORT = process.env.PORT;
app.use((0, cors_1["default"])());
app.use(body_parser_1["default"].json());
app.use((0, morgan_1["default"])('dev'));
// Routes
app.use('/api/users', userRouter_1["default"]);
app.get('/', function (req, res) {
    res.send('Storefront Backend API');
});
// Catch Unhandled Routes
app.all('*', function (req, res, next) {
    next(new appError_1["default"]("Can't find ".concat(req.originalUrl, " on this server"), 404));
});
app.use(errorController_1["default"]);
app.listen(PORT, function () {
    console.log("App listinging on port ".concat(PORT));
});
