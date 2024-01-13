import axios from "axios";

const todosApi =axios.create({
    baseURL:'http://localhost:3000/'
});
export const getTodos = async() =>{
  const response = await todosApi.get('/todos');
  return response.data;
};

export const addTodos = async(todo) =>{
    return await todosApi.post('/todos',todo);
}

export const updateTodos = async(todo) =>{
    return await todosApi.patch(`/todos/${todo.id}`,todo);
}

export const deleteTodos = async(todo) =>{
    return await todosApi.delete(`/todos/${todo.id}`,todo);
}

export default todosApi;