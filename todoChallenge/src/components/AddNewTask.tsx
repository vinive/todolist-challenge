import { v4 as uuidv4 } from 'uuid';

import { ClipboardText, PlusCircle } from "phosphor-react";
import { FormEvent, useState } from "react";
import { TaskList } from "./TaskList";

interface TaskProps {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function AddNewTask() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  
  const tasksIsCompleted = tasks.filter(task => {
    return task.isCompleted;
  })

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    if (newTaskText === '') {
      return;
    }

    setTasks([...tasks, 
      {
        id: uuidv4(),
        title: newTaskText,
        isCompleted: false
      }]);

    setNewTaskText('');

  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeleteOne = tasks.filter(task => {
      return task.title !== taskToDelete
    })
    
    setTasks(tasksWithoutDeleteOne)
  }

  function handleCompleteTasks(title: string) {
    const newTaskArray = [...tasks].map(task => {
      if (task.title === title) {
        task.isCompleted = !task.isCompleted
      }
      return task;
    })
    setTasks(newTaskArray);
  }

  return(
   <form className="w-auto flex-1" onSubmit={handleCreateNewTask}>
    <div className="flex justify-center mt-[-1.8rem]">
      <input 
        className="flex bg-gray-500 text-gray-100 w-[56rem] mx-8 rounded p-4 mr-4 placeholder-gray-300"
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
      />
      <button 
        className="flex p-4 rounded border-0 mr-8 bg-blue-300 text-gray-100 font-bold hover:bg-blue-500 transition:color"
        type="submit"
      >
        Criar
        <PlusCircle
          className="ml-1"
          size={20} 
        />
      </button>
    </div>
      
      <div className="flex justify-evenly  w-full mt-14 mb-5 lg:justify-around">
        <div className="flex">
          <p className="text-blue-300">
            Tarefas criadas
          </p>
          <span className="flex justify-center ml-2 bg-gray-400 w-8 rounded-xl">
            {tasks.length}
          </span>
        </div>

        <div className="flex">
          <p className="text-purple-300">
            Concluídas
          </p>
          <span className="flex justify-center ml-2 bg-gray-400 rounded-xl px-2">
            {tasks.length === 0 ? tasks.length : `${tasksIsCompleted.length + ' de ' + tasks.length}`}
          </span>
        </div>
    </div>

      {tasks.length === 0 ? (
        <div className="flex justify-center py-16">
          <p className="flex flex-col items-center text-gray-300">
            <ClipboardText size={120} color="#333333"/>
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seu itens a fazer</p>
          </p>
        </div>
      ): 
        tasks.map(task => {
          return( 
            <TaskList 
              key={task.id} 
              content={task.title} 
              isCompleted={task.isCompleted}
              onTaskCompleted={handleCompleteTasks}
              onDeleteTask={deleteTask} 
            />
          )
      })}
   </form>
  )
}
