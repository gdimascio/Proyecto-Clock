import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signup = createAsyncThunk('auth/signup', async({email, password}, thunkAPI) => {
    try {
        const res = await fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        });

        // const data = await res.json();
        return await res.json();
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.message)
    }
})

// Inicializacion de autenticacion
const initialState = {
    user: '',
    isLoggedIn: false,
    loading: false,
    error: null
}

// Slice de Redux para manejo de autenticacion
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Reducer para cerrar sesión
        logout: (state, action) => {
            state.user = ''
            state.isLoggedIn = false
            state.loading = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload.email
                state.isLoggedIn = true
                state.loading = false
                state.error = null
            })
            .addCase(signup.pending, (state, action) => {
                state.loading = true
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.isLoggedIn = false
                state.error = action.payload
            })
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;