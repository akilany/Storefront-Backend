"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var handlerController_1 = __importDefault(require("./handlerController"));
var productModel_1 = require("../models/productModel");
var store = new productModel_1.ProductStore();
var getAll = handlerController_1["default"].index(store);
var getOne = handlerController_1["default"].show(store);
var createOne = handlerController_1["default"].createOne(store);
var updateOne = handlerController_1["default"].updateOne(store);
var deleteOne = handlerController_1["default"].deleteOne(store);
exports["default"] = {
    getAll: getAll,
    getOne: getOne,
    createOne: createOne,
    updateOne: updateOne,
    deleteOne: deleteOne
};
