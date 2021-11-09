//? NODE IMPORTS
import { reactive } from "vue";

//? IMPORTS

//? TYPES
type homepage_data_type = {
  loaded_image: Blob | null,
  user_id: string
}

//? BODY
const _homepage_data: homepage_data_type = {
  loaded_image: null,
  user_id: 'no id'
}

export const homepage_data = reactive(_homepage_data)