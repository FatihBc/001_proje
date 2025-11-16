import React, { useState } from 'react';
import ResearchModal from './ResearchModal';
import ReseachPreview from './ReseachPreview';

function ArticleViewer() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const openModal = (researchId) => {
        setSelectedId(researchId);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedId(null);
    };

    return (
        <div className="flex flex-col items-center justify-center py-8">
            <button
                onClick={() => openModal('01001')} // data.js içindeki researchId
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
                Show Article
            </button>

            <ResearchModal isOpen={isOpen} onClose={closeModal}>
                {selectedId ? (
                    <ReseachPreview id={selectedId} />
                ) : (
                    <div className="text-center text-sm text-red-500">Makale ID'si bulunamadı.</div>
                )}
            </ResearchModal>
        </div>
    );
}

export default ArticleViewer;
