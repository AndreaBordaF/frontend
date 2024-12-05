import { AuthResponse } from "./types/user";

export const microsoftLogin = async () => {
    try{
        const popup = window.open(
            "http://localhost/api/auth/microsoft",
            "Iniciar Sesión con Microsoft",
            "toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=620, height=700`"
        );

        return new Promise((resolve, reject) => {
            window.addEventListener("message", async (event) => {
                if (event.origin !== "http://localhost") {
                    return;
                }

                if (!event.data || event.data.error) {
                    return;
                }

                if (event.data.code === "US_DONT_EXISTS") {
                    popup?.close();
                    resolve(undefined);
                    return;
                }

                sessionStorage.setItem("user", JSON.stringify(event.data));
                popup?.close();
                resolve(event.data);
            }, {once: true});
        });    


    } catch (error) {
        console.error(error);
    }
};