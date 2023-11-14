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

    async AtribuirRecipiente(id, litragem, idEndereco){
        return await axios.put('https://localhost:7024/api/estoque/atualizar', {
            Id: id,
            Litragem: litragem,
            IdEndereco: idEndereco
        });
    }

    async DeletarEstoque(id){
        return await axios.delete('https://localhost:7024/api/estoque/deletar',{
            params:{
                id: id
            }
        })
    }

}

export default new EstoqueRepository();