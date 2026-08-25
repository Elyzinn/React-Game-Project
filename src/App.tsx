import { useState, useEffect, useCallback, useRef } from 'react'
import { AcoesExplorar } from './components/AcoesExplorar'


function App() {

  const [todos, setTodos] = useState({
    vida: 100,
    energia: 100,
    comida: 5,
    recursos: 0
  })

  let ref = useRef(0)

  //usar essa coisa aqui para a parte do historico
  useEffect(() => {
    setInterval(() => {

    }, 1000)
  }, [])

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
    ref.current = ref.current + 1
  }, [todos.energia, todos.vida])

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
    
    ref.current = ref.current + 1
  }, [todos.comida, todos.vida])

  const trabalhar = useCallback(() => {
    setTodos((valorAtual) => ({
      ...valorAtual,
      energia: valorAtual.energia - 25,
      recursos: valorAtual.recursos + 10
    }))
    alert("Você trabalhou e conseguiu obter novos recursos!")
    ref.current = ref.current + 1
  }, [todos.energia, todos.recursos])

  useEffect(() => {
    setTimeout(() => {
      if (ref.current === 2){
        
      }
    }, 10000)

    clearTimeout
  }, []);

  return (
    <>
      <h1>Vida: {todos.vida}</h1>
      <h1>Energia: {todos.energia}</h1>
      <h1>Comida: {todos.comida}</h1>
      <h1>Recursos: {todos.recursos}</h1>

      <main>

        <AcoesExplorar setTodos={setTodos} />
        <button onClick={trabalhar} style={{ marginRight: '10px' }} id="Trabalhar">Trabalhar</button>
        <button onClick={comer} style={{ marginRight: '10px' }} id="Comer">Comer</button>
        <button onClick={descansar} style={{ marginRight: '10px' }} id="Descansar">Descansar</button>

      </main>

    </>
  )
}

export default App


