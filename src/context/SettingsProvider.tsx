import React, { createContext, useState } from "react";

interface SettingsT {
    model: string;
    len: string;
}

interface MyContextProps {
    settingsData: SettingsT[] | null;
    setSettingsData: (object: SettingsT[] | null) => void;
}

export const SettingsContext = createContext<MyContextProps>({
    settingsData: null,
    setSettingsData: () => { },
});

export const SettingsProvider = (props: any) => {
    const [settingsData, setSettingsData] = useState<SettingsT[] | null>(null);

    return (
        <SettingsContext.Provider
            children={props.children}
            value={{ settingsData, setSettingsData }}
        />
    );
};