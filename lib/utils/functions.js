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
exports.verificaId = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebaseConfig_1 = require("./firebaseConfig");
const app = (0, app_1.initializeApp)(firebaseConfig_1.firebaseConfig);
const db = (0, firestore_1.getFirestore)(app);
const verificaId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = (0, firestore_1.doc)(db, "filmes", `${id}`);
    const docSnap = yield (0, firestore_1.getDoc)(docRef);
    if (docSnap.data()) {
        return true;
    }
    return false;
});
exports.verificaId = verificaId;
