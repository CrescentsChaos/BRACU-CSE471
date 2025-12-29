import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectWorkspace = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ name: '', desc: '', file: '' });

    useEffect(() => {
        fetchWorkspaceData();
    }, []);

    const fetchWorkspaceData = async () => {
        const { data } = await axios.get('http://localhost:5000/api/workspace/tasks');
        setTasks(data);
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/workspace/add-task', {
            taskName: newTask.name,
            description: newTask.desc,
            fileUrl: newTask.file 
        });
        fetchWorkspaceData();
        setNewTask({ name: '', desc: '', file: '' });
    };

    return (
        <div className="workspace-container">
            <h2>Group Project Workspace</h2>
            
            {/* Task Creation Form */}
            <form onSubmit={handleCreateTask} className="task-form">
                <input 
                    placeholder="Task Name" 
                    onChange={e => setNewTask({...newTask, name: e.target.value})}
                />
                <textarea 
                    placeholder="Describe task..." 
                    onChange={e => setNewTask({...newTask, desc: e.target.value})}
                />
                <button type="submit">Create Collaborative Task</button>
            </form>

            {/* Task Board */}
            <div className="task-board">
                {tasks.map(task => (
                    <div key={task.id} className="task-card">
                        <h4>{task.name}</h4>
                        <p>{task.desc}</p>
                        {task.attachments?.map(att => (
                            <a key={att.id} href={att.url} target="_blank" className="file-link">
                                📎 View Shared File
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ProjectWorkspace;