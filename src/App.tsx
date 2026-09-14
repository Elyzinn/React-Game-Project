import { useState, useEffect, useCallback } from 'react'
import { AcoesExplorar } from './components/AcoesExplorar'


function App() {

  const [todos, setTodos] = useState({
    vida: 100,
    energia: 100,
    comida: 5,
    recursos: 0
  })

  const [status, setStatus] = useState({
    estado : false
  })

  const [count, setCount] = useState(0)

  const descansar = useCallback(() => {
    //spread operator (...)
    // spread operator é usado para copiar as propriedades de um objeto para outro objeto.
    // nesse caso, ele está copiando apenas as propriedades passadas e deixando as outras propriedades do objeto inalteradas.
    setTodos((valorAtual) => ({
      ...valorAtual,
      energia: valorAtual.energia + 30,
      vida: valorAtual.vida + 5
    }))

    alert("Você descansou e recuperou suas forças!")
    setCount((valorAtual) => valorAtual + 1)
  }, [])

  const comer = useCallback(() => {
    if (todos.comida <= 0) {
      alert("Você não tem comida suficiente para comer!")
      return null
    }

    setTodos((valorAtual) => ({
      ...valorAtual,
      comida: valorAtual.comida - 1,
      vida: valorAtual.vida + 20
    }))

    alert("Você comeu e recuperou parte da vida!")

    setCount((valorAtual) => valorAtual + 1)
  }, [todos.comida])

  const trabalhar = useCallback(() => {
    setTodos((valorAtual) => ({
      ...valorAtual,
      energia: valorAtual.energia - 25,
      recursos: valorAtual.recursos + 10
    }))
    alert("Você trabalhou e conseguiu obter novos recursos!")
    setCount((valorAtual) => valorAtual + 1)
  }, [])

  useEffect(() => {
    if (status.estado) {
      setCount(0)
      setStatus({ estado: false })
    }
  }, [status.estado])


  return (
    <>
      <h1>Vida: {todos.vida}</h1>
      <h1>Energia: {todos.energia}</h1>
      <h1>Comida: {todos.comida}</h1>
      <h1>Recursos: {todos.recursos}</h1>

      <main>

        <AcoesExplorar
          //talvez de para colocar um if ternário aqui para validar se o status está true
          //e trabalhar ele no useEffect se ele estiver true vai reseta tudo.
          setStatus={setStatus} setTodos={setTodos} />
        {count < 2 && (
          <div style={{ float: 'inline-start' }} >
            <button onClick={trabalhar} style={{ marginRight: '10px' }} >Trabalhar</button>
            <button onClick={comer} style={{ marginRight: '10px' }} >Comer</button>
            <button onClick={descansar} style={{ marginRight: '10px' }} >Descansar</button>
          </div>
        )}

      </main>

    </>
  )
}

export default App


