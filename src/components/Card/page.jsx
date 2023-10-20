import Image from "next/image";

export default function Card({ children }) {
    return (
        <div className="flex flex-col gap-3 items-center border border-slate-300 rounded-xl p-4">
            {children}
        </div>
    )
}
