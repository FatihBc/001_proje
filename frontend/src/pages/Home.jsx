import React, { useState } from "react";
import { useTheme } from "../context/useTheme.js";
import CardContainer from "../components/MedicAcademic/HomePage/CardContainer";
import Modal from "../components/MedicAcademic/Modal/Modal";
import Calculator from "../components/MedicAcademic/Calculator/Calculator";
import CurrencyChanger from "../components/MedicAcademic/CurrencyChanger";
import ToDo from "../components/MedicAcademic/ToDo/ToDo";
import DigitalClock from "../components/MedicAcademic/DigitalClock/DigitalClock.jsx";
// import Slider from '../components/MedicAcademic/HomePage/Slider.jsx'; // örnekte olduğu gibi yorum satırında

function Home() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const pageClass = `min-h-screen md:px-8 lg:px-16 ${
    isDark ? "bg-[#242424] text-white" : "bg-[#ecf3f4] text-black"
  }`;

  const openModal = (componentName) => {
    switch (componentName) {
      case "Calculator":
        setActiveComponent(<Calculator />);
        setModalTitle("A Simple Calculator");
        break;
      case "CurrencyChanger":
        setActiveComponent(<CurrencyChanger />);
        setModalTitle("Currency Changer");
        break;
      case "ToDo":
        setActiveComponent(<ToDo />);
        setModalTitle("ToDo List");
        break;
      default:
        setActiveComponent(null);
        setModalTitle("");
    }
  };

  const closeModal = () => {
    setActiveComponent(null);
    setModalTitle("");
  };

  return (
    <div className={pageClass}>
      <div className="relative z-10 my-3!">
        <DigitalClock />
      </div>
      {/* <div className="mt-1 rounded-lg overflow-hidden">
                <Slider />
            </div> */}
      <div className="mt-8">
        <CardContainer onOpenModal={openModal} />
      </div>

      <Modal isOpen={!!activeComponent} onClose={closeModal} title={modalTitle}>
        {activeComponent}
      </Modal>
    </div>
  );
}

export default Home;
