import axios from "axios";

class CalculoRepository {
    async CalcularVolume(altura, base, angulo) {
        const response = await axios.get('https://localhost:7024/api/endereco/calcular-volume', {
            params:{
                Altura: altura,
                Base: base,
                AnguloInclinacao: angulo
            }
        })

        const resultadoConvertido = response.data.replace(',', '.');

        return resultadoConvertido;
    };
}

export default new CalculoRepository();