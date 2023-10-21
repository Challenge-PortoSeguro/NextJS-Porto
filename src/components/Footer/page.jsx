import "./styles.css";

export default function Footer(){
    const getYear = () => {
        const date = new Date();
        return date.getFullYear();
    }

    return(
        <footer>
            <p>Porto Assistant © {getYear()}</p>
        </footer>
    )
}