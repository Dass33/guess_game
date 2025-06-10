import { useEffect, useState, useRef, createContext, MutableRefObject, useContext } from "react";
import { getJsObjects } from "./fetchJson";

interface category {
    category: string;
    categorySlug: string;
    shownInStepper: string;
}


interface config {
    categories: category[];
    textPlay: string;
    roundsAmount: number;
    copyright: string;
    playerADefault: string;
    playerBDefault: string;
    pickNames: string;
    buttonNext: string;
    nowPlayPre: string;
    nowPlayPost: string;
    instructionsAPlayer: string;
    instructionsBPlayerPre: string;
    instructionsBPlayerPost: string;
    passDevice: string;
    resultBothFail: string;
    resultOneFail: string;
    resultBothSuccess: string;
    textAnswer: string;
    textGuessA: string;
    textGuessB: string;
    textSuccess: string;
    textGameover: string;
    colorA: string;
    colorB: string;
    gameTitle: string;
    textTutorial: string;
    textTutorialHead: string;
    textPickTheme: string;
    buttonNextRound: string;
    textPickAll: string;
    textClearAll: string;
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
    resultsText: string;
    authorsTitle: string;
    authorsText: string;
}

interface edition {
    editionTitle: string,
    editionSlug: string,
    editionCategories: string[],
}

interface question {
    question: string,
    categories: string,
    answers: [string, string, string, string, string],
}

interface treshold {
    thresholdValue: number,
    thresholdTexts: string,
}

interface GameLoopState {
    configData: config,
    editionsData: edition[],
    tresholdData: treshold[]
    questionsData: question[],
    isInitialized: MutableRefObject<boolean>,
    figmaColors: string[],
    roundStart: boolean,
    setRoundStart: Function,
    tutorial: boolean,
    setTutorial: Function,
    playerData: [Player, Player],
    setPlayerData: Function,
    selectedCategories: string[],
    setSelectedCategories: Function,
    selectedQuestions: question[],
    setSelectedQuestions: Function,
    roundsCount: number,
    setRoundsCount: Function,
    showQuestion: boolean,
    setShowQuestion: Function,
    showswitchPlayers: boolean,
    setShowSwitchPlayers: Function,
    showRoundEnd: boolean,
    setShowRoundEnd: Function,
    AAnswers: boolean,
    setAAnswers: Function,
    BAnswers: boolean,
    setBAnswers: Function,
    firstQuestion: boolean,
    setFirstQuestion: Function,
    secondQuestion: boolean,
    setSecondQuestion: Function,
    currRoundAnswers: string[],
    setCurrRoundAnswers: Function,
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
    const [tresholdData] = useJson(2);
    const [questionsData] = useJson(3);
    const isInitialized = useRef(false);
    const figmaColors = ['figma-black', 'figma-pool', 'figma-pool-40', 'figma-lavender-40'];
    const [roundStart, setRoundStart] = useState(true);
    const [tutorial, setTutorial] = useState(hideTutorial ? false : true);
    const [playerData, setPlayerData] = useState<[Player, Player]>([{ name: "", points: 0, }, { name: "", points: 0, }]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedQuestions, setSelectedQuestions] = useState<question[]>([]);
    const [roundsCount, setRoundsCount] = useState(0);
    const [showQuestion, setShowQuestion] = useState(false);
    const [showswitchPlayers, setShowSwitchPlayers] = useState(false);
    const [showRoundEnd, setShowRoundEnd] = useState(false);
    const [AAnswers, setAAnswers] = useState(true);
    const [BAnswers, setBAnswers] = useState(false);
    const [firstQuestion, setFirstQuestion] = useState(true);
    const [secondQuestion, setSecondQuestion] = useState(false);
    const [currRoundAnswers, setCurrRoundAnswers] = useState([]);

    return (
        <GameLoopContext.Provider value={{
            configData,
            editionsData,
            tresholdData,
            questionsData,
            isInitialized,
            figmaColors,
            roundStart, setRoundStart,
            tutorial, setTutorial,
            playerData, setPlayerData,
            selectedCategories, setSelectedCategories,
            selectedQuestions, setSelectedQuestions,
            roundsCount, setRoundsCount,
            showQuestion, setShowQuestion,
            showswitchPlayers, setShowSwitchPlayers,
            showRoundEnd, setShowRoundEnd,
            AAnswers, setAAnswers,
            BAnswers, setBAnswers,
            firstQuestion, setFirstQuestion,
            secondQuestion, setSecondQuestion,
            currRoundAnswers, setCurrRoundAnswers,
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
