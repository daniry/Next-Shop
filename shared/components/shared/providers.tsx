"use client";

import { Toaster } from "react-hot-toast";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            {children}
            <Toaster />
        </>
    );
};
