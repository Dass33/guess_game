import { useEffect, useRef } from "react";
import { useGame } from "./GameContext";
import { useGameLoop } from "./GameLoopContext";
import { useItemTooltip } from "@mui/x-charts";

function LandingSite() {
    const { setShowLandingSite, setShowInstructions } = useGame();
    const { configData, editionsData, selectedEditions } = useGameLoop();
    if (editionsData === null || configData === null) {
        return (
            <div className="bg-figma-black h-screen">
                <h1 className="text-center pt-36 lg:pt-56 text-white">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between min-h-screen bg-gradient-to-r from-figma-lavender-40 to-figma-pool-40">
            <div className="flex flex-col justify-center gap-4 self-stretch font-bold text-figma-black text-center mt-48">
                <h1 className="text-[3.33rem]">{configData.gameTitle}</h1>
                {selectedEditions && <h2 className="text-3xl">{selectedEditions[0]}</h2>}
            </div>


            <div className="relative z-10 text-figma-white mb-16">
                <h3 className="text-center text-lg font-bold text-figma-black relative z-10 mb-16">{configData.copyright}</h3>
                <button className="block mx-auto text-2xl bg-figma-black rounded-full py-2 px-7 font-bold hover:scale-110 duration-200"
                    onClick={() => {
                        setShowLandingSite(false);
                        setShowInstructions(true);
                    }}>
                    {"->"} {configData.textPlay}
                </button>
            </div>
        </div>
    );
}

function InstructionSite() {
    const { setShowInstructions, setShowPickNames } = useGame();
    const { configData, editionsData } = useGameLoop();

    if (!editionsData || !configData) {
        return (
            <div className="bg-figma-white h-screen">
                <h1 className="text-center pt-36 lg:pt-56 text-white">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between min-h-screen text-figma-black bg-white">
            <div className="flex flex-col justify-center gap-4 self-stretch mt-20">
                <h1 className="text-2xl font-bold text-figma-black text-center ">{configData.textTutorialHead}</h1>
            </div>

            <div className="mx-auto font-bold text-[2.4375rem] flex">
                <div className="w-[4.4rem] py-1 bg-figma-lavender-40 rounded-full">
                    <p className="text-center mx-auto">A</p>
                </div>
                <div className="w-[4.4rem] py-1 bg-figma-pool-40 rounded-full">
                    <p className="text-center mx-auto">B</p>
                </div>
            </div>

            <p className="font-bold text-lg text-center mb-20 w-[19.75rem] mx-auto">
                {configData.textTutorial}
            </p>
            <div className="relative z-10 text-figma-white mb-16">
                <button className="block mx-auto text-2xl bg-figma-black rounded-full py-2 px-7 font-bold hover:scale-110 duration-200"
                    onClick={() => {
                        setShowInstructions(false);
                        setShowPickNames(true);
                    }}>
                    {"->"} {configData.buttonNext}
                </button>
            </div>
        </div>
    );
}

function PickNames() {
    const { setShowPickNames, setshowPickEditions } = useGame();
    const { configData, editionsData, setPlayerData, selectedEditions } = useGameLoop();
    const playerARef = useRef<HTMLInputElement>(null);
    const playerBRef = useRef<HTMLInputElement>(null);
    const prepGame = usePrepGame();

    if (!editionsData || !configData) {
        return (
            <div className="bg-figma-white h-screen">
                <h1 className="text-center pt-36 lg:pt-56 text-white">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between min-h-screen text-figma-black bg-white">
            <div className="flex flex-col justify-center gap-4 self-stretch mt-20">
                <h1 className="text-2xl font-bold text-figma-black text-center ">{configData.pickNames}</h1>
            </div>

            <div className="mx-auto">
                <div className="mx-auto w-[3rem] py-1 bg-figma-lavender-40 rounded-full">
                    <p className="text-center font-bold text-[1.625rem] mx-auto">A</p>
                </div>
                <input
                    ref={playerARef}
                    className="text-center mt-8 border-figma-black w-80 border-2 py-4 rounded-lg text-figma-stone-40 font-bold text-2xl"
                    defaultValue={configData.playerADefault}>
                </input>
            </div>

            <div className="mx-auto">
                <div className="mx-auto w-[3rem] py-1 bg-figma-pool-40 rounded-full">
                    <p className="text-center font-bold text-[1.625rem] mx-auto">B</p>
                </div>
                <input
                    ref={playerBRef}
                    className="text-center mt-8 border-figma-black w-80 border-2 py-4 rounded-lg text-figma-stone-40 font-bold text-2xl"
                    defaultValue={configData.playerBDefault}>
                </input>
            </div>

            <div className="relative z-10 text-figma-white mb-16">
                <button className="block mx-auto text-2xl bg-figma-black rounded-full py-2 px-7 font-bold hover:scale-110 duration-200"
                    onClick={() => {
                        const playerAName = playerARef.current?.value || configData.playerADefault;
                        const playerBName = playerBRef.current?.value || configData.playerBDefault;
                        setPlayerData([{ name: playerAName, points: 0 }, { name: playerBName, points: 0 }])
                        setShowPickNames(false);
                        selectedEditions?.length || 0 > 0 ? prepGame() : setshowPickEditions(true)
                    }}>
                    {"->"} {configData.buttonNext}
                </button>
            </div>
        </div>
    );
}

function PickEditions() {
    const { setshowPickEditions } = useGame();
    const { configData, editionsData, selectedEditions, setSelectedEditions } = useGameLoop();
    const prepGame = usePrepGame();

    if (!editionsData || !configData) {
        return (
            <div className="bg-figma-white h-screen">
                <h1 className="text-center pt-36 lg:pt-56 text-white">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between min-h-screen text-figma-black bg-white">
            <div className="flex flex-col justify-center gap-4 self-stretch mt-20">
                <h1 className="text-2xl font-bold text-figma-black text-center ">{configData.textPickTheme}</h1>
            </div>

            <div className="mx-auto flex flex-wrap gap-5 text-figma-black max-w-72 justify-center mt-20">
                {editionsData
                    .map(item => {
                        return (
                            <button key={item.editionSlug}
                                className={`rounded-lg border-figma-black border-2 transition-transform duration-200
                                        ${selectedEditions.includes(item.editionSlug)
                                        ? "bg-figma-black text-white scale-110"
                                        : "bg-white scale-100"}`}

                                onClick={() => {
                                    (selectedEditions.includes(item.editionSlug))
                                        ? setSelectedEditions(selectedEditions.filter(id => id !== item.editionSlug))
                                        : setSelectedEditions([...selectedEditions, item.editionSlug])
                                }}>
                                <div className="p-3 font-bold text-lg">
                                    {item.editionTitle}
                                </div>
                            </button>
                        );
                    })}
            </div>

            <button
                className="font-bold text-lg text-center lg:mb-20 mb-4 w-[19.75rem] mx-auto lg:mt-32 mt-20"
                onClick={() => {
                    const allSelected = selectedEditions.length === editionsData.length;
                    setSelectedEditions(allSelected ? [] : editionsData.map(item => item.editionSlug));
                }}>
                {selectedEditions.length === editionsData.length
                    ? configData.textClearAll
                    : configData.textPickAll}
            </button>

            <div className="relative z-10 text-figma-white mb-16">
                <button className="block mx-auto text-2xl bg-figma-black rounded-full py-2 px-7 font-bold hover:scale-110 duration-200"
                    onClick={() => {
                        setshowPickEditions(false);
                        prepGame();
                    }}>
                    {"->"} {configData.buttonNext}
                </button>
            </div>
        </div>
    );;
}

function usePrepGame() {
    const { setShowWelcomeSite } = useGame();
    const { questionsData, selectedEditions, setSelectedQuestions,
        configData, setRoundsCount } = useGameLoop();

    return () => {
        const filteredQuestions = selectedEditions.length === 0
            ? questionsData
            : questionsData.filter(item =>
                selectedEditions.includes(item.categories[0]))

        const shuffledQuestions = filteredQuestions.sort(() => Math.random() - 0.5);
        setSelectedQuestions(shuffledQuestions);
        configData.roundsAmount > shuffledQuestions.length
            ? setRoundsCount(shuffledQuestions.length)
            : setRoundsCount(configData.roundsAmount);
        setShowWelcomeSite(false);
    }
}

function WelcomeSite() {
    const { showLandingSite, showInstructions,
        showPickEditions, showPickNames } = useGame();
    const { editionsData, setSelectedEditions, } = useGameLoop();
    const urlParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        const urlGameMode = urlParams.get('edition');

        if (editionsData && urlGameMode) {
            const matchedEdition = editionsData.find(
                edition => edition.editionSlug === urlGameMode
            );
            if (matchedEdition) {
                setSelectedEditions(matchedEdition.editionTitle);
            }
            // else {
            //     const filtered_questions = questionsData.filter(item => item.)
            // }
        }
    }, [editionsData]);

    return (
        <>
            {showLandingSite && <LandingSite />}
            {showInstructions && <InstructionSite />}
            {showPickNames && <PickNames />}
            {showPickEditions && <PickEditions />}
        </>
    );
}

export default WelcomeSite;
