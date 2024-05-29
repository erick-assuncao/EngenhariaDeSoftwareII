/**
 * @jest-environment jsdom
 */

import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { JSDOM } from "jsdom";

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

adicionaElementos();

import { UI } from "./UI";

describe('UI', () => {
    const diceButtonElement = document.querySelector('#dice-btn');

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("listenDiceClick", () => {
        it('deve adicionar callback para diceButtonElement', async () => {
            const mockCallback = jest.fn();
            UI.listenDiceClick(mockCallback);

            diceButtonElement.click();

            expect(mockCallback).toHaveBeenCalled();
        });
    });

    describe("listenResetClick", () => {
        it('deve adicionar callback para reset-btn', async () => {
            const mockCallback = jest.fn();
            UI.listenResetClick(mockCallback);

            document.querySelector('button#reset-btn').click();

            expect(mockCallback).toHaveBeenCalled();
        });
    });

    describe("listenPieceClick", () => {
        it('deve adicionar callback para .player-pieces', async () => {
            const mockCallback = jest.fn();
            UI.listenPieceClick(mockCallback);

            document.querySelector('.player-pieces').click();

            expect(mockCallback).toHaveBeenCalled();
        });
    });

    describe("enableDice", () => {
        it('deve ativar dado', async () => {
            const diceButtonElement = document.querySelector('#dice-btn');
            diceButtonElement.setAttribute('disabled', '');

            UI.enableDice();

            expect(diceButtonElement.getAttribute('disabled')).toBeUndefined();
        });
    });

    describe("disableDice", () => {
        it('deve desativar dado', async () => {
            const diceButtonElement = document.querySelector('#dice-btn');
            diceButtonElement.removeAttribute('disabled');

            UI.disableDice();

            expect(diceButtonElement.getAttribute('disabled')).toBeDefined();
        });
    });
});

function adicionaElementos() {
    let el = document.createElement('button');
    el.id = 'dice-btn';
    document.body.appendChild(el);

    el = document.createElement('button');
    el.id = 'reset-btn';
    document.body.appendChild(el);

    el = document.createElement('div');
    el.classList.add('player-pieces');
    document.body.appendChild(el);

    el = document.createElement('div');
    el.classList.add('dice-value');
    document.body.appendChild(el);
}
