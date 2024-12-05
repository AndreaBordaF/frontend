// Tipos de datos recibidos desde la API
export interface User {
    id: string;
    email: string;
    displayName: string;
  }
  
  export interface AuthResponse {
    accessToken: string, 
    refreshToken: string, 
    profile: {}
  }