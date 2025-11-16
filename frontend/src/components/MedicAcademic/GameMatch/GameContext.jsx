import React, { createContext, useContext, useReducer, useEffect } from "react";

const initialState = {
    cards: [],
    flipped: [],
    matched: [],
    moves: 0,
    score: 0,
    isGameOver: false,
};

const GameContext = createContext();

const gameReducer = (state, action) => {
    switch (action.type) {
        case "SET_CARDS":
            return { ...state, cards: action.payload };
        case "FLIP_CARD": {
            const newMoves = state.moves + 1;

            if (state.flipped.length === 2) {
                const [firstId, secondId] = state.flipped;
                const firstCard = state.cards.find(c => c.id === firstId);
                const secondCard = state.cards.find(c => c.id === secondId);

                if (firstCard.value === secondCard.value) {
                    return {
                        ...state,
                        matched: [...state.matched, firstId, secondId],
                        flipped: [action.payload],
                        score: state.score + 10,
                        moves: newMoves,
                    };
                }

                return {
                    ...state,
                    flipped: [action.payload],
                    moves: newMoves,
                };
            }

            return {
                ...state,
                flipped: [...state.flipped, action.payload],
                moves: newMoves,
            };
        };
        case "SET_MATCHED":
            return {
                ...state,
                matched: [...state.matched, ...action.payload],
                score: state.score + 10
            };

        case "MATCH_FOUND":
            return {
                ...state,
                matched: [...state.matched, ...action.payload],
                flipped: [],
                score: state.score + 10,
            };
        case "RESET_FLIPPED":
            return { ...state, flipped: [] };

        case "RESET":
            return initialState;
        case "GAME_OVER":
            return { ...state, isGameOver: true };

        default:
            return state;
    }
};

export const generateCards = () => {
    const values = ['🍎', '🍌', '🍇', '🍓', '🍍', '🥝', '🍒', '🍉'];
    const cards = values
        .concat(values)
        .map((value, index) => ({ id: index, value }))
        .sort(() => Math.random() - 0.5);
    return cards;
};

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    useEffect(() => {
        const shuffledCards = generateCards();
        dispatch({ type: "SET_CARDS", payload: shuffledCards });
    }, []);

    useEffect(() => {
        if (state.matched.length === state.cards.length && state.cards.length > 0) {
            dispatch({ type: "GAME_OVER" });
        }
    }, [state.matched, state.cards]);

    useEffect(() => {
        if (state.cards.length === 0) {
            const shuffledCards = generateCards();
            dispatch({ type: "SET_CARDS", payload: shuffledCards });
        }
    }, [state.cards]);

    useEffect(() => {
        if (state.flipped.length !== 2) return;

        const [aId, bId] = state.flipped;
        const a = state.cards.find(c => c.id === aId);
        const b = state.cards.find(c => c.id === bId);

        const isMatch = a?.value === b?.value;

        if (isMatch) {
            dispatch({ type: "SET_MATCHED", payload: [aId, bId] });
            setTimeout(() => dispatch({ type: "RESET_FLIPPED" }), 150);
        } else {
            setTimeout(() => dispatch({ type: "RESET_FLIPPED" }), 600);
        }
    }, [state.flipped, state.cards, dispatch]);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error("useGame must be used within GameProvider");
    return context;
};

export const useGameStats = () => {
    const { state } = useGame();
    return {
        moves: state.moves,
        score: state.score,
        isGameOver: state.isGameOver,
        matchedCount: state.matched.length,
    };
};
