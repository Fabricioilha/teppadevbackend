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
exports.moviecontroller = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebaseConfig_1 = require("../../utils/firebaseConfig");
const functions_1 = require("../../utils/functions");
const app = (0, app_1.initializeApp)(firebaseConfig_1.firebaseConfig);
const db = (0, firestore_1.getFirestore)(app);
class MovieController {
    constructor() {
        this.getMovieById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (id) {
                    const docRef = (0, firestore_1.doc)(db, "filmes", id);
                    const docSnap = yield (0, firestore_1.getDoc)(docRef);
                    if (docSnap.exists()) {
                        return res.json({ status: 1, id: docSnap.id, data: docSnap.data() });
                    }
                    else {
                        return res.status(404).json({ status: 0, message: "Não localizado no banco de dados, verifique o id" });
                    }
                }
                else {
                    res.status(500).json({ status: 0, message: "Não conseguiu ler o ID" });
                }
            }
            catch (error) {
                return res.status(500).json({ status: 0, message: "Não conseguiu realizar a consulta", error });
            }
        });
        this.getMovies = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let data = [];
            try {
                const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(db, "filmes"));
                querySnapshot.forEach((doc) => {
                    //filme:doc.data(), id: doc.id
                    data.push({ id: doc.id, data: doc.data(), message: "Consulta realizada com sucesso" });
                });
                return res.json({ status: 1, data });
            }
            catch (error) {
                return res.status(500).json({ status: 0, message: "Não conseguiu realizar a consulta", error });
            }
        });
        this.postMovie = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, ano } = req.body;
                const numberAno = Number(ano);
                if (numberAno && nome) {
                    const filmesRef = (0, firestore_1.collection)(db, "filmes");
                    yield (0, firestore_1.setDoc)((0, firestore_1.doc)(filmesRef), { nome: nome, ano: numberAno });
                    return res.status(200).json({ status: 1, message: "Filme cadastrado com sucesso" });
                }
                else {
                    return res.status(404).json({ status: 0, message: "ID ou Nome não foi informado" });
                }
            }
            catch (error) {
                return res.status(500).json({ status: 0, message: "Não conseguiu realizar a consulta", error });
            }
        });
        this.putMovie = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { nome, ano } = req.body;
                if (id && nome && ano) {
                    if (yield (0, functions_1.verificaId)(id)) { // verifica se tem alguem com este ID no banco de dados
                        const fillme = (0, firestore_1.doc)(db, "filmes", id);
                        yield (0, firestore_1.updateDoc)(fillme, {
                            nome: nome,
                            ano: ano
                        });
                        return res.json({ status: 1, message: "Atualizado com sucesso!" });
                    }
                    else {
                        return res.status(500).json({ status: 0, message: "Não encontrou este ID no banco de dados" });
                    }
                }
                else {
                    return res.status(500).json({ status: 0, message: "Faltou passar algum argumento, ID, nome ou ano" });
                }
            }
            catch (error) {
                return res.status(500).json({ status: 0, message: "Não conseguiu realizar a consulta", error });
            }
        });
        this.deleteMovie = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (id) {
                    yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(db, "filmes", id));
                    return res.json({ status: 1, message: "Excluido com sucesso" });
                }
                else {
                    return res.status(404).json({ status: 0, message: "ID não foi informado" });
                }
            }
            catch (error) {
                return res.status(500).json({ status: 0, message: "Não conseguiu realizar a consulta", error });
            }
        });
    }
}
exports.moviecontroller = new MovieController();
