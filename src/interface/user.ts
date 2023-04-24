export interface IUser {
  id?: any
  email: string
  password: string
  name: string
  role: 'USER' | 'ADMIN' | 'SUPER'
  address: string
  phone: string
  lastLogin: Date
  createdAt?: Date
  updatedAt?: Date
}
