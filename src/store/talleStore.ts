import { create } from "zustand";
import { Talle } from "../types/IProduct";

type TalleState = {
    talles: Talle[];
    setTalles: (talles: Talle[]) => void;
};

export const useTalleStore = create<TalleState>((set) => ({
    talles: [],
    setTalles: (talles) => set({ talles }),
}));
