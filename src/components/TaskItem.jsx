import React, { useState } from 'react';
import styles from './TaskItem.module.css';

const TaskItem = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editError, setEditError] = useState('');

  const handleSave = () => {
    if (!editTitle.trim()) {
      setEditError('Title is required');
      return;
    }
    setEditError('');
    onEdit(task.id, { title: editTitle.trim(), description: editDescription.trim() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  return (
    <div className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        className={styles.checkbox}
      />
      {isEditing ? (
        <div className={styles.editForm}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
              if (e.target.value.trim()) setEditError('');
            }}
            className={styles.editInput}
          />
          {editError && <div className={styles.errorText}>{editError}</div>}
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className={styles.editTextarea}
          />
          <button onClick={handleSave} className={styles.saveButton} disabled={!editTitle.trim()}>Save</button>
          <button onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
        </div>
      ) : (
        <div className={styles.taskContent}>
          <h3 className={styles.title}>{task.title}</h3>
          <p className={styles.description}>{task.description}</p>
          <div className={styles.actions}>
            <button onClick={() => setIsEditing(true)} className={styles.editButton}>Edit</button>
            <button onClick={() => { if (window.confirm('Are you sure you want to delete this task?')) onDelete(task.id); }} className={styles.deleteButton}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;