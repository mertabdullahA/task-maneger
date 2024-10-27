
import './App.css';
import { useState, useEffect } from 'react';


function App() {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Uygulama yüklendiğinde görevleri localStorage'dan al
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Görevlerde değişiklik olduğunda localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Görev ekle
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // Görevi tamamlandı olarak işaretle
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Görev sil
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Tüm görevleri temizle
  const clearTasks = () => {
    setTasks([]);
    localStorage.removeItem('tasks');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Görev Takip Uygulaması</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Yeni görev ekle"
      />
      <button onClick={addTask} style={{ marginLeft: '10px' }}>Ekle</button>

      <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
        {tasks.map((task, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                marginLeft: '10px',
                flexGrow: 1,
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(index)} style={{ marginLeft: '10px' }}>Sil</button>
          </li>
        ))}
      </ul>

      {tasks.length > 0 && (
        <button onClick={clearTasks} style={{ marginTop: '20px' }}>Tüm Görevleri Temizle</button>
      )}
    </div>
  );
}
export default App;
