import React from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { useTheme } from "../../../context/useTheme";
import researchs from "../../../data/data";

function ReseachPreview({ id }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    pdfBg: "#094857",
    pdfBorder: "#094857",
    link: isDark ? "#90caf9" : "#0077cc",
    linkHover: isDark ? "#ff8a80" : "#c62828",
    text: isDark ? "#e0e0e0" : "#333",
  };

  if (!id) return null;

  const allItems = researchs.flatMap((section) => section.content);
  const item = allItems.find((i) => String(i.researchId) === String(id));

  if (!item) {
    return (
      <div style={{ color: colors.text, padding: "1rem", textAlign: "center" }}>
        Makale bulunamadı.
      </div>
    );
  }

  const filePath = item.fileLink?.replace(/^(\.\.\/)?public\//, "");

  const renderAbstract = (abstract) => {
    if (typeof abstract === "string") {
      return (
        <p
          style={{
            whiteSpace: "pre-line",
            marginTop: "1rem",
            textAlign: "justify",
            color: colors.text,
          }}
        >
          {abstract}
        </p>
      );
    }

    if (typeof abstract === "object") {
      return (
        <div
          style={{
            marginTop: "1rem",
            textAlign: "justify",
            color: colors.text,
          }}
        >
          {Object.entries(abstract).map(([key, value], index) => {
            if (key.startsWith("title") && value) {
              const textKey = `text${key.slice(5)}`;
              return abstract[textKey] ? (
                <div className="mb-2" key={index}>
                  <strong>{value}:</strong> {abstract[textKey]}
                  <br />
                </div>
              ) : null;
            }
            return null;
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ padding: "1rem", color: colors.text }}>
      <h3 style={{ marginBottom: "0.5rem" }}>{item.title}</h3>
      <p>
        <strong>Authors:</strong> {item.authors}
      </p>
      <p>
        <strong>Journal:</strong> {item.journal}
      </p>
      {item.doi && (
        <p>
          <strong>DOI:</strong> {item.doi}
        </p>
      )}

      {item.abstract && (
        <div>
          <h4>Abstract</h4>
          {renderAbstract(item.abstract)}
        </div>
      )}

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {item.PMID && (
          <a
            href={`https://pubmed.ncbi.nlm.nih.gov/${item.PMID}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: colors.link,
              textDecoration: "underline",
              transition: "color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.color = colors.linkHover)}
            onMouseOut={(e) => (e.target.style.color = colors.link)}
          >
            Show in PUBMED
          </a>
        )}

        {filePath && (
          <a href={`/${filePath}`} target="_blank" rel="noopener noreferrer">
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
      </div>
    </div>
  );
}

export default ReseachPreview;
