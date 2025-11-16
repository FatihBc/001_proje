import React from "react";
import historyData from "../../../data/history";

function PersonalHistory() {
  return (
    <div>
      <p className="leading-relaxed text-justify indent-8 p-10">
        {historyData.history}
      </p>
    </div>
  );
}

export default PersonalHistory;
