import { Router }  from "express";
import {getAllPosts, createPost, patchLike, destroyPost, updatePost} from '../src/controllers/postsControllers.js'

const router = Router()

router.get('/posts', getAllPosts)
router.post('/posts', createPost)
router.patch('/posts/like/:id', patchLike)
//Utilicé PATCH en vez de PUT, ya que sólo debía cambiar 1 sólo dato, de igual forma se creo todo el código paa el cambio en el backend
// router.put('/posts/:id', updatePost)
router.delete('/posts/:id', destroyPost)

export default router