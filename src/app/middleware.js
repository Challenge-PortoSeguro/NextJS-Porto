import { NextResponse } from "next/server";

const allowedOrigins = process.env.NODE_ENV === 'production' && ['http://localhost:8081/api/'];

export function middleware(req, res) {

    const origin = req.headers.get("origin");
    console.log("origin", origin)
    
    if(origin && !allowedOrigins.includes(origin)) {
        return new Response("Not allowed", { 
            status: 400, 
            statusText: "Bad Request", 
            headers: { "Content-Type": "text/plain" } 
        });
    }

    console.log("middleware")

    console.log(req.url)
    console.log(req.method)

    

    return NextResponse.next();
}