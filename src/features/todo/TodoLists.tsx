    import React, { useState } from "react"
    import { useQuery,useMutation,useQueryClient } from "react-query";
    import { getTodos,addTodos,updateTodos,deleteTodos } from "../../api/todosApi";
    import { FaUpload } from "react-icons/fa6";
    import { FaTrash } from "react-icons/fa";
    import { Bars } from "react-loader-spinner";

    const TodoLists = () => {
        const [newTod,setNewTodo]=useState<string>('');

        const queryClient =useQueryClient();

        const { isError ,isLoading ,error,data:todos}= useQuery('todos',getTodos,{
          select:data => data.sort((a,b) => b.id - a.id)
        });
      
      const  addToMutation =useMutation(addTodos,{
        onSuccess:() =>{
            // Invalidates cache and refetch 
            queryClient.invalidateQueries('todos')

        }
      });

      const updateMutation=useMutation(updateTodos,{
        onSuccess:() =>{
            // Invalidates cache and refetch 
            queryClient.invalidateQueries('todos')

        }
      });

        const deleteMutation=useMutation(deleteTodos,{
        onSuccess:() =>{
            // Invalidates cache and refetch 
            queryClient.invalidateQueries('todos')

        }
      })

        const handleSubmit = (e:React.FormEvent) =>{
          e.preventDefault();
          addToMutation.mutate({userId:1,title:newTod,completed:false});
          setNewTodo('')
        }
        const newItemsSection =(
            <form onSubmit={handleSubmit} className="my-10">
            <div className="  border bg-[#7077A1]   rounded-md max-w-[600px] ">
                <input className=" bg-transparent p-2 border-none outline-none  border-transparent  w-[80%]"  type="text" value={newTod} onChange={(e) =>setNewTodo(e.target.value)}
                placeholder="Enter To do"
                />
                
                <button className=" border-l-2 px-5 my-4 border-red-300 ">
                  <FaUpload  size={20}/> 
                </button>
            </div>
            </form>
        );

        let content
        if(isLoading){
        content=<p className=" flex justify-center items-center"><Bars
      height="22"
      width="22"
      color="#4fa94d"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      /></p>
        }else if(isError){
        content=<p>{error.message}</p>
        }else{
    content=todos.map((todo) =>{
      return (
        <article key={todo.id} className=" flex justify-between ">
                <div className=" my-3">
                  <input type="checkbox" checked={todo.completed}
                  onChange={() =>{
                    updateMutation.mutate({...todo,completed:!todo.completed})
                  }}
                  />
                  <label htmlFor={todo.id}>{todo.title}</label>
                </div>
                <button onClick={() =>deleteMutation.mutate({id:todo.id})}>
                  <FaTrash size={16} className=" text-rose-500"/>
                </button>
        </article>
      )
    })
        }

      return (
        <div className="flex justify-center items-center  text-[#F0ECE5]   space-y-10">
          <div className="border bg-[#2D3250] p-5 rounded-md ">

          {newItemsSection}  
          <div className=" my-10 h-[500px] overflow-y-auto  overflow-visible">
              {content}
          </div>
          </div>
        </div>
      )
    }

    export default TodoLists