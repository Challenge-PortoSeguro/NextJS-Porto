import "./styles.css";

export default function Card({ children }) {
    return (
        <div className="container-card">
            {children}
        </div>
    )
}
