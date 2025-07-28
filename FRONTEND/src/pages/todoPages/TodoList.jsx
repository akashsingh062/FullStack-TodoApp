import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  CheckCircle,
  Plus,
  Calendar,
  Target,
  Edit,
  Trash2,
  ArrowLeft,
  Filter,
  Search,
  X,
  FileText,
  Clock
} from 'lucide-react';
import { useTodoContext } from '../../context/TodoContext';
import Button from '../../components/ui/Button';
import { formatDateToDDMMYYYY } from '../../utils/dateUtils';

const TodoList = () => {
  const navigate = useNavigate();
  const { todos, getAllTodos, toggleTodoCompletion, deleteTodo, getTodoById, isLoading } = useTodoContext();
  const [filter, setFilter] = useState('all'); // all, completed, pending
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllTodos();
  }, []);

  // Filter and search todos
  const filteredTodos = todos.filter(todo => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'completed' && todo.completed) || 
      (filter === 'pending' && !todo.completed);
    
    const matchesSearch = 
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (todo.description && todo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  // Handler functions
  const handleToggleComplete = async (todoId, currentStatus) => {
    try {
      await toggleTodoCompletion(todoId, currentStatus);
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await deleteTodo(todoId);
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  };

  const handleEditTodo = (todoId) => {
    navigate(`/todos/edit/${todoId}`);
  };

  const handleTodoClick = async (todoId) => {
    try {
      const todo = await getTodoById(todoId);
      setSelectedTodo(todo);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching todo details:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                icon={<ArrowLeft className="w-4 h-4" />}
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-4xl font-bold text-white">All Todos</h1>
                <p className="text-gray-300">Manage your tasks</p>
              </div>
            </div>
            <Button
              variant="primary"
              onClick={() => navigate('/todos/create')}
              icon={<Plus className="w-5 h-5" />}
              iconPosition="left"
            >
              Create Todo
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-12 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="all">All Todos</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total</p>
                  <p className="text-2xl font-bold text-white">{todos.length}</p>
                </div>
                <Target className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-white">{todos.filter(t => !t.completed).length}</p>
                </div>
                <Calendar className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-white">{todos.filter(t => t.completed).length}</p>
                </div>
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                {searchTerm || filter !== 'all' ? 'No todos found' : 'No todos yet'}
              </h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || filter !== 'all' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Create your first todo to get started'
                }
              </p>
              {!searchTerm && filter === 'all' && (
                <Button
                  variant="primary"
                  onClick={() => navigate('/todos/create')}
                  icon={<Plus className="w-5 h-5" />}
                  iconPosition="left"
                >
                  Create Your First Todo
                </Button>
              )}
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                onClick={() => handleTodoClick(todo.id)}
              >
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-200 mt-1 ${
                      todo.completed
                        ? 'bg-green-500 border-green-500 hover:bg-green-600'
                        : 'border-gray-400 hover:border-gray-300'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleComplete(todo.id, todo.completed);
                    }}
                  >
                    {todo.completed && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-semibold mb-2 ${
                      todo.completed ? 'text-gray-400 line-through' : 'text-white'
                    }`}>
                      {todo.title}
                    </h3>
                    {todo.description && (
                      <p className={`text-sm mb-3 line-clamp-2 ${
                        todo.completed ? 'text-gray-500' : 'text-gray-300'
                      }`}>
                        {todo.description.length > 100
                          ? `${todo.description.substring(0, 100)}...`
                          : todo.description
                        }
                      </p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      {todo.dueDate && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {formatDateToDDMMYYYY(todo.dueDate)}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Created: {formatDateToDDMMYYYY(todo.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditTodo(todo.id);
                      }}
                      className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                      title="Edit todo"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTodo(todo.id);
                      }}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                      title="Delete todo"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Todo Details Modal */}
        {isModalOpen && selectedTodo && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Todo Details</h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Todo Content */}
              <div className="space-y-6">
                {/* Status */}
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedTodo.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-400'
                  }`}>
                    {selectedTodo.completed && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`text-lg font-medium ${
                    selectedTodo.completed ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {selectedTodo.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <p className={`text-xl font-semibold ${
                    selectedTodo.completed ? 'text-gray-400 line-through' : 'text-white'
                  }`}>
                    {selectedTodo.title}
                  </p>
                </div>

                {/* Description */}
                {selectedTodo.description && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-gray-300 whitespace-pre-wrap">{selectedTodo.description}</p>
                    </div>
                  </div>
                )}

                {/* Due Date */}
                {selectedTodo.dueDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <span className="text-white">{formatDateToDDMMYYYY(selectedTodo.dueDate)}</span>
                    </div>
                  </div>
                )}

                {/* Created Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Created</label>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">{formatDateToDDMMYYYY(selectedTodo.createdAt)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4 border-t border-white/10">
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => {
                      closeModal();
                      handleEditTodo(selectedTodo.id);
                    }}
                    icon={<Edit className="w-4 h-4" />}
                    iconPosition="left"
                  >
                    Edit Todo
                  </Button>
                  <Button
                    variant="danger"
                    className="flex-1"
                    onClick={() => {
                      closeModal();
                      handleDeleteTodo(selectedTodo.id);
                    }}
                    icon={<Trash2 className="w-4 h-4" />}
                    iconPosition="left"
                  >
                    Delete Todo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
