import { usePlayGround } from "../../../contexts/PlayGroundContext";

type BoardMenuProps = {
  clickCoords: number[];
  boardDimensions: { width: number | null; height: number | null };
};

export function BoardMenu({ clickCoords, boardDimensions }: BoardMenuProps) {
  const { unGuessedCharacters: characters, handleVerify } = usePlayGround();
  const boardWidth = boardDimensions.width ?? 0;
  const boardHeight = boardDimensions.height ?? 0;
  const normalizedDimension = (boardWidth + boardHeight) / 2;
  const range = Math.floor(normalizedDimension * 0.03);
  return (
    <div
      data-testid="board-menu"
      className=" z-999 transition-all duration-400"
      style={{
        position: "absolute",
        left: `calc(${clickCoords[0] * 100 + "%"} - ${range / 2}px)`,
        top: `calc(${clickCoords[1] * 100 + "%"} - ${range / 2}px)`,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {" "}
      <div
        style={{
          width: range + "px",
        }}
        className={`aspect-square rounded-full border-2 mb-2 border-purple-700`}
      ></div>
      <div className="bg-white shadow-md py-4 px-3 w-40 min-h-50 rounded animate-popUp">
        <p className="text-xs uppercase tracking-widest text-purple-700">
          Who is this ?
        </p>
        <ul className="flex flex-col mt-4 gap-1">
          {characters.map((character) => {
            const lowerCaseName = character.name.toLowerCase();
            return (
              <li data-testid="character-menu-item">
                <button
                  onClick={() => {
                    handleVerify(character.id, clickCoords);
                  }}
                  className="py-1.5 text-[15px] capitalize cursor-pointer px-2 shadow-sm text-start rounded-xl border border-gray-400/20 w-full transition-colors duration-500 hover:bg-purple-400 hover:text-white"
                >
                  {lowerCaseName}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
