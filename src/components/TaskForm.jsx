import React, { useState } from 'react';
import styles from './TaskForm.module.css';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({ title: title.trim(), description: description.trim(), completed: false, id: Date.now() });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textarea}
      />
      <button type="submit" className={styles.button}>Add Task</button>
    </form>
  );
};

export default TaskForm;