import React from 'react';
import TaskItem from './TaskItem';
import styles from './TaskList.module.css';

const TaskList = ({ tasks, onToggleComplete, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No tasks yet. Add a task to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;