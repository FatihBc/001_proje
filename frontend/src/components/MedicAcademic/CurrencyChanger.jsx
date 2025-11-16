import React, { useState, useEffect } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { RiResetLeftLine } from "react-icons/ri";
import { useTheme } from "../../context/useTheme";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("TRY");
  const [result, setResult] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const currencies = ["USD", "EUR", "TRY", "GBP", "JPY", "CAD"];

  const exchangeCurrency = async (amount, from, to) => {
    if (!amount || isNaN(amount)) return;
    try {
      const response = await fetch(
        `https://api.currencyapi.com/v3/latest?apikey=fca_live_jDnDq4vrSPC7xazCx5sci4IaQBeBIMeL4dtyVNo1&base_currency=${from}`
      );
      const data = await response.json();
      const rate = data.data[to]?.value;
      if (rate) setResult((amount * rate).toFixed(3));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetFields = () => {
    setAmount("");
    setFromCurrency("USD");
    setToCurrency("TRY");
    setResult("");
  };

  useEffect(() => {
    exchangeCurrency(amount, fromCurrency, toCurrency);
  }, [amount, fromCurrency, toCurrency]);

  // 🎨 Tema bazlı sınıflar
  const cardBg = isDark
    ? "bg-[#242424] border-gray-200! text-white"
    : "bg-[#ecf3f4] border-gray-200 text-black";
  const inputBg = isDark
    ? "bg-[#2a2a2a] text-white border-[1px] border-[#d3d3d3]"
    : "bg-white text-black border border-gray-300";

  const resultBg = isDark
    ? "bg-[#2a2a2a] text-white border-[1px] border-[#d3d3d3]"
    : "bg-gray-50 text-black border border-gray-300";

  const iconColor = isDark
    ? "text-gray-300 hover:text-white"
    : "text-gray-600 hover:text-gray-800";
  const exchangeIcon = isDark ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`w-full rounded-lg border h-full flex flex-col ${cardBg}`}>
      <div className="flex flex-col justify-between h-full p-4 w-full">
        <div className="space-y-6 flex-1 flex flex-col justify-center">
          {/* Miktar */}
          <div className="flex items-center justify-between w-full">
            <span className="w-1/4 text-sm font-medium">Amount:</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              onFocus={(e) => e.target.value === "0" && setAmount("")}
              onBlur={(e) => e.target.value === "" && setAmount("0")}
              className={`w-3/4 p-2 rounded text-center text-sm ${inputBg}`}
            />
          </div>

          {/* Döviz Seçimi */}
          <div className="flex items-center justify-between w-full">
            <span className="w-1/4 flex justify-center mt-2 ">
              <RiResetLeftLine
                onClick={resetFields}
                className={`cursor-pointer text-lg ${iconColor}`}
              />
            </span>
            <div className="w-3/4 flex items-center justify-between space-x-2 my-2">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className={`w-2/5 p-2 rounded text-sm ${inputBg}`}
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>

              <FaExchangeAlt
                className={`flex-shrink-0 text-sm ${exchangeIcon}`}
              />

              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className={`w-2/5 p-2 rounded text-sm ${inputBg}`}
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sonuç */}
          <div className="flex items-center justify-between w-full">
            <span className="w-1/4 text-sm font-medium">Result:</span>
            <input
              type="text"
              value={result > 0 ? `${result} ${toCurrency}` : ""}
              placeholder="0"
              readOnly
              className={`w-3/4 p-2 rounded text-center text-sm ${resultBg} ${inputBg}`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs pt-4 w-full text-gray-500">
          Copyright - Fatih Büyükcam
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
