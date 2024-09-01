import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Recibe registro de usuarios y envia consulta a server
export const signup = createAsyncThunk('auth/signup', async({email, password}, thunkAPI) => {
    try {
        const res = await fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        });

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

// Crea slice de Redux para manejo de autenticacion
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
            // Exitoso
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload.email
                state.isLoggedIn = true
                state.loading = false
                state.error = null
            })
            // Pendiente
            .addCase(signup.pending, (state, action) => {
                state.loading = true
            })
            // Rechazado
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.isLoggedIn = false
                state.error = action.payload
            })
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;