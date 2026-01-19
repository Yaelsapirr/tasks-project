import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = localStorage.getItem('tasks');
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      console.error('Error initializing tasks from localStorage:', error);
      return [];
    }
  });
  const [filter, setFilter] = useState(() => {
    const storedFilter = localStorage.getItem('filter');
    return storedFilter || 'all';
  });

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('Saved tasks to localStorage:', tasks);
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [tasks]);

  // Save filter to localStorage whenever filter changes
  useEffect(() => {
    localStorage.setItem('filter', filter);
  }, [filter]);

  const totalTasks = tasks.length;
  const openTasks = tasks.filter(task => !task.completed).length;
  const closedTasks = tasks.filter(task => task.completed).length;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'open') return !task.completed;
    if (filter === 'closed') return task.completed;
    return true;
  });

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, ...updatedTask } : task
    ));
  };

  return (
    <div className="app">
      <h1>Task Management App</h1>
      <TaskForm onAddTask={addTask} />
      <div className="task-summary">
        <div className="counts">
          <span>Total: {totalTasks}</span>
          <span>Open: {openTasks}</span>
          <span>Closed: {closedTasks}</span>
        </div>
        <div className="filters">
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => setFilter('open')} className={filter === 'open' ? 'active' : ''}>Open</button>
          <button onClick={() => setFilter('closed')} className={filter === 'closed' ? 'active' : ''}>Closed</button>
        </div>
      </div>
      <TaskList
        tasks={filteredTasks}
        onToggleComplete={toggleComplete}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  );
}

export default App;
