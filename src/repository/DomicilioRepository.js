import axios from "axios";

class DomicilioRepository {
    async CadastrarDomicilio(cep, rua, bairro, numero, estado, cidade, 
        valorSelecionado, coordenadas, altura, base, angulo, resultado) {
        return await axios.post('https://localhost:7024/api/endereco/cadastro', {
            Cep: cep,
            Rua: rua,
            Bairro: bairro,
            Numero: numero,
            Estado: estado,
            Cidade: cidade,
            IdSetor: valorSelecionado,
            Coordenadas: coordenadas,
            Altura: altura,
            Base: base,
            AnguloInclinacao: angulo,
            VolumeBacia: resultado
        });
    }

    async BuscarDomicilio(nome){
        return await axios.get('https://localhost:7024/api/endereco/buscar/nomeSetor', {
            params: {
                nomeSetor: nome
            }
        });
    }

    async DeletarDomicilio(id){
        return await axios.delete('https://localhost:7024/api/endereco/deletar',{
            params:{
                id: id
            }
        })
    }

    async EditarDomicilio(id, cep, rua, bairro, numero, estado, cidade, idSetor, coordenada, altura, base, anguloInclinacao, volumebacia){
        return await axios.put('https://localhost:7024/api/endereco/atualizar',{
           Id: id,
           Cep: cep,
           Rua: rua,
           Bairro: bairro,
           Numero: numero,
           Estado: estado,
           Cidade: cidade,
           IdSetor: idSetor,
           Coordenadas: coordenada,
           Altura: altura,
           Base: base,
           AnguloInclinacao: anguloInclinacao,
           VolumeBacia: volumebacia
        })
    }

}

export default new DomicilioRepository();