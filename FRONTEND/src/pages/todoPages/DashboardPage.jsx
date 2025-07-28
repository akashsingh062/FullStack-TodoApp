import React, { useState, useEffect } from 'react'
import { useUserContext } from '../../context/UserContext'
import Button from '../../components/ui/Button'
import {
  CheckCircle,
  Clock,
  Plus,
  Calendar,
  TrendingUp,
  Target,
  User,
  Mail,
  Shield,
  AlertCircle,
  Edit,
  Trash2,
  X,
  FileText
} from 'lucide-react'
import { useTodoContext } from '../../context/TodoContext'
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { formatDateToDDMMYYYY } from '../../utils/dateUtils';


const DashboardPage = () => {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { todos, getAllTodos, toggleTodoCompletion, deleteTodo, getTodoById } = useTodoContext()
  const { user, isEmailVerified } = useUserContext()

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    getAllTodos()
  }, [])

  const stats = useMemo(() => ({
    totalTodos: todos.length,
    completedTodos: todos.filter(todo => todo.completed).length,
    pendingTodos: todos.filter(todo => !todo.completed).length,
    todayTodos: todos.filter(todo => todo.dueDate === new Date().toISOString().split('T')[0]).length
  }), [todos]);

const recentTodos = useMemo(() => {
  return todos.slice(0, 5).map(todo => ({
    id: todo.id,
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
    dueDate: todo.dueDate,
    createdAt: todo.createdAt
  }))
}, [todos])

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

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const completionPercentage = stats.totalTodos > 0 ? Math.round((stats.completedTodos / stats.totalTodos) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, {user?.name || 'User'}! 👋
              </h1>
              <p className="text-gray-300 text-lg">
                {formatDate(currentTime)} • {formatTime(currentTime)}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                variant="primary"
                icon="arrow"
                to="/todos/create"
              >
                Create New Todo
              </Button>
            </div>
          </div>
        </div>

        {/* Email Verification Alert */}
        {!isEmailVerified && (
          <div className="mb-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-400 mr-3" />
              <div className="flex-1">
                <p className="text-yellow-100 font-medium">Email verification required</p>
                <p className="text-yellow-200/80 text-sm">Please verify your email to access all features.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                to="/verify-email"
                className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white"
              >
                Verify Now
              </Button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium">Total Todos</p>
                <p className="text-3xl font-bold text-white">{stats.totalTodos}</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-green-400">{stats.completedTodos}</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-orange-400">{stats.pendingTodos}</p>
              </div>
              <div className="bg-orange-500/20 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium">Progress</p>
                <p className="text-3xl font-bold text-purple-400">{completionPercentage}%</p>
              </div>
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Todos */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Todos</h2>
              <Button
                variant="ghost"
                size="sm"
                to="/todos"
              >
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentTodos.map((todo) => (
                <div
                  key={todo.id || todo.title}
                  className="flex items-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                >
                  {/* Checkbox */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                      todo.completed
                        ? 'bg-green-500 border-green-500 hover:bg-green-600'
                        : 'border-gray-400 hover:border-gray-300'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleComplete(todo.id, todo.completed);
                    }}
                  >
                    {todo.completed && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>

                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => handleTodoClick(todo.id)}
                  >
                    <p className={`font-medium ${
                      todo.completed ? 'text-gray-400 line-through' : 'text-white'
                    }`}>
                      {todo.title}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Due: {todo.dueDate ? formatDateToDDMMYYYY(todo.dueDate) : 'No due date'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditTodo(todo.id);
                      }}
                      className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                      title="Edit todo"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTodo(todo.id);
                      }}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                      title="Delete todo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Calendar className="w-4 h-4 text-gray-400 ml-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Profile & Quick Actions */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Profile</h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                    <User className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Name</p>
                    <p className="text-white font-medium">{user?.name || 'Not available'}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-purple-500/20 p-2 rounded-lg mr-3">
                    <Mail className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Email</p>
                    <p className="text-white font-medium">{user?.email || 'Not available'}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${
                    isEmailVerified ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    <Shield className={`w-4 h-4 ${
                      isEmailVerified ? 'text-green-400' : 'text-red-400'
                    }`} />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Status</p>
                    <p className={`font-medium ${
                      isEmailVerified ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {isEmailVerified ? 'Verified' : 'Unverified'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>

              <div className="space-y-3">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-start"
                  to="/todos"
                >
                  <Target className="w-4 h-4 mr-2" />
                  View All Todos
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-start"
                  to="/todos/create"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Todo
                </Button>
              </div>
            </div>

            {/* Progress Chart */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Progress Overview</h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Completion Rate</span>
                    <span className="text-white font-medium">{completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-400">{stats.completedTodos}</p>
                    <p className="text-gray-300 text-xs">Done</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-400">{stats.pendingTodos}</p>
                    <p className="text-gray-300 text-xs">Pending</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  )
}

export default DashboardPage