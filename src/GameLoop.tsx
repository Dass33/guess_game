import { useState } from "react";
import { useGame } from "./GameContext";
import { useGameLoop } from "./GameLoopContext";


function NewRound() {
    const { round } = useGame();
    const { roundsCount, configData,
        playerData, setRoundStart,
        setShowQuestion,
    } = useGameLoop();

    return (
        <div className="flex flex-col justify-between min-h-screen text-figma-black bg-figma-lavender-40">
            <div className="lg:mt-40 mt-28">
                <h1 className="text-[5.16rem] text-center font-bold text-figma-black relative z-10">{round}/{roundsCount}</h1>
                <div className="mx-auto w-[5.5rem] py-1 bg-figma-white rounded-full mt-12">
                    <p className="text-center font-bold text-[3.25rem] mx-auto">A</p>
                </div>
                <p className="text-center mt-16 text-figma-black font-bold text-2xl">
                    {configData.nowPlay} {playerData[0].name}
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
    );
}

function RoundEnd() {
    const { round } = useGame();
    const { roundsCount, configData,
        playerData, setRoundStart } = useGameLoop();

    return (
        <div className="flex flex-col justify-between min-h-screen text-figma-black bg-figma-lavender-40">
            <div className="lg:mt-40 mt-28">
                <h1 className="text-[5.16rem] text-center font-bold text-figma-black relative z-10">{round}/{roundsCount}</h1>
                <div className="mx-auto w-[5.5rem] py-1 bg-figma-white rounded-full mt-12">
                    <p className="text-center font-bold text-[3.25rem] mx-auto">A</p>
                </div>
                <p className="text-center mt-16 text-figma-black font-bold text-2xl">
                    {configData.nowPlay} {playerData[0].name}
                </p>
            </div>


            <div className="relative z-10 text-figma-white mb-16">
                <button className="block mx-auto text-2xl bg-figma-black rounded-full py-2 px-7 font-bold hover:scale-110 duration-200"
                    onClick={() => { setRoundStart(false); }}>
                    {"->"} {configData.buttonNextRound}
                </button>
            </div>
        </div>
    );
}

function SwitchPlayers() {
    const { } = useGame();
    const { configData,
        playerData, setRoundStart } = useGameLoop();

    return (
        <div className="flex flex-col justify-between min-h-screen text-figma-black bg-figma-lavender-40">
            <div className="lg:mt-40 mt-28">
                <h1 className="text-[5.16rem] text-center font-bold text-figma-black relative z-10">HELLO</h1>
                <div className="mx-auto w-[5.5rem] py-1 bg-figma-white rounded-full mt-12">
                    <p className="text-center font-bold text-[3.25rem] mx-auto">A</p>
                </div>
                <p className="text-center mt-16 text-figma-black font-bold text-2xl">
                    {configData.nowPlay} {playerData[0].name}
                </p>
            </div>


            <div className="relative z-10 text-figma-white mb-16">
                <button className="block mx-auto text-2xl bg-figma-black rounded-full py-2 px-7 font-bold hover:scale-110 duration-200"
                    onClick={() => { setRoundStart(false); }}>
                    {"->"} {configData.buttonNext}
                </button>
            </div>
        </div>
    );
}

function Question() {
    const { round } = useGame();
    const { roundsCount, configData,
        selectedQuestions, setShowRoundEnd,
        AAnswers, BAnswers,
        setAAnswers,
        firstQuestion,
        setFirstQuestion,
        setShowQuestion,
        setShowSwitchPlayers,
    } = useGameLoop();
    const bgColor = (AAnswers && firstQuestion) || (BAnswers && !firstQuestion)
        ? "bg-figma-lavender-40"
        : "bg-figma-pool-40";

    return (
        <div className={`flex flex-col justify-between min-h-screen text-figma-black ${bgColor}`}>
            <div className="lg:mt-40 mt-28">
                <h1 className="text-[5.16rem] text-center font-bold text-figma-black relative z-10">{round}/{roundsCount}</h1>
                <div className="mx-auto w-[5.5rem] py-1 bg-figma-white rounded-full mt-12">
                    <p className="text-center font-bold text-[3.25rem] mx-auto">A</p>
                </div>
                <p className="text-center mt-16 text-figma-black font-bold text-2xl">
                    {selectedQuestions[round].question}
                </p>
            </div>


            <div className="relative z-10 text-figma-white mb-16">
                <button className="block mx-auto text-2xl bg-figma-black rounded-full py-2 px-7 font-bold hover:scale-110 duration-200"
                    onClick={() => {
                        if (firstQuestion) setFirstQuestion(false);
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
    );
}

function GameLoop() {

    const { round } = useGame();
    const {
        roundStart,
        roundsCount,
        showQuestion,
        showswitchPlayers,
        showRoundEnd,
    } = useGameLoop();


    let content = null;
    if (roundStart && round <= roundsCount) content = <NewRound />;
    if (showQuestion) content = <Question />;
    if (showswitchPlayers) content = <SwitchPlayers />
    if (showRoundEnd) content = <RoundEnd />

    return content;
}

export default GameLoop;
