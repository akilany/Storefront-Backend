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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const req = (0, supertest_1.default)(server_1.default);
describe('User endpoints responses', function () {
    it('gets users endpoint', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield req.get('/s');
            expect(res.status).toBe(200);
        });
    });
    //   it('gets one user endpoint', async (done) => {
    //     const res = await req.get('/api/users/1')
    //     expect(res.status).toBe(200)
    //     done()
    //   })
    //   it('post one user endpoint', async (done) => {
    //     const res = await req.post('/api/users')
    //     expect(res.status).toBe(200)
    //     done()
    //   })
});
