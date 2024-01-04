import { Chat } from '../../types'
import { v4 as uuid } from 'uuid'
import { faker } from '@faker-js/faker'
export const chatInitialData: Chat[] = [
  // parent
  {
    id: '123123123123',
    text: 'Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. Nailed the design, and the responsiveness at various breakpoints works really well',
    username: 'amyrobson',
    likes: ['1', '2', '3'],
    dislikes: ['2'],
    profileImage: faker.image.avatar()
  },
  {
    id: '123123123123@1312312',
    text: 'parent2 text asdf adsf asdf asdf ',
    username: 'maxblagun',
    likes: [],
    dislikes: [],
    profileImage: faker.image.avatar()
  },
  {
    id: '431413412341234',
    text: 'parent3 text asdf adsf asdf asdf ',
    username: 'parent3',
    likes: [],
    dislikes: [],
    profileImage: faker.image.avatar()
  },
  // child
  {
    id: uuid(),
    text: `If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.`,
    username: 'amyrobson',
    parentId: '123123123123',
    likes: [],
    dislikes: [],
    profileImage: faker.image.avatar()
  },
  {
    id: uuid(),
    text: 'child 2',
    username: 'c2',
    parentId: '123123123123',
    likes: [],
    dislikes: [],
    profileImage: faker.image.avatar()
  },
  {
    id: uuid(),
    text: 'child 2',
    username: 'c3',
    parentId: '123123123123@1312312',
    likes: [],
    dislikes: [],
    profileImage: faker.image.avatar()
  },
  {
    id: uuid(),
    text: 'child 2',
    username: 'c4',
    parentId: '123123123123@1312312',
    likes: [],
    dislikes: [],
    profileImage: faker.image.avatar()
  }
]

// interface UpdatedChat extends Chat {
//   children?: Chat[]
// }
// export const chatInitialDataUpdated: UpdatedChat[] = [
//   {
//     id: '1',
//     username: '1',
//     likes: 1,
//     text: '1',
//     children: [
//       {
//         id: 'child1',
//         username: 'child1',
//         likes: 1,
//         text: 'child1'
//       },
//       {
//         id: 'child2',
//         username: 'child2',
//         likes: 2,
//         text: 'child2'
//       },
//     ]
//   }
// ]
