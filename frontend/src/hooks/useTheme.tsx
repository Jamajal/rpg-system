import { useContext, createContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextProps {
    theme: "light" | "dark",
    toggleTheme: () => void,
}

interface ThemeContextProvider {
    children: ReactNode,
    initialTheme?: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeContextProvider: React.FC<ThemeContextProvider> = ({ children, initialTheme = "light" }: any) => {
    const [theme, setTheme] = useState<"light" | "dark">(initialTheme);

    useEffect(() => {
        const root = window.document.documentElement;

        if(theme === "dark"){
            root.classList.add(theme);
        } else{
            root.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [theme])

    const toggleTheme = () =>{
        setTheme((previewTheme) =>  (previewTheme === "dark" ? "light" : "dark"));
    }
    
    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () : ThemeContextProps => {
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error ("Tema não definido")
    }
    return context
}