/**
 * Utility functions for date formatting and manipulation
 */

/**
 * Formats a date string to dd/mm/yyyy format
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} Formatted date string in dd/mm/yyyy format
 */
export const formatDateToDDMMYYYY = (dateInput) => {
  if (!dateInput) return '';
  
  try {
    const date = new Date(dateInput);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return '';
    }
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Formats a date for input fields (yyyy-mm-dd format)
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} Formatted date string in yyyy-mm-dd format
 */
export const formatDateForInput = (dateInput) => {
  if (!dateInput) return '';
  
  try {
    const date = new Date(dateInput);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return '';
    }
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error formatting date for input:', error);
    return '';
  }
};

/**
 * Checks if a date is today
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {boolean} True if the date is today
 */
export const isToday = (dateInput) => {
  if (!dateInput) return false;
  
  try {
    const date = new Date(dateInput);
    const today = new Date();
    
    return date.toDateString() === today.toDateString();
  } catch (error) {
    return false;
  }
};

/**
 * Checks if a date is overdue (past today)
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {boolean} True if the date is overdue
 */
export const isOverdue = (dateInput) => {
  if (!dateInput) return false;
  
  try {
    const date = new Date(dateInput);
    const today = new Date();
    
    // Set time to start of day for accurate comparison
    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    return date < today;
  } catch (error) {
    return false;
  }
};

/**
 * Gets relative time description (e.g., "Today", "Tomorrow", "2 days ago")
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} Relative time description
 */
export const getRelativeTimeDescription = (dateInput) => {
  if (!dateInput) return '';
  
  try {
    const date = new Date(dateInput);
    const today = new Date();
    
    // Set time to start of day for accurate comparison
    const targetDate = new Date(date);
    const currentDate = new Date(today);
    targetDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    
    const diffTime = targetDate - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays > 1) return `In ${diffDays} days`;
    if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;
    
    return formatDateToDDMMYYYY(dateInput);
  } catch (error) {
    return formatDateToDDMMYYYY(dateInput);
  }
};

/**
 * Validates if a date string is valid
 * @param {string} dateString - Date string to validate
 * @returns {boolean} True if valid date
 */
export const isValidDate = (dateString) => {
  if (!dateString) return false;
  
  try {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  } catch (error) {
    return false;
  }
};
