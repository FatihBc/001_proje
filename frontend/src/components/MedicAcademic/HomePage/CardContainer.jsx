import React from "react";
import { useNavigate } from "react-router-dom";
import calculatorImg from "../../../images/calculator.png";
import currencyImg from "../../../images/currency.png";
import todoImg from "../../../images/todo_list.png";

function CardContainer({ onOpenModal }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/projects");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 50);
  };

  return (
    <div>
      <section
        id="packages"
        className="h-fit text-center my-1 py-2 rounded-md bg-[#094857] text-white"
      >
        <h2 onClick={handleClick} className="text-center my-1 cursor-pointer">
          Projects
        </h2>
        <div className="p-4 mx-2 mt-2 bg-gray-50 rounded-md text-[#094857]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Kart 1 - Calculator */}
            <div className="flex flex-col h-full">
              <div className="flex flex-col justify-between h-full p-4 bg-white rounded-md shadow">
                <img
                  src={calculatorImg}
                  alt="Calculator"
                  className="mb-4 rounded"
                />
                <div className="align-bottom">
                  <h5 className="text-lg font-semibold mb-2">
                    A Simple Calculator
                  </h5>
                  <p className="text-sm text-[#0c6b80]">Calculator</p>
                </div>
                <button
                  onClick={() => onOpenModal("Calculator")}
                  className="align-bottom bg-[#0c6b80] hover:bg-[#0e7a92] text-white p-2 text-sm font-semibold rounded"
                >
                  Go
                </button>
              </div>
            </div>

            {/* Kart 2 - Currency Changer */}
            <div className="flex flex-col h-full">
              <div className="flex flex-col justify-between h-full p-4 bg-white rounded-md shadow">
                <img
                  src={currencyImg}
                  alt="Currency Changer"
                  className="mb-4 rounded"
                />
                <div className="align-bottom">
                  <h5 className="text-lg font-semibold mb-2">
                    A Simple Currency Changer
                  </h5>
                  <p className="text-sm text-[#0c6b80]">
                    Simple and useful tool
                  </p>
                </div>
                <button
                  onClick={() => onOpenModal("CurrencyChanger")}
                  className="align-bottom bg-[#0c6b80] hover:bg-[#0e7a92] text-white p-2 text-sm font-semibold rounded"
                >
                  Go
                </button>
              </div>
            </div>

            {/* Kart 3 - ToDo List */}
            <div className="flex flex-col h-full">
              <div className="flex flex-col justify-between h-full p-4 bg-white rounded-md shadow">
                <img src={todoImg} alt="ToDo List" className="mb-4 rounded" />
                <div className="align-bottom">
                  <h5 className="text-lg font-semibold mb-2">
                    A Simple ToDo List
                  </h5>
                  <p className="text-sm text-[#0c6b80]">Add todos</p>
                </div>
                <button
                  onClick={() => onOpenModal("ToDo")}
                  className="align-bottom bg-[#0c6b80] hover:bg-[#0e7a92] text-white p-2 text-sm font-semibold rounded"
                >
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CardContainer;
