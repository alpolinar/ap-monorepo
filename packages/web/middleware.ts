import { NextResponse, NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
    console.log("middleware");
    const token = req.cookies.get("token");
    const url = req.url;

    if (token && url.includes("/sign-in"))
        return NextResponse.redirect("http://localhost:3000");
    if (token && url.includes("/sign-up"))
        return NextResponse.redirect("http://localhost:3000");
    if (url.includes("/product"))
        return NextResponse.redirect("http://localhost:3000/products");
    if (!token && ["/account", "orders"].some((s) => url.includes(s)))
        return NextResponse.redirect("http://localhost:3000/sign-in");
}

export const config = {
    matcher: ["/", "/sign-in", "/sign-up", "/product", "/account", "/orders"],
};
