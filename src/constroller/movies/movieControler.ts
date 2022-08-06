import { Request, Response } from "express"
import { initializeApp } from "firebase/app";
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore"
import { firebaseConfig } from "../../utils/firebaseConfig";
import { verificaId } from "../../utils/functions";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class MovieController{
    getMovieById = async (req: Request, res: Response) =>{ //Retorna um filme de acordo com o ID passado no params - OK
        try {
            const {id} = req.params
            if(id){
                const docRef = doc(db, "filmes",id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return res.json({status: 1,id: docSnap.id, data: docSnap.data()})
                  } else {
                    return res.status(404).json({status: 0, message:"Não localizado no banco de dados, verifique o id"})
                }
            }else{
                res.status(500).json({status: 0, message:"Não conseguiu ler o ID"})
            }
        } catch (error) {
            return res.status(500).json({status: 0, message: "Não conseguiu realizar a consulta",error})
        }
    }

    getMovies = async (req: Request, res: Response) =>{ // Retorna todos os documentos da coleção filmes - OK
        let data = [] as any[]
        try {
            const querySnapshot = await getDocs(collection(db, "filmes"));
            querySnapshot.forEach((doc) => {
                data.push({id: doc.id, data: doc.data(), message:"Consulta realizada com sucesso"})
            });
            return res.json({status: 1, data })
        } catch (error) {
            return res.status(500).json({status: 0, message: "Não conseguiu realizar a consulta",error})
        }
    }
    CreateMovie = async (req: Request, res: Response) =>{ // Cadastra um novo filme na coleção
        try{
            const {nome, ano, critica} = req.body
            const numberAno = Number(ano)
            if(numberAno && nome && critica){
                const filmesRef = collection(db, "filmes");
                await setDoc(doc(filmesRef), {nome: nome, ano: numberAno, critica: critica})
                return res.status(200).json({status: 1, message:"Filme cadastrado com sucesso"})  
            }else{
                return res.status(404).json({status: 0, message:"ID ou Nome não foi informado"})
            }
        }catch (error) {
            return res.status(500).json({status: 0, message: "Não conseguiu realizar a consulta",error})            
        }
    }
    updateMovie = async (req: Request, res: Response) =>{ // Altera um filme na coleção de acordo com o ID
        try {
            const {id} = req.params
            const {nome, ano, critica} = req.body
            if(id && nome && ano && critica){
                if(await verificaId(id)){ // verifica se tem alguem com este ID no banco de dados
                    const fillme = doc(db, "filmes", id);                    
                    await updateDoc(fillme, {
                        nome: nome,
                        ano: ano,
                        critica
                    });
                    return res.json({status:1, message:"Atualizado com sucesso!"})                      
                }else{
                    return res.status(500).json({status: 0, message:"Não encontrou este ID no banco de dados"})
                }
            }else{
                return res.status(500).json({status: 0, message:"Faltou passar algum argumento, ID, nome ou ano"})
            }
        } catch (error) {
            return res.status(500).json({status: 0, message: "Não conseguiu realizar a consulta",error})
        }
    }
    deleteMovie = async (req: Request, res: Response) =>{  // Deleta um filme da colção de acordo com o ID
        try {
            const {id} = req.params
            if(id){
                await deleteDoc(doc(db, "filmes", id));
                return res.json({status:1, message:"Excluido com sucesso"})
            }else{
                return res.status(404).json({status: 0, message:"ID não foi informado"})
            }
            
        } catch (error) {
            return res.status(500).json({status: 0, message: "Não conseguiu realizar a consulta",error})
        }
    }   
}
export const moviecontroller = new MovieController()
