import React from "react";

const DeleteCard = ({ title, desc, callback, cancelCallback }) => {
  return (
    <div className="q_delete_card_overlay" onClick={() => cancelCallback()}>
      <div
        className="q_delete_card q-box-shawdow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="q_delete_header">
          <div className="q_delete_image">
            <svg
              aria-hidden="true"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                stroke-linejoin="round"
                stroke-linecap="round"
              ></path>
            </svg>
          </div>
          <div className="q_delete_content">
            <span className="q_delete_title">{title || "Remove account"}</span>
            <p className="message">
              {desc ||
                "Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone."}
            </p>
          </div>
          <div className="q_delete_actions">
            <button
              className="q_delete_desactivate"
              type="button"
              onClick={() => callback()}
            >
              Remove
            </button>
            <button
              className="q_delete_cancel"
              type="button"
              onClick={() => cancelCallback()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCard;
