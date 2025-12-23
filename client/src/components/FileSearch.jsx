import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileSearch = () => {
    // 1. Initialize with empty arrays to prevent .map() errors
    const [results, setResults] = useState([]);
    const [meta, setMeta] = useState({ categories: [], publishers: [] });
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        name: '',
        category: '',
        publisher: '',
        minRating: 0
    });

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                // Fetch filters and initial results in parallel
                const [filterRes, searchRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/courses/filters'),
                    axios.get('http://localhost:5000/api/courses/search')
                ]);
                
                setMeta(filterRes.data || { categories: [], publishers: [] });
                setResults(searchRes.data || []);
            } catch (err) {
                console.error("Initialization failed:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const handleSearch = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/courses/search', { params: filters });
            setResults(data);
        } catch (err) {
            console.error("Search failed:", err);
        }
    };

    if (loading) return <div className="loading-state">Syncing with SkillSwap Database...</div>;

    return (
        <div className="search-section">
            <div className="filter-grid">
                <input 
                    type="text" 
                    placeholder="Search name..." 
                    value={filters.name}
                    onChange={(e) => setFilters({...filters, name: e.target.value})} 
                />

                {/* Safety check: only map if categories exists */}
                <select value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})}>
                    <option value="">All Categories</option>
                    {meta.categories?.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <select value={filters.publisher} onChange={(e) => setFilters({...filters, publisher: e.target.value})}>
                    <option value="">All Publishers</option>
                    {meta.publishers?.map(pub => (
                        <option key={pub} value={pub}>{pub}</option>
                    ))}
                </select>

                <select value={filters.minRating} onChange={(e) => setFilters({...filters, minRating: e.target.value})}>
                    <option value="0">Min Rating</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                </select>

                <button className="search-confirm-btn" onClick={handleSearch}>Find</button>
            </div>

            <div className="results-grid">
                {results.length > 0 ? (
                    results.map(course => (
                        <div key={course._id} className="course-card">
                            <h3>{course.name}</h3>
                            <p className="publisher-label">By {course.publisher}</p>
                            <div className="card-footer">
                                <span className="category-badge">{course.category}</span>
                                <span className="rating-star">⭐ {course.rating}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">No courses match your filters.</div>
                )}
            </div>
        </div>
    );
};

export default FileSearch;