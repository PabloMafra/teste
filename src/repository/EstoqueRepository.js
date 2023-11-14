import axios from "axios";

class EstoqueRepository {
    async CadastrarEstoque(nome) {
        return await axios.post('https://localhost:7024/api/estoque/cadastro', {
            Litragem: nome
        });
    }

    async BuscarEstoque(nome){
        return await axios.get('https://localhost:7024/api/estoque/listar', {
            params: {
                Litragem: nome
            }
        });
    }
}

export default new EstoqueRepository();