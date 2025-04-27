import {getPostsModel, createPostModel, patchLikeModel, getPostByIdModel, destroyPostModel, setPostModel} from '../models/postsModel.js'

export const getAllPosts = async(req,res)=>{
    try {
        const posts = await getPostsModel()
        res.status(200).json({posts})
    } catch (error) {
        res.status(500).json({error: 'Error al procesar la solicitud'})
        console.error('ERROR =>',error)
    }
}

export const createPost = async (req, res) =>{
    try {
        const {titulo, img, descripcion, likes} = req.body
        const newPost = await createPostModel(titulo, img, descripcion, likes)
        res.status(201).json({post: newPost})
    } catch (error) {
        res.status(500).json({error: 'Error al procesar la solicitud'})
        console.error('ERROR =>',error)
    }
}

export const patchLike = async (req, res) => {
    try {
        const { id } = req.params
        const post = await getPostByIdModel(id)
        if (!post) {
            return res.status(404).json({ error: 'Post not Found' })
        }
        const newLikes = (post.likes || 0) + 1;
        const updatePost = await patchLikeModel(id, newLikes)
        res.status(201).json({ post: updatePost })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('Error =>', error)
    }
}
//PUT - No utilizado
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const { titulo, img, descripcion } = req.body
        const post = await setPostModel({
            titulo,
            img,
            descripcion,
            id
        })
        res.status(201).json({ post })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solictud' })
        console.error('ERROR =>', error)
    }
}

//DELETE
export const destroyPost = async(req,res)=>{
    try {
        const {id} = req.params
        const post = await destroyPostModel(id)
        if(post===0){
            return res.status(404).json({error: 'Post not found'})
        }
        res.status(204).json({message: 'Post eliminado'})
    } catch (error) {
        res.status(500).json({error:'Error al procesar la solicitud'})
    }
}