const isClient = typeof window !== "undefined";
import Cookies from "js-cookie";

const RoleTokenStorage = ()=>{
    let inMemoryToken: string | null = null;

    const getToken = ()=>{
        if (!isClient) {
            return;
        }

        if(Cookies.get("roleToken") &&inMemoryToken === null){
            inMemoryToken = Cookies.get("roleToken") ?? "";
        }

        return inMemoryToken;
    }

    const setToken = (token: string) => {
        isClient && Cookies.set("roleToken", token, { expires: 1 });
        inMemoryToken = token;
    };

    const deleteToken = () => {
        inMemoryToken = null;
        isClient && Cookies.remove("roleToken");
    };

    return {
        getToken,
        setToken,
        deleteToken,
    };
}

export default RoleTokenStorage();