import { createContext, useContext, useState } from 'react';

type ItemTypes = 'Авто' | 'Услуги' | 'Недвижимость';

const TypeContext = createContext<ItemTypes | undefined>(undefined);
const SetTypeContext = createContext<React.Dispatch<React.SetStateAction<ItemTypes | undefined>>>(() => {});

const sessionForm = JSON.parse(window.sessionStorage.getItem('item-form') ?? '{}').type;

export const TypeProvider = ({ children }: { children: React.ReactNode }) => {
    const [type, setType] = useState<ItemTypes | undefined>(sessionForm ? sessionForm : undefined);
    return (
        <SetTypeContext value={setType}>
            <TypeContext value={type}>{children}</TypeContext>
        </SetTypeContext>
    );
};

export const useTypeContext = () => useContext(TypeContext);
export const useSetTypeContext = () => useContext(SetTypeContext);
