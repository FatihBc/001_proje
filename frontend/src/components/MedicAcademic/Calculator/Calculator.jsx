import React, { useReducer } from "react";
import TotalDisplay from "./TotalDisplay.jsx";
import CalcButton from "./CalcButton.jsx";
import reducer, { initialState } from "./calculaterReducers.jsx";
import {
  applyNumber,
  changeOperation,
  handleClear,
  evaluate,
  memoryAdd,
  memoryRecall,
  memoryClear,
} from "./calculaterActions.jsx";
import { useTheme } from "../../../context/useTheme.js";

function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { theme } = useTheme();

  // Dinamik class'lar
  const containerClass = `p-2 rounded-lg shadow-md border h-full w-full ${
    theme === "dark"
      ? "bg-[#1e1e1e] border-gray-700 text-white"
      : "bg-[#ecf3f4] border-gray-300 text-black"
  }`;

  const displayClass = `flex justify-between text-xs font-medium px-3 py-2 rounded-lg border-2 mb-1 ${
    theme === "dark"
      ? "bg-[#094857] border-[#094857] text-white"
      : "bg-[#0a5c6e] border-[#0a5c6e] text-white"
  }`;

  const buttonBase = "text-sm text-white";
  const btnDark = "bg-[#094857] hover:bg-[#0a5c6e]";
  const btnOp = "bg-[#0a5c6e] hover:bg-[#0c6b80]";
  const btnMem = "bg-[#0c6b80] hover:bg-[#0e7a92]";
  const btnClear = "bg-[#e74c3c] hover:bg-[#c0392b]";

  // Sayı tuşlarını satır bazlı gruplandır
  const numberRows = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  return (
    <div className={containerClass}>
      <div className="mx-auto">
        <div className="flex justify-center">
          <form name="Cal" className="w-full max-w-xs">
            <TotalDisplay value={state.total} />

            {/* Operation ve Memory Display */}
            <div className={displayClass}>
              <span id="operation">
                <b>Operation:</b> {state.operation}
              </span>
              <span id="memory">
                <b>Memory:</b> {state.memory}
              </span>
            </div>

            {/* Memory Buttons */}
            <div className="flex gap-1 mb-1">
              <CalcButton
                value="M+"
                onClick={() => dispatch(memoryAdd())}
                className={`${btnMem} ${buttonBase}`}
              />
              <CalcButton
                value="MR"
                onClick={() => dispatch(memoryRecall())}
                className={`${btnMem} ${buttonBase}`}
              />
              <CalcButton
                value="MC"
                onClick={() => dispatch(memoryClear())}
                className={`${btnMem} ${buttonBase}`}
              />
            </div>

            {/* Number Rows */}
            {numberRows.map((row, i) => (
              <div key={i} className="flex gap-1 mb-1">
                {row.map((n) => (
                  <CalcButton
                    key={n}
                    value={n}
                    onClick={() => dispatch(applyNumber(n))}
                    className={`${btnDark} ${buttonBase}`}
                  />
                ))}
              </div>
            ))}

            {/* Operations Row 1 */}
            <div className="flex gap-1 mb-1">
              <CalcButton
                value="+"
                onClick={() => dispatch(changeOperation("+"))}
                className={`${btnOp} ${buttonBase}`}
              />
              <CalcButton
                value={0}
                onClick={() => dispatch(applyNumber(0))}
                className={`${btnDark} ${buttonBase}`}
              />
              <CalcButton
                value="-"
                onClick={() => dispatch(changeOperation("-"))}
                className={`${btnOp} ${buttonBase}`}
              />
            </div>

            {/* Operations Row 2 */}
            <div className="flex gap-1 mb-1">
              <CalcButton
                value="*"
                onClick={() => dispatch(changeOperation("*"))}
                className={`${btnOp} ${buttonBase}`}
              />
              <CalcButton
                value="CE"
                onClick={() => dispatch(handleClear())}
                className={`${btnClear} ${buttonBase}`}
              />
              <CalcButton
                value="/"
                onClick={() => dispatch(changeOperation("/"))}
                className={`${btnOp} ${buttonBase}`}
              />
            </div>

            {/* Equals Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => dispatch(evaluate())}
                className={`w-full h-8 flex items-center justify-center font-bold rounded-lg transition-colors duration-200 ${
                  theme === "dark"
                    ? "bg-[#0c6b80] hover:bg-[#0e7a92] text-white"
                    : "bg-[#0c6b80] hover:bg-[#0e7a92] text-white"
                }`}
              >
                =
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
