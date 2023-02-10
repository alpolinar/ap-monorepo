import axios from "axios";
import { setupInterceptorsTo } from "@/services/interceptors";

const api = setupInterceptorsTo(
    axios.create({
        baseURL: process.env.NEXT_PUBLIC_NEST_API,
        headers: {
            "Content-Type": "application/json",
        },
    })
);

export default api;
