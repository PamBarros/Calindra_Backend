const apiGeocode = require('./axios')
const modal = require('./modal')
const keyApi = ''


module.exports = {
    index: async (req, res) => {
        const { enderecos } = req.body

        if(!enderecos || enderecos.length < 2)
            return res.status(400).send({ erro: 'Erro ao calcular', msg: 'Por favor, informar pelo menos dois enderecos' }) 

        let calculo = { distancias: [] }

        try {
            for await (const item of enderecos){
                const response = await apiGeocode.get(`/json?key=${keyApi}&address=${modal.formatarEnd(item.endereco)}`)

                if(response.data.status === 'REQUEST_DENIED')
                    return res.status(400).send({ erro: 'Erro ao calcular', msg: response.data.error_message }) 
                
                if(response.data.status === 'ZERO_RESULTS')
                    return res.status(400).send({ erro: 'Erro ao calcular', msg: 'Endereço não encontrado' }) 

                item.geo = response.data.results[0].geometry.location
            }

            for (let i = 0; i < enderecos.length; i++) {
                for (let j = i + 1; j < enderecos.length; j++) {
                    const distancia = modal.calcularDis(enderecos[i].geo, enderecos[j].geo)
                    
                    calculo.distancias.push({
                        endereco1: {
                            endereco: enderecos[i].endereco,
                            coordenadas: enderecos[i].geo
                        },
                        endereco2: {
                            endereco: enderecos[j].endereco,
                            coordenadas: enderecos[j].geo
                        },
                        distancia: modal.MetroEmKM(distancia)
                    })
                }
            }   
            const distOrd = calculo.distancias.sort((a, b) => a.distancia - b.distancia)
            
            calculo.minDis = distOrd[0]
            calculo.maxDis = distOrd[distOrd.length - 1]
        
            res.status(200).send(calculos)

        } catch (error) {
            res.status(400).send({ erro: 'Erro ao calcular', msg: error.message })
        }
    }
}