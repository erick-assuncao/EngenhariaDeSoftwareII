

const STATE = {
    DICE_NOT_ROLLED: 0,
    DICE_ROLLED: 1
};

export class Ludo {
    constructor() {
        this._valorDado = 0;
        this.turn = 0;
        this.state = STATE.DICE_NOT_ROLLED;
        this.currentPositions = {
            0: { 1: 0, 2: 0, 3: 0, 4: 0 },
            1: { 1: 0, 2: 0, 3: 0, 4: 0 }
        };
    }

    get valorDado() {
        return this._valorDado;
    }

    set valorDado(valor) {
        this._valorDado = valor;
    }

    getPecasPossiveis(player) {
        const posicaoInicialPlayer = 0;
        const posicaoFinalPlayer = 10;

        const peao = this.currentPositions[player][1]; // Considerando apenas o peão 1 para simplificar

        if (peao === posicaoInicialPlayer && this.valorDado === 6) {
            this.logEvent('Peão 1 pode ser movido');
            return true;
        } else if (peao !== posicaoInicialPlayer && peao + this.valorDado <= posicaoFinalPlayer) {
            this.logEvent('Peão 1 pode ser movido');
            return true;
        } else {
            this.logEvent('Peão 1 não pode ser movido');
            return false;
        }
    }

    logEvent(event) {
        const eventsDiv = document.getElementById('events');
        eventsDiv.innerHTML += `<p>${event}</p>`;
    }

    incrementarTurno() {
        this.turn = this.turn === 0 ? 1 : 0;
        this.state = STATE.DICE_NOT_ROLLED;
    }

    onDiceClick() {
        console.log('dice clicked!');
        this._valorDado = 1 + Math.floor(Math.random() * 6);
        this.state = STATE.DICE_ROLLED;

        this.getPecasPossiveis(0); // Aqui você precisa passar o jogador como argumento
    }

    setPosicaoPeca(player, piece, newPosition) {
        this.currentPositions[player][piece] = newPosition;
        // UI.setPiecePosition(player, piece, newPosition); // Como UI não está definido, comentei essa linha
    }

    moverPeca(player, piece, moveBy) {
        const interval = setInterval(() => {
            this.setPosicaoPeca(player, piece, this.currentPositions[player][piece] + 1);
            moveBy--;

            if (moveBy === 0) {
                clearInterval(interval);

                // check if player won
                if (this.currentPositions[player][piece] === 10) {
                    alert(`Player: ${player} has won!`);
                    // this.resetGame(); // Se você tiver uma função para resetar o jogo, você pode chamá-la aqui
                    return;
                }

                this.incrementarTurno();
            }
        }, 200);
    }
}
