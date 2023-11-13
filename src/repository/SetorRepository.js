import axios from "axios";

class SetorRepository {
    async CadastrarSetor(nome) {
        return await axios.post('https://localhost:7024/api/setor/cadastro', {
            Nome: nome
        });
    }

    async BuscarSetor(nome){
        return await axios.get('https://localhost:7024/api/setor/listar', {
            params: {
                nomeSetor: nome
            }
        });
    }
}

export default new SetorRepository();