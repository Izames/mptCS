import { create } from 'zustand'

const AppStore = create((set) => ({
    Auth: false,
   
    SetAuth: (auth) => set({Auth: auth}),
}));

export default AppStore