import type { Dispatch, SetStateAction } from "react";

export type HeaderProps = {
    information: boolean;
    setInformation: Dispatch<SetStateAction<boolean>>;
};