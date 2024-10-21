import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen: false
}

const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        setOpen: (state, action)=>{
            state.isOpen = action.payload
        }
    }
})

export const {setOpen} = sideBarSlice.actions
const sideBarReducer = sideBarSlice.reducer
export default sideBarReducer