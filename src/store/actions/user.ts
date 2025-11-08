import {UserSchema} from '@/schemas/types'
import {create} from 'zustand'
import {UserState} from '../@types/user'


const useUserStore = create<UserState>((set) => ({
    users: [],
    setUsers: (users: UserSchema[]) => set({users}),
    addUser: (user: UserSchema) => set((state) => ({users: [...state.users, user]})),
}))

export default useUserStore
