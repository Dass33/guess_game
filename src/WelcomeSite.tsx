import { useEffect, useRef } from "react";
import { useGame } from "./GameContext";
import { useGameLoop } from "./GameLoopContext";

function LandingSite() {
    const { setShowLandingSite, setShowInstructions } = useGame();
    const { configData, editionsData, selectedCategories } = useGameLoop();
    if (editionsData === null || configData === null) {
        return (
            <div className="bg-figma-black h-screen-dvh">
                <h1 className="text-center pt-36 lg:pt-56 text-white">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between h-screen-dvh safe-padding bg-gradient-to-r from-figma-lavender-40 to-figma-pool-40">
            <div className="flex flex-col justify-center gap-4 self-stretch font-bold text-figma-black text-center mt-48">
                <h1 className="text-[3.33rem]">{configData.gameTitle}</h1>
                {selectedCategories && <h2 className="text-3xl">{selectedCategories[0]}</h2>}
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
            <div className="bg-figma-white h-screen-dvh">
                <h1 className="text-center pt-36 lg:pt-56 text-white">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between h-screen-dvh text-figma-black bg-white">
            <div className="flex flex-col justify-center gap-4 self-stretch mt-20">
                <h1 className="text-2xl font-bold text-figma-black text-center ">{configData.textTutorialHead}</h1>
            </div>

            <div className="mx-auto font-bold text-[2.4375rem] flex my-4">
                <div className="w-[4.4rem] py-1 bg-figma-lavender-40 rounded-full">
                    <p className="text-center mx-auto">A</p>
                </div>
                <div className="w-[4.4rem] py-1 bg-figma-pool-40 rounded-full">
                    <p className="text-center mx-auto">B</p>
                </div>
            </div>

            <p className="font-bold text-lg text-center sm:mb-8 mb-20 w-[19.75rem] mx-auto">
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
    const { configData, editionsData, setPlayerData, selectedCategories } = useGameLoop();
    const playerARef = useRef<HTMLInputElement>(null);
    const playerBRef = useRef<HTMLInputElement>(null);
    const prepGame = usePrepGame();

    if (!editionsData || !configData) {
        return (
            <div className="bg-figma-white h-screen-dvh">
                <h1 className="text-center pt-36 lg:pt-56 text-white">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between h-screen-dvh text-figma-black bg-white">
            <div className="flex flex-col justify-center gap-4 self-stretch mt-20">
                <h1 className="text-2xl font-bold text-figma-black text-center ">{configData.pickNames}</h1>
            </div>

            <div className="mx-auto">
                <div className="mx-auto w-[3rem] py-1 bg-figma-lavender-40 rounded-full">
                    <p className="text-center font-bold text-[1.625rem] mx-auto">A</p>
                </div>
                <input
                    ref={playerARef}
                    className={`text-center mt-8 border-figma-black w-80 border-2 py-4 rounded-lg
                            ${playerBRef.current?.value ? "text-figma-stone-40" : "text-figma-black"} font-bold text-2xl`}
                    placeholder={configData.playerADefault}>
                </input>
            </div>

            <div className="mx-auto">
                <div className="mx-auto w-[3rem] py-1 bg-figma-pool-40 rounded-full">
                    <p className="text-center font-bold text-[1.625rem] mx-auto">B</p>
                </div>
                <input
                    ref={playerBRef}
                    className={`text-center mt-8 border-figma-black w-80 border-2 py-4 rounded-lg
                            ${playerBRef.current?.value ? "text-figma-stone-40" : "text-figma-black"} font-bold text-2xl`}
                    placeholder={configData.playerBDefault}>
                </input>
            </div>

            <div className="relative z-10 text-figma-white mb-16">
                <button className="block mx-auto text-2xl bg-figma-black rounded-full py-2 px-7 font-bold hover:scale-110 duration-200"
                    onClick={() => {
                        const playerAName = playerARef.current?.value || configData.playerADefault;
                        const playerBName = playerBRef.current?.value || configData.playerBDefault;
                        setPlayerData([{ name: playerAName, points: 0 }, { name: playerBName, points: 0 }])
                        setShowPickNames(false);
                        selectedCategories?.length || 0 > 0 ? prepGame() : setshowPickEditions(true)
                    }}>
                    {"->"} {configData.buttonNext}
                </button>
            </div>
        </div>
    );
}

function PickEditions() {
    const { setshowPickEditions } = useGame();
    const { configData, editionsData, selectedCategories, setSelectedCategories, questionsData } = useGameLoop();
    const prepGame = usePrepGame();
    const validCategories = configData.categories.filter(item => {
        if (item.shownInStepper !== 'true') return false;
        const questionsInCategory = questionsData.filter(question =>
            question.categories && question.categories[0] === item.categorySlug
        );
        return questionsInCategory.length >= 5;
    });

    if (!editionsData || !configData) {
        return (
            <div className="bg-figma-white h-screen-dvh">
                <h1 className="text-center pt-36 lg:pt-56 text-white">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between h-screen-dvh text-figma-black bg-white">
            <div className="flex flex-col justify-center gap-4 self-stretch mt-20">
                <h1 className="text-2xl font-bold text-figma-black text-center ">{configData.textPickTheme}</h1>
            </div>

            <div className="mx-auto flex flex-wrap gap-5 text-figma-black max-w-72 sm:max-w-96 justify-center sm:mt-12 lg:mt-20 mt-20">
                {validCategories.map(item => {
                    return (
                        <button key={item.categorySlug}
                            className={`rounded-lg border-figma-black border-2 transition-transform duration-200
                                        ${selectedCategories.includes(item.categorySlug)
                                    ? "bg-figma-black text-white scale-110"
                                    : "bg-white scale-100"}`}

                            onClick={() => {
                                (selectedCategories.includes(item.categorySlug))
                                    ? setSelectedCategories(selectedCategories.filter(id => id !== item.categorySlug))
                                    : setSelectedCategories([...selectedCategories, item.categorySlug])
                            }}>
                            <div className="p-3 font-bold text-lg">
                                {item.category}
                            </div>
                        </button>
                    );
                })}
            </div>

            <button
                className="font-bold text-lg text-center xl:mb-[6.5rem] mb-4 w-[19.75rem] mx-auto lg:mt-32 mt-20 sm:mt-10"
                onClick={() => {
                    const allSelected = selectedCategories.length === configData.categories.length;
                    setSelectedCategories(allSelected ? [] : configData.categories.map(item => item.categorySlug));
                }}>
                {selectedCategories.length === validCategories.length
                    ? configData.textClearAll
                    : configData.textPickAll}
            </button>

            <div className="relative z-10 text-figma-white mb-20">
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
    const { questionsData, selectedCategories, setSelectedQuestions,
        configData, setRoundsCount } = useGameLoop();

    return () => {
        const filteredQuestions = selectedCategories.length === 0
            ? questionsData
            : questionsData.filter(item =>
                selectedCategories.includes(item.categories[0]))

        const shuffledQuestions = filteredQuestions
            .sort(() => Math.random() - 0.5)
            .map(item => ({
                ...item, answers: item.answers.sort(() => Math.random() - 0.5)
            }));
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
    const { editionsData, setSelectedCategories, } = useGameLoop();
    const urlParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        const urlGameMode = urlParams.get('edition');

        if (editionsData && urlGameMode) {
            const matchedEdition = editionsData.find(
                edition => edition.editionSlug === urlGameMode
            );
            if (matchedEdition) {
                setSelectedCategories(matchedEdition.editionCategories);
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
