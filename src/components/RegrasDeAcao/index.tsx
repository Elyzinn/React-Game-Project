import { useCallback, useState } from "react"

interface RegrasDeAcaoProps {
    alterarComida: (comida: number) => void;
    comida: number;

    alterarEnergia: (energia: number) => void;
    energia: number;

    alterarVida: (vida: number) => void;
    vida: number;

    alterarRecursos: (recursos: number) => void;
    recursos: number;
}

export function RegrasDeAcao({ alterarComida, comida, alterarEnergia, energia, alterarVida, vida, alterarRecursos, recursos }: RegrasDeAcaoProps) {
//trabalhar as ações de explorar, e mandar o resultado para o App
const [num, setNum] = useState(0);

function gerarNumero(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const explorar = useCallback(() => {
    const resultado = gerarNumero(1, 5);
    setNum(resultado);
    if (num === 1) {alterarComida(comida + 2); alert("Você encontrou comida abandonada!")}
    if (num === 2) {alterarRecursos(recursos + 10); alert("Você encontrou madeira e outros materiais úteis!")}
    if (num === 3) {alterarEnergia(energia - 40) ; alert("Você ficou exausto durante a exploração.")}
    if (num === 4) {alterarVida(vida - 45); alert("Você sofreu um acidente durante a exploração")}
    if (num === 5) {alert("Você explorou a região, mas não encontrou nada.")}
},[num, alterarComida, comida, alterarEnergia, energia, alterarVida, vida, alterarRecursos, recursos]);

// puxar o resultado da função explorar para o App, e fazer com que a cada escolha de explorar, o contador zere.


return (
    <>
        <button onClick={explorar} style={{ marginRight: '10px' }}>Explorar</button>
    </>
)
}

