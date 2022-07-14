import { Trash } from "phosphor-react";
import { FormEvent } from "react";

interface TaskListProps {
  content: string;
  isCompleted: boolean;
  onDeleteTask: (task: string) => void;
  onTaskCompleted: (taks: string) => void;
}

export function TaskList({content, isCompleted, onDeleteTask, onTaskCompleted}: TaskListProps) {

  function handleDeleteTask(event: FormEvent) {
    event.preventDefault();
    
    onDeleteTask(content);
  }

  function handleTasksCompleted() {
    onTaskCompleted(content);
  }

  return (
    <div className="flex items-center justify-center flex-col last:mb-8">
      <div className="flex w-[20rem] justify-between bg-gray-500 rounded p-4 mt-4 lg:w-[63rem] ">
        <div className={isCompleted ? 'line-through opacity-[0.5]' : ''}>          
            <input 
              className="mr-5"
              type="radio"
              readOnly
              checked={isCompleted}
              onClick={() => handleTasksCompleted()}
            />     
          <label className="">      
              {content}
          </label>
        </div>
        <button 
          onClick={handleDeleteTask}
          className="text-gray-300 hover:text-red-500"
          title="Deletar todo"
        >
          <Trash />
        </button>
      </div>      
    </div>
  )
}