import { useEffect, useState, useRef, createContext, MutableRefObject, useContext } from "react";
import { getJsObjects } from "./fetchJson";

interface config {
    textPlay: string;
    copyright: string;
    playerADefault: string;
    playerBDefault: string;
    pickNames: string;
    buttonNext: string;
    nowPlay: string;
    instructionsAPlayer: string;
    instructionsBPlayer: string;
    passDevice: string;
    resultBothFail: string;
    resultOneFail: string;
    resultBothSuccess: string;
    textAnswer: string;
    textGuessA: string;
    textGuessB: string;
    colorA: string;
    colorB: string;
    gameTitle: string;
    textTutorial: string;
    textTutorialHead: string;
    textPickTheme: string;
    buttonNextRound: string;
    textPickRandom: string;
    soundJingle: string;
    soundButtonClick: string;
    soundQuestionClick: string;
    soundAnswerCorrect: string;
    soundAnswerWrong: string;
    soundChangeStandings: string;
    soundTimerThreshold: string;
    soundTimerOver: string;
    soundNextRound: string;
    soundFinalRound: string;
    soundVictory: string;
    textRestart: string;
    textPlaying: string;
    colorTeamC: string;
    colorTeamD: string;
    colorTeamE: string;
    correctSpeed: number;
    teamBName: string;
    teamCName: string;
    teamDName: string;
    teamEName: string;
    time: number;
    timeOutStart: number;
    flashFrequency: number;
    timeOutText: number;
    exitQtext: string;
    exitQYes: string;
    exitQNo: string;
    textPickNrTeams: string;
    exitTooltipText: string;
    nextRoundText: string;
    textStartGame: string;
    imagesURL: string;
    textRound: string;
    textFirstRound: string;
    textLastRound: string;
    attentionFlash: number;
    prettyURL: string;
}

export interface editions {
    editionTitle: string,
    editionSlug: string,
    editionCategories: string[],
}

interface questions {
    question: string,
    categories: string,
    answers: [string, string, string, string, string],
}

interface GameLoopState {
    configData: config,
    editionsData: editions[],
    questionsData: questions[],
    showSite: number,
    setShowSite: Function,
    numberOfSites: number,
    nextRound: boolean,
    setNextRound: Function,
    isInitialized: MutableRefObject<boolean>,
    figmaColors: string[],
    roundStart: boolean,
    setRoundStart: Function,
    tutorial: boolean,
    setTutorial: Function,
    playerData: [Player, Player],
    setPlayerData: Function,
}

interface Player {
    name: string,
    points: number,
}


const GameLoopContext = createContext<GameLoopState | undefined>(undefined);

// Index 0 is config, 1 editions, 2 is question
export function useJson(index: number) {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await getJsObjects();
                if (fetchedData) {
                    setData(fetchedData[index]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setData(null);
            }
        };
        fetchData();
    }, [index]);

    return [data, setData];
}

export const GameLoopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const hideTutorial = localStorage.getItem("tutorial") == "false";

    const [configData] = useJson(0);
    const [editionsData] = useJson(1);
    const [questionsData] = useJson(2);
    const [showSite, setShowSite] = useState(0);
    const numberOfSites = 1;
    const [nextRound, setNextRound] = useState(false);
    const isInitialized = useRef(false);
    const figmaColors = ['figma-black', 'figma-pool', 'figma-pool-40', 'figma-lavender-40'];
    const [roundStart, setRoundStart] = useState(true);
    const [tutorial, setTutorial] = useState(hideTutorial ? false : true);
    const [playerData, setPlayerData] = useState<[Player, Player]>([{ name: "", points: 0, }, { name: "", points: 0, }]);

    return (
        <GameLoopContext.Provider value={{
            configData,
            editionsData,
            questionsData,
            showSite, setShowSite,
            numberOfSites,
            nextRound, setNextRound,
            isInitialized,
            figmaColors,
            roundStart, setRoundStart,
            tutorial, setTutorial,
            playerData, setPlayerData
        }}>
            {children}
        </GameLoopContext.Provider>
    );
};

export const useGameLoop = () => {
    const context = useContext(GameLoopContext);
    if (!context) {
        throw new Error('useGameLoop must be used within a GameProvider');
    }
    return context;
}
