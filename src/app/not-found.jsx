import Button from "@/components/Button/variants/primary"

export default function NotFound(){
    return(
        <div style={({ display: "flex", flexDirection: "column", gap: "32px", justifyContent: "center", alignItems: "center", height: "calc(100vh - 96px)" })}>
            <h1 style={({ fontSize: "48px" })}>404 - Página não encontrada</h1>
            <Button redirect="/">Voltar para a página inicial</Button>
        </div>
    )
}