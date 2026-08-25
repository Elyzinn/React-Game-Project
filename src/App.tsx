//useEffect cuidará da vida e demais atributos
//Mais para frente fazer o menu interativo
// para a função de acao, da para adicionar um contador de escolhas,
//e a cada duas escolhas sem ser Explorar, fazer com que a terceira escolha seja Explorar, e que a cada escolha de Explorar, o contador zere.
import { useState, useEffect, useCallback } from 'react'
import { RegrasDeAcao } from './components/RegrasDeAcao'


function App() {

  const [vida, alterarVida] = useState(100)
  const [energia, alterarEnergia] = useState(100)
  const [comida, alterarComida] = useState(5)
  const [recursos, alterarRecursos] = useState(0)

  const [todos, setTodos] = useState({
    vida: 100,
    energia: 100,
    comida: 5,
    recursos: 0
  })

  //usar essa coisa aqui para a parte do historico
  useEffect(() => {
    setInterval(() => {

    }, 1000)
  }, [])

  const descansar = useCallback(() => {
    alterarEnergia(energia + 30)
    alterarVida(vida + 5)

    //spread operator (...)
    setTodos((valorAtual) => ({
      ...valorAtual,// comida: 5 e recurso: 0
      energia: valorAtual.energia + 30,
      vida: valorAtual.vida + 5
    }))


    alert("Você descansou e recuperou suas forças!")
  }, [energia, vida])

  const comer = useCallback(() => {
    if (comida <= 0) {
      alert("Você não tem comida suficiente para comer!")
      return null
    }

    alterarComida(comida - 1)
    alterarVida(vida + 20)
    alert("Você comeu e recuperou parte da vida!")

  }, [comida, vida])

  const trabalhar = useCallback(() => {
    alterarEnergia(energia - 25)
    alterarRecursos(recursos + 10)
    alert("Você trabalhou e conseguiu obter novos recursos!")
  }, [energia, recursos])

  const [count] = useState(0);
  const [calculation, setCalculation] = useState(0);
  useEffect(() => {
    // setCalculation(() => )
  })

  return (
    <>
      <h1>Vida: {vida}</h1>
      <h1>Energia: {energia}</h1>
      <h1>Comida: {comida}</h1>
      <h1>Recursos: {recursos}</h1>

      <main>

        <RegrasDeAcao alterarComida={alterarComida} comida={comida} alterarEnergia={alterarEnergia} energia={energia} alterarVida={alterarVida} vida={vida} alterarRecursos={alterarRecursos} recursos={recursos} />
        <button onClick={trabalhar} style={{ marginRight: '10px' }}>Trabalhar</button>
        <button onClick={comer} style={{ marginRight: '10px' }}>Comer</button>
        <button onClick={descansar} style={{ marginRight: '10px' }}>Descansar</button>

      </main>

    </>
  )
}

export default App


