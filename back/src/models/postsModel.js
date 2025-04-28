import pool from '../../db/config.js'

export const getPostsModel = async () => {
    const sqlQuery = 'SELECT * FROM posts'
    const response = await pool.query(sqlQuery)
    return response.rows
}

export const getPostByIdModel = async (id) => {
    const sqlQuery = {
        text: 'SELECT * FROM posts WHERE id = $1',
        values: [Number(id)]
    }
    const response = await pool.query(sqlQuery)
    return response.rows[0]
}

export const createPostModel = async (titulo, img, descripcion, likes) => {
    const sqlQuery = 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *'
    const values = [titulo, img, descripcion, likes]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const patchLikeModel = async (id, likes) => {
    const sqlQuery = {
        text: 'UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *',
        values: [likes, id]
    }
    const response = await pool.query(sqlQuery)
    return response.rows[0]
}

//PUT - No utilizado
export const setPostModel = async ({ titulo, img, descripcion, id }) => {
    const sqlQuery = {
        text: 'UPDATE posts SET titulo = $1, img = $2, descripcion = $3  WHERE id =$4 RETURNING *',
        values: [titulo, img, descripcion, id]
    }
    const response = await pool.query(sqlQuery)
    return response.rows[0]
}

//DELETE
export const destroyPostModel = async (id)=>{
    const sqlQuery = {
        text: 'DELETE FROM posts WHERE id = $1 RETURNING *',
        values:[id]
    }
    const result = await pool.query(sqlQuery)
    return result.rowCount
}