import React, { useState } from "react";
import researchs from "../../../data/data.js";
import { FaRegFilePdf } from "react-icons/fa";
import { useTheme } from "../../../context/useTheme.js";
import ResearchModal from "../Modal/ResearchModal";
import ReseachPreview from "./ReseachPreview";

function ResearchContainer() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    bgMain: isDark ? "#242424" : "#ecf3f4",
    headerBg: "#094857",
    headerText: "#ffffff",
    boxBg: isDark ? "#242424" : "#ffffff",
    boxBorder: isDark ? "#217c93" : "#094857",
    text: isDark ? "#e0e0e0" : "#333",
    link: isDark ? "#90caf9" : "#094857",
    linkHover: isDark ? "#ff8a80" : "#c62828",
    pdfBg: "#094857",
    pdfBorder: "#094857",
  };

  const handlePreview = (researchId) => {
    setSelectedId(researchId);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full" style={{ backgroundColor: colors.bgMain }}>
      <div
        style={{
          backgroundColor: colors.headerBg,
          color: colors.headerText,
          padding: "0 12px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
          fontSize: "1.25rem",
          fontWeight: "600",
          margin: "4px 0 16px 0",
        }}
      >
        Researches
      </div>

      {researchs.map((section, index) => (
        <div
          key={index}
          style={{
            backgroundColor: colors.boxBg,
            color: colors.text,
            border: `1px solid ${colors.boxBorder}`,
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "12px",
          }}
        >
          <button
            onClick={() =>
              setActiveIndex((prev) => (prev === index ? null : index))
            }
            style={{
              backgroundColor: "transparent",
              border: "none",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "1rem",
              fontWeight: activeIndex === index ? "600" : "500",
              cursor: "pointer",
            }}
          >
            <span>
              {section.headTitle} ({section.content.length})
            </span>
            <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
              {activeIndex === index ? "−" : "+"}
            </span>
          </button>

          <div
            style={{
              maxHeight: activeIndex === index ? "300px" : "0px",
              padding: activeIndex === index ? "10px 0" : "0px",
              overflow: "hidden",
              transition: "max-height 0.3s ease, padding 0.3s ease",
            }}
          >
            {activeIndex === index && (
              <div style={{ maxHeight: "250px", overflowY: "auto" }}>
                {section.content.map((cont, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      window.open(`/researchs/${cont.researchId}`, "_blank")
                    }
                    style={{
                      borderBottom: `1px solid ${colors.pdfBorder}`,
                      padding: "8px 0",
                      fontSize: "0.875rem",
                      color: colors.text,
                      cursor: "pointer",
                    }}
                  >
                    {/* Metin kısmı */}
                    <div>
                      <span>{cont.authors}. </span>
                      <span style={{ fontWeight: "600" }}>{cont.title}. </span>
                      <span style={{ fontStyle: "italic" }}>
                        {cont.journal || cont.bookTitle}.
                      </span>
                      {cont.doi && <span> doi: {cont.doi}. </span>}

                      {(cont.PMID || cont.url || cont.fileLink) && (
                        <a
                          rel="noopener noreferrer"
                          style={{
                            color: colors.link,
                            textDecoration: "underline",
                            marginLeft: "8px",
                            cursor: "pointer",
                          }}
                          onMouseOver={(e) =>
                            (e.target.style.color = colors.linkHover)
                          }
                          onMouseOut={(e) =>
                            (e.target.style.color = colors.link)
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            const isExternal = cont.url?.startsWith("http");
                            const hasFile = cont.fileLink?.length > 0;
                            const hasPMID = cont.PMID?.length > 0;

                            let targetUrl = "";
                            if (isExternal) targetUrl = cont.url;
                            else if (hasPMID)
                              targetUrl = `https://pubmed.ncbi.nlm.nih.gov/${cont.PMID}/`;
                            else if (hasFile) targetUrl = `/${cont.fileLink}`;

                            targetUrl
                              ? window.open(
                                  targetUrl,
                                  "_blank",
                                  "width=800,height=600,noopener,noreferrer"
                                )
                              : alert("Bağlantı bulunamadı.");
                          }}
                        >
                          {cont.PMID
                            ? `PMID: ${cont.PMID}`
                            : cont.url
                            ? " Web Link "
                            : "Link"}
                        </a>
                      )}
                    </div>

                    {/* Butonlar kısmı */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        marginTop: "6px",
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      {cont.fileLink && (
                        <a
                          href={`/${cont.fileLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button
                            style={{
                              padding: "4px 8px",
                              fontSize: "0.75rem",
                              borderRadius: "6px",
                              border: `1px solid ${colors.pdfBorder}`,
                              backgroundColor: colors.pdfBg,
                              color: "#fff",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              cursor: "pointer",
                            }}
                          >
                            PDF <FaRegFilePdf />
                          </button>
                        </a>
                      )}

                      {cont.researchId && (
                        <button
                          onClick={() => handlePreview(cont.researchId)}
                          style={{
                            padding: "4px 8px",
                            fontSize: "0.75rem",
                            borderRadius: "6px",
                            border: `1px solid ${colors.pdfBorder}`,
                            backgroundColor: colors.pdfBg,
                            color: "#fff",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Preview
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      <ResearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedId && <ReseachPreview id={selectedId} />}
      </ResearchModal>
    </div>
  );
}

export default ResearchContainer;
