import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Calendar, FileText, Target, ArrowLeft, Save, CheckCircle, Clock, Trash2 } from 'lucide-react';
import { useTodoContext } from '../../context/TodoContext';
import Button from '../../components/ui/Button';
import { formatDateForInput, formatDateToDDMMYYYY } from '../../utils/dateUtils';

const EditTodo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getTodoById, editTodo, deleteTodo, isLoading } = useTodoContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    completed: false
  });
  const [originalTodo, setOriginalTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const todo = await getTodoById(id);
        if (todo) {
          setOriginalTodo(todo);
          setFormData({
            title: todo.title || '',
            description: todo.description || '',
            dueDate: todo.dueDate ? formatDateForInput(todo.dueDate) : '',
            completed: todo.completed || false
          });
        }
      } catch (error) {
        console.error('Error fetching todo:', error);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTodo();
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const todoData = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
      };
      await editTodo(id, todoData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo? This action cannot be undone.')) {
      try {
        await deleteTodo(id);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading todo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.2),transparent_50%)]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl">
                <Save className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Edit Todo
            </h1>
            <p className="text-gray-300 text-lg">
              Update your todo details
            </p>
          </div>

          {/* Original Todo Info */}
          {originalTodo && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Current Todo Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Status:</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      originalTodo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'
                    }`}>
                      {originalTodo.completed && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span className={originalTodo.completed ? 'text-green-400' : 'text-yellow-400'}>
                      {originalTodo.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">Created:</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-white">{formatDateToDDMMYYYY(originalTodo.createdAt)}</span>
                  </div>
                </div>
                {originalTodo.dueDate && (
                  <div>
                    <span className="text-gray-400">Due Date:</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span className="text-white">{formatDateToDDMMYYYY(originalTodo.dueDate)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              icon={<ArrowLeft className="w-4 h-4" />}
              iconPosition="left"
            >
              Back to Dashboard
            </Button>
          </div>

          {/* Form Container */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Input */}
              <div className="relative">
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                  Todo Title *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Target className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    placeholder="Enter todo title"
                    required
                    maxLength={200}
                  />
                </div>
              </div>

              {/* Description Input */}
              <div className="relative">
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <div className="relative">
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 resize-none"
                    placeholder="Enter todo description"
                    maxLength={1000}
                  />
                </div>
              </div>

              {/* Due Date Input */}
              <div className="relative">
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300 mb-2">
                  Due Date (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  />
                </div>
              </div>

              {/* Completed Checkbox */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="completed"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 bg-white/5 border border-white/10 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="completed" className="text-sm font-medium text-gray-300">
                  Mark as completed
                </label>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {/* Primary Actions */}
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={() => navigate('/dashboard')}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    disabled={isLoading || !formData.title.trim()}
                    icon="arrow"
                  >
                    {isLoading ? 'Updating...' : 'Update Todo'}
                  </Button>
                </div>

                {/* Danger Zone */}
                <div className="pt-4 border-t border-white/10">
                  <Button
                    type="button"
                    variant="danger"
                    className="w-full"
                    onClick={handleDelete}
                    disabled={isLoading}
                    icon={<Trash2 className="w-4 h-4" />}
                    iconPosition="left"
                  >
                    Delete Todo
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
