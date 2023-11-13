import "./loadingStyle.css";

export default function Loading() {
    return(
        <div style={({ display: "flex", flexDirection: "column", gap: "32px", justifyContent: "center", alignItems: "center", height: "calc(100vh - 96px)" })}>
            <h1 style={{ fontSize: "48px" }}>Carregando...</h1>
            <div className="spinner"></div>
        </div>
    )
}