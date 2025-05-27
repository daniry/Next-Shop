"use client";

import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
    onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
    return <AddressSuggestions token="ed03f0bb9cfd0989a9dd6855935a21791851acc5" onChange={(data) => onChange?.(data?.value)} />;
};
