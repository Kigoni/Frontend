import React from 'react';

interface PopupProps {
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-xl p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Welcome to African Research Connect!
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
          {message}
        </p>

        {/* Action Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
