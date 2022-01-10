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
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const userModel_1 = require("../../models/userModel");
const store = new userModel_1.UserStore();
describe('User Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have an show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have an create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have an update method', () => {
        expect(store.update).toBeDefined();
    });
    it('should have an delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('index method should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual([]);
    }));
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            name: 'test user',
            email: 'test@ex.com',
            password: '123456',
        });
        expect(result).toEqual({
            id: 1,
            name: 'test user',
            email: 'test@ex.com',
            password: result.password,
        });
    }));
    //   it('update method should update a user name and email', async () => {
    //     const result = await store.create({
    //       name: 'test user update',
    //       email: 'test-update@ex.com',
    //     })
    //     expect(result).toEqual({
    //       id: result.id,
    //       name: 'test user update',
    //       email: 'test-update@ex.com',
    //       password: result.password,
    //     })
    //   })
    it('show method should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show(1);
        expect(result).toEqual({
            id: 1,
            name: 'test user',
            email: 'test@ex.com',
            password: result.password,
        });
    }));
    it('delete method should remove the user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield store.delete(1);
        const result = yield store.index();
        expect(result).toEqual([]);
    }));
});