import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
    const [isNavVisible, setIsNavVisible] = useState(true);

    return (
        <NavigationContext.Provider value={{ isNavVisible, setIsNavVisible }}>
            {children}
        </NavigationContext.Provider>
    );
}

export const useNavigation = () => useContext(NavigationContext);