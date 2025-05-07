import { useGame } from "./GameContext";
import { useGameLoop } from "./GameLoopContext";

function EndScreen() {
    const { } = useGame();
    const { configData, playerData, roundsCount, tresholdData } = useGameLoop();
    const successPercentage = (1000 * Math.round(playerData[0].points + playerData[1].points) / (roundsCount * 2)) / 10;
    const treshold = Math.floor((successPercentage - 1) / 10) * 10;
    const validTreshold = tresholdData
        .filter(obj => obj.thresholdValue > treshold)
        .sort((a, b) => a.thresholdValue - b.thresholdValue)[0] || null;
    console.log(validTreshold);

    return (
        <div className="flex flex-col justify-between h-screen-dvh bg-gradient-to-r from-figma-lavender-40 to-figma-pool-40">
            <h2 className="font-bold mt-12 text-center text-2xl text-figma-black">{configData.textGameover}</h2>
            <h1 className="font-bold text-center text-[5.17rem] text-figma-black">{successPercentage} %</h1>
            <h2 className="font-bold mt-10 text-center text-2xl text-figma-black max-w-96 mx-auto px-2">
                {validTreshold.thresholdTexts[1]}
            </h2>

            <div className="flex mt-12 items-center sm:mx-auto sm:gap-32">
                <div className="mx-auto">
                    <p className="text-center mx-auto mb-3 font-bold text-xl">{playerData[0].name}</p>
                    <div className="mx-auto w-[3rem] py-1 bg-figma-white rounded-full">
                        <p className="text-center font-bold text-[1.6rem] mx-auto">A</p>
                    </div>
                    <p className="text-center mx-auto my-3 font-bold text-xs">{configData.textSuccess}</p>
                    <p className="text-center mx-auto font-bold">{playerData[0].points}/{roundsCount}</p>
                </div>
                <div className="mx-auto">
                    <p className="text-center mx-auto mb-3 font-bold text-xl">{playerData[1].name}</p>
                    <div className="mx-auto w-[3rem] py-1 bg-figma-white rounded-full">
                        <p className="text-center font-bold text-[1.6rem] mx-auto">B</p>
                    </div>
                    <p className="text-center mx-auto my-3 font-bold text-xs">{configData.textSuccess}</p>
                    <p className="text-center mx-auto font-bold">{playerData[1].points}/{roundsCount}</p>
                </div>
            </div>


            <div className="relative z-10 text-figma-white mb-16">
                <button className="block mx-auto text-xl bg-figma-black rounded-full py-2 px-7 font-bold hover:scale-110 duration-200"
                    onClick={() => {
                        const url = new URL(window.location.href);
                        window.location.replace(url.toString());
                    }}>
                    {"->"} {configData.textRestart}
                </button>
            </div>
        </div>
    );

}

export default EndScreen;
