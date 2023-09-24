import create from "zustand"
import {persist} from "zustand/middleware"


let appStore = (set) => ({
   dopen: true,
   updateOpen:(dopen) => set((state) => ({dopen:dopen})),
});

appStore = persist (appStore, {name: "my_tcc"});
export const useAppStore = create(appStore)