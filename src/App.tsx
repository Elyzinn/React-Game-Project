import { useState, useEffect, useCallback, useRef } from 'react'
import { AcoesExplorar } from './components/AcoesExplorar'


function App() {

  const [todos, setTodos] = useState({
    vida: 100,
    energia: 100,
    comida: 5,
    recursos: 0
  })

  const [count, setCount] = useState(0)

  const [status, setStatus] = useState(false)

  const divRef = useRef<HTMLDivElement>(null)

  

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
    setCount(count + 1)
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

    setCount(count + 1)
  }, [todos.comida, todos.vida])

  const trabalhar = useCallback(() => {
    setTodos((valorAtual) => ({
      ...valorAtual,
      energia: valorAtual.energia - 25,
      recursos: valorAtual.recursos + 10
    }))
    alert("Você trabalhou e conseguiu obter novos recursos!")
    setCount(count + 1)
  }, [todos.energia, todos.recursos])

  console.log(count)

  useEffect(() => {
    if (count === 2) {
      if (divRef.current) {
        divRef.current.style.display = 'none'
      }
    }


    
  },[count])


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
        setTodos={setTodos} />
        <div ref={divRef} style={{ float: 'inline-start' }} >
          <button onClick={trabalhar} style={{ marginRight: '10px' }} >Trabalhar</button>
          <button onClick={comer} style={{ marginRight: '10px' }} >Comer</button>
          <button onClick={descansar} style={{ marginRight: '10px' }} >Descansar</button>
        </div>

      </main>

    </>
  )
}

export default App


