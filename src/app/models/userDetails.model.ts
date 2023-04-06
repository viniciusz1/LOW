import { Usuario } from "./usuario.model"

export interface UserDetails {
    accountNonExpired: boolean
    accountNonLocked: boolean
    authorities: string
    credentialsNonExpired: boolean
    enabled: boolean
    password: string
    username: string
    usuario: Usuario
}