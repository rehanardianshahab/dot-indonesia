import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../components/button';
import Input from '../components/input';
import Checkbox from '../components/checkbox';
import { TbTrash } from 'react-icons/tb';

export const Route = createFileRoute('/todo')({
  component: RouteComponent,
});

const todoSchema = z.object({
  title: z.string().nonempty({ message: 'Title Required' }),
  checked: z.boolean(),
});

type TodoItem = z.infer<typeof todoSchema>;

function RouteComponent() {
  const [todos, setTodos] = React.useState<TodoItem[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TodoItem>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: '',
      checked: false,
    },
  });

  const onSubmit = (data: TodoItem) => {
    const isDuplicate = todos.some(
      (todo) => todo.title.toLowerCase() === data.title.toLowerCase(),
    );

    if (isDuplicate) {
      alert('Already exists todo name');
      return;
    }

    setTodos((prevTodos) => [...prevTodos, data]);
    reset();
  };

  const handleCheckboxChange = (todo: TodoItem) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t === todo ? { ...t, checked: !t.checked } : t)),
    );
  };

  const handleRemove = (todo: TodoItem) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t !== todo));
  };

  const nameValue = watch('title');

  const incompleteTodos = todos.filter((todo) => !todo.checked);
  const completeTodos = todos.filter((todo) => todo.checked);

  return (
    <div className="container flex">
      <div className="w-1-3">
        <h1 className="text-primary mb-10">Todo</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4 w-full">
          <div>
            <Input
              customClass="w-full"
              value={nameValue}
              error={errors.title?.message}
              onValueChange={(val) => setValue('title', val)}
              {...register('title')}
            />
          </div>
          <Button label="Add Todo" customClass="primary w-full mt-10" />
        </form>
      </div>

      {todos.length > 0 ? (
        <div className="flex items-start mt-30 w-full">
          <IncompleteTodos
            todos={incompleteTodos}
            onCheckboxChange={handleCheckboxChange}
            onRemove={handleRemove}
          />
          <CompletedTodos
            todos={completeTodos}
            onCheckboxChange={handleCheckboxChange}
            onRemove={handleRemove}
          />
        </div>
      ) : (
        <div className="mt-30 w-full text-center">
          <img src="/empty-data.svg" width="220px" />
          <p className="mt-10 text-primary">Empty Todo</p>
        </div>
      )}
    </div>
  );
}

function IncompleteTodos({
  todos,
  onCheckboxChange,
  onRemove,
}: {
  todos: TodoItem[];
  onCheckboxChange: (todo: TodoItem) => void;
  onRemove: (todo: TodoItem) => void;
}) {
  return (
    <div className="card w-full">
      <div className="card-body">
        <h2 className="font-bold mb-10 text-primary">Incomplete Todos</h2>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              key={todo.title}
              className="flex items-center justify-between w-full mb-10"
            >
              <Checkbox
                name={`todo-incomplete-${todo.title}`}
                checked={todo.checked || false}
                onChange={() => onCheckboxChange(todo)}
              />
              <span className="wrap-text w-full text-sm">{todo.title}</span>
              <div className="text-right">
                <TbTrash
                  onClick={() => onRemove(todo)}
                  className="text-danger cursor-pointer"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="font-bold text-disabled text-sm">No incomplete todos</p>
        )}
      </div>
    </div>
  );
}

function CompletedTodos({
  todos,
  onCheckboxChange,
  onRemove,
}: {
  todos: TodoItem[];
  onCheckboxChange: (todo: TodoItem) => void;
  onRemove: (todo: TodoItem) => void;
}) {
  return (
    <div className="card w-full">
      <div className="card-body">
        <h2 className="font-bold mb-10 text-primary">Completed Todos</h2>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              key={todo.title}
              className="flex items-center justify-between w-full"
            >
              <Checkbox
                name={`todo-complete-${todo.title}`}
                checked={todo.checked || false}
                onChange={() => onCheckboxChange(todo)}
              />
              <span className="wrap-text w-full text-sm">{todo.title}</span>
              <div className="text-right">
                <TbTrash
                  onClick={() => onRemove(todo)}
                  className="text-danger cursor-pointer"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="font-bold text-disabled text-sm">No completed todos</p>
        )}
      </div>
    </div>
  );
}
