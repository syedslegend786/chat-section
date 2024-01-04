export interface Chat {
  id: string
  username: string
  text: string
  parentId?: string
  idEditing?: boolean
  likes: string[]
  dislikes: string[]
  profileImage?: string
}
