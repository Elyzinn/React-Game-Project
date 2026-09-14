import { useCallback, useState } from "react"

interface AcoesProps {
    setTodos: React.Dispatch<React.SetStateAction<{
        vida: number;
        energia: number;
        comida: number;
        recursos: number;
    }>>;

    setStatus: React.Dispatch<React.SetStateAction<{
        estado : boolean
    }>>;
}

export function AcoesExplorar({ setTodos, setStatus}: AcoesProps) {
//trabalhar as ações de explorar, e mandar o resultado para o App
const [num, setNum] = useState(0);

function gerarNumero(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const explorar = useCallback(() => {
    const resultado = gerarNumero(1, 5);
    setNum(resultado);
    if (num === 1) {
        setTodos((valorAtual) => ({
            ...valorAtual,
            comida: valorAtual.comida + 2
        }));
        alert("Você encontrou comida abandonada!");
    }
    if (num === 2) {
        setTodos((valorAtual) => ({
            ...valorAtual,
            recursos: valorAtual.recursos + 10
        }));
        alert("Você encontrou madeira e outros materiais úteis!");
    }
    if (num === 3) {
        setTodos((valorAtual) => ({
            ...valorAtual,
            energia: valorAtual.energia - 40
        }));
        alert("Você ficou exausto durante a exploração.");
    }
    if (num === 4) {
        setTodos((valorAtual) => ({
            ...valorAtual,
            vida: valorAtual.vida - 45
        }));
        alert("Você sofreu um acidente durante a exploração.");
    }
    if (num === 5) {
        alert("Você explorou a região, mas não encontrou nada.");
    }

    setStatus((estadoAtual) => ({
        estado : estadoAtual.estado = true
    }));
}, [num, setTodos]);


return (
    <>
        <button onClick={explorar} style={{ marginRight: '10px' }}>Explorar</button>
    </>
)
}

