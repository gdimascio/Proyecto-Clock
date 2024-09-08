import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Recibe registro de usuarios y envia consulta a server para SIGNUP
export const signup = createAsyncThunk('auth/signup', async({email, password}, thunkAPI) => {
    try {
        const res = await fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        });
        const data = await res.json();

        // Si el servidor devuelve un error 'EXISTENTE', rechazar la promesa
        if (res.status === 400 && data.error === 'EXISTENTE') {
            return thunkAPI.rejectWithValue('Ya existe una cuenta con ese usuario');
        }

        return data;
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.message)
    }
})

// Recibe registro de usuarios y envia consulta a server para SIGNIN
export const signin = createAsyncThunk('auth/signin', async({email, password}, thunkAPI) => {
    try {
        const res = await fetch('http://localhost:3001/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        });
        const data = await res.json();

        // Si el servidor devuelve un error 'INCORRECTA', rechazar la promesa
        if (res.status === 400 && data.error === 'INCORRECTA') {
            return thunkAPI.rejectWithValue('Usuario o contraseña incorrecta');
        }

        return data;
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.message)
    }
})

// Inicializacion de autenticacion
const initialState = {
    user: '',
    idUser: '',
    projects: [],
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
            state.idUser = ''
            state.projects = null
            state.isLoggedIn = false
            state.loading = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Exitoso - signup
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload.email
                state.idUser = action.payload.id
                state.projects = action.payload.projects
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
            // Exitoso - signin
            .addCase(signin.fulfilled, (state, action) => {
                state.user = action.payload.email;
                state.idUser = action.payload.id;
                state.projects = action.payload.projects;
                state.isLoggedIn = true;
                state.loading = false;
                state.error = null;
            })
            // Pendiente
            .addCase(signin.pending, (state) => {
                state.loading = true;
            })
            // Rechazado
            .addCase(signin.rejected, (state, action) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.error = action.payload;
            });
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;