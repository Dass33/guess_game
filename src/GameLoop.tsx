import { useState } from "react";
import { useGame } from "./GameContext";
import { useGameLoop } from "./GameLoopContext";
import cross from "../src/assets/cross.svg"


function NewRound() {
    const { round } = useGame();
    const { roundsCount, configData,
        playerData, setRoundStart,
        setShowQuestion,
    } = useGameLoop();

    return (
        <div className="flex flex-col justify-center h-screen-dvh text-figma-black bg-figma-lavender-40">
            <div className="flex flex-col justify-between h-screen-dvh max-h-[50rem]">
                <div className="lg:mt-40 mt-28">
                    <h1 className="text-[5.16rem] text-center font-bold text-figma-black relative z-10">{round}/{roundsCount}</h1>
                    <div className="mx-auto w-[5.5rem] py-1 bg-figma-white rounded-full mt-12">
                        <p className="text-center font-bold text-[3.25rem] mx-auto">A</p>
                    </div>
                    <p className="text-center mt-16 text-figma-black font-bold text-2xl">
                        {configData.nowPlayPre} {playerData[0].name}{configData.nowPlayPost}
                    </p>
                </div>


                <div className="relative z-10 text-figma-white mb-16">
                    <button className="block mx-auto text-2xl bg-figma-black rounded-full py-2 px-7 font-bold hover:scale-110 duration-200"
                        onClick={() => {
                            setRoundStart(false);
                            setShowQuestion(true);
                        }}>
                        {"->"} {configData.buttonNext}
                    </button>
                </div>
            </div>
        </div>
    );
}

function RoundEnd() {
    const { setRound, round, setEndGame } = useGame();
    const { configData, setShowRoundEnd, setPlayerData,
        playerData, setRoundStart, currRoundAnswers,
        setCurrRoundAnswers, roundsCount } = useGameLoop();

    const [a_ans, a_tip, b_ans, b_tip] = currRoundAnswers;
    const correctAnswers = Number(a_tip === b_ans) + Number(a_ans === b_tip);
    let resultMessage = "";
    switch (correctAnswers) {
        case 2:
            resultMessage = configData.resultBothSuccess;
            break;
        case 1: resultMessage = configData.resultOneFail;
            break;
        case 0: resultMessage = configData.resultBothFail;
            break;
    }

    return (
        <div className="h-screen-dvh text-figma-black bg-white flex flex-col justify-center">
            <div className="flex flex-col justify-between h-screen-dvh max-h-[50rem] mx-auto sm:w-[40rem]">
                <div className="">
                    <p className="mx-auto text-center mt-16 text-figma-black font-bold text-2xl px-3 max-w-96">
                        {resultMessage}
                    </p>
                    <div className="flex mt-12 items-start">
                        <div className="mx-auto max-w-36">
                            <div className="mx-auto w-[3rem] py-1 bg-figma-lavender-40 rounded-full">
                                <p className="text-center font-bold text-[1.62rem] mx-auto">A</p>
                            </div>
                            <p className="text-center mx-auto my-3 font-bold text-xs">{configData.textAnswer}</p>
                            <p className="font-bold text-center h-20">{a_ans}</p>
                            <p className="text-center mx-auto mt-4 mb-8 font-bold text-xs">{configData.textGuessB}</p>

                            <div className="mx-auto max-w-36">
                                <div className="mx-auto h-20 flex items-center justify-center text-figma-pool-40 text-center relative px-4">
                                    <p className="font-bold mx-auto">{b_tip}</p>
                                    {a_ans != b_tip &&
                                        <img className="absolute top-1/2 transform -translate-y-1/2"
                                            src={cross} alt="cross" />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto max-w-36">
                            <div className="mx-auto w-[3rem] py-1 bg-figma-pool-40 rounded-full">
                                <p className="text-center font-bold text-[1.62rem] mx-auto">B</p>
                            </div>
                            <p className="text-center mx-auto my-3 font-bold text-xs">{configData.textAnswer}</p>
                            <p className="font-bold text-center h-20">{b_ans}</p>
                            <p className="text-center mx-auto mt-4 mb-8 font-bold text-xs">{configData.textGuessA}</p>
                            <div className="mx-auto max-w-36">
                                <div className="mx-auto h-20 flex items-center justify-center text-figma-lavender-40 text-center relative px-4">
                                    <p className="font-bold mx-auto">{a_tip}</p>
                                    {a_tip != b_ans &&
                                        <img className="absolute top-1/2 transform -translate-y-1/2"
                                            src={cross} alt="cross" />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="relative z-10 text-figma-white mb-16 mt-8">
                    <button className="block mx-auto text-2xl bg-figma-black rounded-full py-2 px-7 font-bold hover:scale-110 duration-200"
                        onClick={() => {
                            setRoundStart(true);
                            setShowRoundEnd(false);
                            const player1 = playerData[0];
                            const player2 = playerData[1];
                            player1.points += Number(a_tip == b_ans);
                            player2.points += Number(a_ans == b_tip);
                            setPlayerData([player1, player2]);
                            setCurrRoundAnswers([]);
                            if (round + 1 > roundsCount) setEndGame(true);
                            setRound(round + 1);
                        }}>
                        {"->"} {round < roundsCount
                            ? configData.buttonNextRound
                            : configData.resultsText}
                    </button>
                </div>
            </div>
        </div>
    );
}

function SwitchPlayers() {
    const { } = useGame();
    const { configData, setShowSwitchPlayers,
        playerData, setShowQuestion } = useGameLoop();

    return (
        <div className="h-screen-dvh text-figma-black flex flex-col justify-center
            bg-gradient-to-r from-figma-lavender-40 to-figma-pool-40">
            <div className="flex flex-col justify-between sm:w-[40rem] mx-auto h-screen-dvh max-h-[50rem]">
                <div className="lg:mt-40 mt-32">
                    <div className="flex mt-12 items-center">
                        <div className="mx-auto">
                            <p className="text-center mx-auto mb-2 font-bold">{playerData[0].name}</p>
                            <div className="mx-auto w-[5.5rem] py-1 bg-figma-white rounded-full">
                                <p className="text-center font-bold text-[3.25rem] mx-auto">A</p>
                            </div>
                        </div>
                        <span className="text-5xl font-bold mt-7">{"->"}</span>
                        <div className="mx-auto">
                            <p className="text-center mx-auto mb-2 font-bold">{playerData[1].name}</p>
                            <div className="mx-auto w-[5.5rem] py-1 bg-figma-white rounded-full">
                                <p className="text-center font-bold text-[3.25rem] mx-auto">B</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-center mt-16 sm:mt-24 text-figma-black font-bold text-2xl">
                        {configData.passDevice}
                    </p>
                </div>


                <div className="relative z-10 text-figma-white mb-16">
                    <button className="block mx-auto text-2xl bg-figma-black rounded-full py-2 px-7 font-bold hover:scale-110 duration-200"
                        onClick={() => {
                            setShowQuestion(true);
                            setShowSwitchPlayers(false);
                        }}>
                        {"->"} {configData.buttonNext}
                    </button>
                </div>
            </div>
        </div>
    );
}

function Question() {
    const { round } = useGame();
    const { configData, selectedQuestions,
        setShowRoundEnd,
        AAnswers,
        setAAnswers,
        firstQuestion,
        setFirstQuestion,
        setShowQuestion,
        setShowSwitchPlayers,
        playerData,
        setCurrRoundAnswers, currRoundAnswers,
    } = useGameLoop();
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const bgColor = AAnswers
        ? "bg-figma-lavender-40"
        : "bg-figma-pool-40";

    const currQuestion = selectedQuestions[round - 1];

    return (
        <div className={`flex flex-col justify-center h-screen-dvh text-figma-black ${bgColor}`}>
            <div className="flex flex-col justify-between h-screen-dvh max-h-[50rem]">
                <div className="flex flex-col justify-between w-full md:w-[40rem] mx-auto h-screen-dvh">
                    <div className="lg:mt-12 mt-8 bg-white m-4 rounded-lg p-4">
                        <div className="flex gap-5 items-center">
                            {firstQuestion ?
                                <>
                                    <div className="w-[3rem] py-1 bg-figma-black rounded-full">
                                        <p className="text-center font-bold text-white text-[1.6rem] mb-[1px] mx-auto">
                                            {AAnswers ? "A" : "B"}
                                        </p>
                                    </div>
                                    <h1 className="text-[1rem] font-bold text-figma-black relative z-10">{configData.instructionsAPlayer}</h1>
                                </>
                                :
                                <div className="justify-end flex gap-3 w-full items-center">
                                    <h1 className="text-[1rem] font-bold text-end text-figma-black relative z-10">
                                        {configData.instructionsBPlayerPre} {AAnswers ? playerData[1].name : playerData[0].name}{configData.instructionsBPlayerPost}
                                    </h1>
                                    <div className="min-w-[3rem] mt-[1px] py-1 bg-figma-black rounded-full">
                                        <p className="text-center font-bold text-white text-[1.6rem] mb-[1px] mx-auto">
                                            {AAnswers ? "B" : "A"}
                                        </p>
                                    </div>
                                </div>
                            }

                        </div>
                        <p className="mt-6 text-figma-black font-bold text-lg text-start">
                            {currQuestion.question}
                        </p>
                    </div>

                    <div className="flex flex-col mx-5">
                        {currQuestion.answers.map((answer, index) => (
                            <label
                                key={index}
                                className={`flex items-center gap-2 py-3 cursor-pointer ${index !== currQuestion.answers.length - 1
                                    ? 'border-b border-figma-black' : ''}`}
                            >
                                <input
                                    type="radio"
                                    name="answers"
                                    value={answer}
                                    checked={selectedAnswer === answer}
                                    className="appearance-none w-5 h-5 min-w-[20px] min-h-[20px] border-2 border-white rounded-full checked:bg-figma-black checked:border-[5px] flex-shrink-0"
                                    onChange={e => setSelectedAnswer(e.target.value)}
                                />
                                <span className="font-bold text-[1rem]">{answer}</span>
                            </label>
                        ))}
                    </div>


                    <div className="relative z-10 text-figma-white mb-16">
                        <button
                            className={`block mx-auto text-2xl bg-figma-black rounded-full py-2 px-7 font-bold
                            hover:scale-110 duration-200 ${selectedAnswer === "" ? "opacity-50" : ""}`}
                            disabled={selectedAnswer === ""}
                            onClick={() => {
                                setCurrRoundAnswers([...currRoundAnswers, selectedAnswer]);
                                if (firstQuestion) {
                                    setFirstQuestion(false);
                                    setSelectedAnswer("");
                                }
                                else {
                                    if (AAnswers) {
                                        setAAnswers(false);
                                        setShowSwitchPlayers(true);
                                    }
                                    else {
                                        setShowRoundEnd(true);
                                        setAAnswers(true);
                                    }
                                    setFirstQuestion(true);
                                    setShowQuestion(false);
                                }
                            }}>
                            {"->"} {configData.buttonNext}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function GameLoop() {

    const {
        roundStart,
        showQuestion,
        showswitchPlayers,
        showRoundEnd,
    } = useGameLoop();

    let content = null;
    if (roundStart) content = <NewRound />;
    if (showQuestion) content = <Question />;
    if (showswitchPlayers) content = <SwitchPlayers />
    if (showRoundEnd) content = <RoundEnd />

    return content;
}

export default GameLoop;
