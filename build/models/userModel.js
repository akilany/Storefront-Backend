"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.UserStore = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var database_1 = __importDefault(require("../database"));
var _a = process.env, PASSWORD_SECRET = _a.PASSWORD_SECRET, SALT_ROUNDS = _a.SALT_ROUNDS;
var saltRounds = parseInt(JSON.stringify(SALT_ROUNDS));
var UserStore = /** @class */ (function () {
    function UserStore() {
    }
    UserStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'SELECT id, first_name, last_name, email FROM users';
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        results = _a.sent();
                        connection.release();
                        return [2 /*return*/, results.rows];
                }
            });
        });
    };
    UserStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'SELECT * FROM users WHERE id=($1)';
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        results = _a.sent();
                        connection.release();
                        return [2 /*return*/, results.rows[0]];
                }
            });
        });
    };
    UserStore.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, hash, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email';
                        return [4 /*yield*/, bcrypt_1["default"].hash(user.password + PASSWORD_SECRET, saltRounds)];
                    case 2:
                        hash = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [
                                user.first_name,
                                user.last_name,
                                user.email,
                                hash,
                            ])];
                    case 3:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                }
            });
        });
    };
    UserStore.prototype.update = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'UPDATE users SET first_name=$1, last_name=$2, email=$3 WHERE id=$4 RETURNING id, first_name, last_name, email';
                        return [4 /*yield*/, connection.query(sql, [
                                user.first_name,
                                user.last_name,
                                user.email,
                                id,
                            ])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                }
            });
        });
    };
    UserStore.prototype.updatePassword = function (id, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, user, sql, hash, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()
                        // Get User Data
                    ];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, this.show(id)];
                    case 2:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 6];
                        return [4 /*yield*/, bcrypt_1["default"].compare(oldPassword + PASSWORD_SECRET, user.password)];
                    case 3:
                        if (!_a.sent()) return [3 /*break*/, 6];
                        sql = 'UPDATE users SET password=$1 WHERE id=$2 RETURNING id, first_name, last_name, email';
                        return [4 /*yield*/, bcrypt_1["default"].hash(newPassword + PASSWORD_SECRET, saltRounds)];
                    case 4:
                        hash = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [hash, id])];
                    case 5:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 6: return [2 /*return*/, null];
                }
            });
        });
    };
    UserStore.prototype.auth = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'SELECT * FROM users WHERE email=($1)';
                        return [4 /*yield*/, connection.query(sql, [email])];
                    case 2:
                        result = _a.sent();
                        if (!result.rows.length) return [3 /*break*/, 4];
                        user = result.rows[0];
                        return [4 /*yield*/, bcrypt_1["default"].compare(password + PASSWORD_SECRET, user.password)];
                    case 3:
                        if (_a.sent()) {
                            user.password = undefined;
                            return [2 /*return*/, user];
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/, null];
                }
            });
        });
    };
    UserStore.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'DELETE FROM users WHERE id=($1) RETURNING id, first_name, last_name, email';
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                }
            });
        });
    };
    return UserStore;
}());
exports.UserStore = UserStore;
