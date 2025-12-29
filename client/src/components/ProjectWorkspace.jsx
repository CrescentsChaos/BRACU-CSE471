import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectWorkspace = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ name: '', desc: '', file: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchWorkspaceData();
    }, []);

    const fetchWorkspaceData = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/workspace/tasks');
            setTasks(data);
        } catch (err) {
            console.error("Refresh failed", err);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!newTask.name) return alert("Task name is required");

        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/workspace/add-task', {
                taskName: newTask.name,
                description: newTask.desc,
                fileUrl: newTask.file
            });
            setNewTask({ name: '', desc: '', file: '' });
            fetchWorkspaceData(); // Refresh board
        } catch (err) {
            alert("Error: " + (err.response?.data?.error || "Check Server Logs"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="workspace-wrapper">
            <div className="task-creation-box">
                <h3>New Collaborative Task</h3>
                <form onSubmit={handleCreateTask} className="task-form">
                    <input 
                        type="text"
                        placeholder="Task Title (e.g. Design Homepage)" 
                        value={newTask.name}
                        onChange={e => setNewTask({...newTask, name: e.target.value})}
                    />
                    <textarea 
                        placeholder="Instructions or details..." 
                        value={newTask.desc}
                        onChange={e => setNewTask({...newTask, desc: e.target.value})}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Syncing..." : "Add to Project Board"}
                    </button>
                </form>
            </div>

            <div className="task-board">
                {tasks.length > 0 ? tasks.map(task => (
                    <div key={task.id} className="task-card">
                        <div className="card-tag">Task</div>
                        <h4>{task.name}</h4>
                        <p>{task.desc || "No description provided."}</p>
                        {task.attachments?.map(att => (
                            <a key={att.id} href={att.url} target="_blank" rel="noreferrer" className="task-link">
                                📎 View Asset
                            </a>
                        ))}
                    </div>
                )) : <p className="empty-msg">No tasks yet. Start collaborating!</p>}
            </div>
        </div>
    );
};

export default ProjectWorkspace;