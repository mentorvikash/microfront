import React from 'react'

function Button({ children, onClick }) {
    return (
        <button
            style={{
                padding: "10px 20px",
                borderRadius: "6px",
                border: "1px solid #444",
                background: "#000",
                color: "#fff"
            }}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button