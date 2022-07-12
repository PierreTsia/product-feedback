import { currentUser, productRequests } from './../data/data.json'


export default defineEventHandler(() => ({
  currentUser,
  productRequests,
}))
