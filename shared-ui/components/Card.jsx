import React from 'react'

function Card({ children }) {
    return (
        <div
            style={{
                padding: 20,
                border: "1px solid #ccc",
                borderRadius: 8,
                marginBlock: 20,
            }}
        >
            {children}
        </div>
    )
}

export default Card