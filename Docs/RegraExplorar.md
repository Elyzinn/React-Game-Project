# Documentacao das alteracoes do ciclo de acoes

Este documento explica as alteracoes feitas no ciclo de acoes do projeto React.

## Objetivo

O jogo possui quatro acoes principais:

- `Trabalhar`
- `Comer`
- `Descansar`
- `Explorar`

A regra implementada e:

1. O jogador pode escolher duas acoes principais.
2. Depois da segunda acao, as acoes `Trabalhar`, `Comer` e `Descansar` deixam de aparecer.
3. A acao `Explorar` continua disponivel.
4. Ao escolher `Explorar`, um evento aleatorio e executado.
5. Depois da exploracao, o contador e reiniciado.
6. As tres acoes principais aparecem novamente.
7. O ciclo pode recomecar.

O resultado esperado e que `Explorar` seja obrigatoriamente a proxima acao depois de duas escolhas.

## Arquivos alterados

As alteracoes foram feitas nestes arquivos:

- `src/App.tsx`
- `src/components/AcoesExplorar/index.tsx`

## Alteracoes em `src/App.tsx`

### 1. Remocao do `useRef`

Antes, o componente importava `useRef` e guardava uma referencia para o elemento que continha os botoes:

```tsx
import { useState, useEffect, useCallback, useRef } from 'react'

const divRef = useRef<HTMLDivElement>(null)
```

Essa referencia era usada para alterar diretamente o estilo do elemento:

```tsx
divRef.current.style.display = 'none'
```

Essa abordagem foi removida. Agora a visibilidade dos botoes e controlada pelo estado do React, usando renderizacao condicional. Isso deixa o estado da interface sincronizado com o estado do componente.

### 2. O contador `count`

O estado abaixo registra quantas acoes principais foram realizadas no ciclo atual:

```tsx
const [count, setCount] = useState(0)
```

Cada vez que o jogador executa `Trabalhar`, `Comer` ou `Descansar`, o contador aumenta em um:

```tsx
setCount((valorAtual) => valorAtual + 1)
```

Foi usada a forma funcional de atualizacao porque ela sempre recebe o valor mais recente do estado. Isso e mais seguro do que usar diretamente `count + 1`, principalmente quando existem varias atualizacoes proximas.

### 3. Atualizacao nas funcoes de acao

As tres funcoes principais continuam atualizando os atributos do jogador.

#### `trabalhar`

- Diminui `25` pontos de energia.
- Adiciona `10` recursos.
- Aumenta o contador do ciclo.

#### `comer`

- Verifica se existe comida disponivel.
- Se nao houver comida, exibe um alerta e nao conta a acao.
- Se houver comida, diminui `1` unidade de comida.
- Recupera `20` pontos de vida.
- Aumenta o contador do ciclo.

A acao nao e contada quando o jogador tenta comer sem comida, pois a funcao retorna antes de chamar `setCount`.

#### `descansar`

- Adiciona `30` pontos de energia.
- Adiciona `5` pontos de vida.
- Aumenta o contador do ciclo.

### 4. Renderizacao condicional dos botoes

Os botoes principais agora estao dentro desta condicao:

```tsx
{count < 2 && (
  <div style={{ float: 'inline-start' }}>
    <button onClick={trabalhar}>Trabalhar</button>
    <button onClick={comer}>Comer</button>
    <button onClick={descansar}>Descansar</button>
  </div>
)}
```

O funcionamento e:

- Quando `count` vale `0` ou `1`, os botoes aparecem.
- Quando `count` vale `2`, a expressao `count < 2` fica falsa.
- Nesse momento, os botoes deixam de ser renderizados.
- O botao `Explorar` continua visivel porque esta fora da condicao.

Essa e a parte que garante que, depois de duas escolhas, o jogador seja direcionado obrigatoriamente para `Explorar`.

### 5. Reset do ciclo com `useEffect`

O componente recebe de `AcoesExplorar` o estado `status.estado`. Quando a exploracao termina, esse valor muda para `true`.

O `useEffect` observa essa mudanca:

```tsx
useEffect(() => {
  if (status.estado) {
    setCount(0)
    setStatus({ estado: false })
  }
}, [status.estado])
```

Quando `status.estado` e `true`:

1. `setCount(0)` reinicia o contador.
2. Como `count` volta a ser `0`, os botoes principais aparecem novamente.
3. `setStatus({ estado: false })` limpa o sinal de exploracao.
4. O estado fica pronto para receber uma nova exploracao no proximo ciclo.

O reset do status e importante porque evita que o efeito continue tratando o mesmo evento como se fosse uma nova exploracao.

## Alteracoes em `src/components/AcoesExplorar/index.tsx`

### 1. Remocao do estado `num`

Antes, o resultado sorteado era guardado em um estado local:

```tsx
const [num, setNum] = useState(0)
```

Esse estado nao era necessario, pois o resultado so precisa ser usado durante a execucao atual da funcao `explorar`. Por isso, o `useState` foi removido.

### 2. Uso direto do resultado sorteado

A funcao gera um numero entre `1` e `5`:

```tsx
const resultado = gerarNumero(1, 5)
```

Cada resultado representa um evento:

| Resultado | Evento | Alteracao no jogador |
| --- | --- | --- |
| `1` | Encontrou comida | Adiciona `2` unidades de comida |
| `2` | Encontrou materiais | Adiciona `10` recursos |
| `3` | Ficou exausto | Remove `40` pontos de energia |
| `4` | Sofreu um acidente | Remove `45` pontos de vida |
| `5` | Nao encontrou nada | Nenhuma alteracao nos atributos |

Os testes usam diretamente a variavel `resultado`:

```tsx
if (resultado === 1) {
  // evento de encontrar comida
}
```

### 3. Correcao de um problema de atualizacao assincrona

Antes, o codigo fazia isto:

```tsx
setNum(resultado)

if (num === 1) {
  // evento
}
```

O problema e que atualizacoes de estado do React nao acontecem imediatamente. Portanto, `num` ainda poderia conter o resultado anterior quando os testes fossem executados.

Isso fazia com que o evento exibido pudesse nao corresponder ao numero sorteado atual.

A correcao foi usar `resultado` diretamente nos testes. Dessa forma, o evento executado sempre corresponde ao sorteio atual.

### 4. Comunicacao com o componente pai

Depois de executar o evento de exploracao, o componente informa ao `App` que a exploracao terminou:

```tsx
setStatus({ estado: true })
```

O `App` recebe essa informacao pelo `useEffect`, zera o contador e libera novamente os botoes principais.

### 5. Dependencias do `useCallback`

A funcao `explorar` usa as funcoes recebidas por propriedade, por isso suas dependencias sao:

```tsx
[setStatus, setTodos]
```

A dependencia `num` foi removida porque o estado `num` tambem deixou de existir.

## Fluxo completo de execucao

Considere o seguinte exemplo:

1. Estado inicial: `count = 0`.
2. O jogador escolhe `Trabalhar`.
3. O contador passa para `1`.
4. O jogador escolhe `Descansar`.
5. O contador passa para `2`.
6. A condicao `count < 2` passa a ser falsa.
7. `Trabalhar`, `Comer` e `Descansar` deixam de aparecer.
8. O jogador escolhe `Explorar`.
9. Um numero entre `1` e `5` e sorteado.
10. O efeito correspondente e aplicado.
11. `status.estado` recebe `true`.
12. O `useEffect` do `App` executa `setCount(0)`.
13. Os tres botoes principais aparecem novamente.
14. O ciclo recomeca.

## Ponto importante sobre `Comer`

A acao `Comer` possui uma validacao propria. Se `todos.comida` for menor ou igual a zero, a funcao exibe:

```tsx
alert("Voce nao tem comida suficiente para comer!")
```

Nesse caso, ela retorna sem aumentar `count`. Portanto, uma tentativa invalida de comer nao consome uma das duas acoes permitidas.

## Validacao realizada

A compilacao foi executada com:

```bash
npm run build
```

O build foi concluido com sucesso, incluindo a verificacao do TypeScript e a compilacao do Vite.

## Resumo

A correcao principal foi substituir a alteracao manual de `style.display` por renderizacao condicional baseada em `count`. O ciclo agora e controlado pelo React:

- `count` controla quantas acoes ja foram feitas.
- `count < 2` controla a exibicao das acoes principais.
- `Explorar` altera `status.estado`.
- O `useEffect` detecta a exploracao e reinicia o contador.
- O resultado da exploracao e aplicado imediatamente usando a variavel `resultado`.
