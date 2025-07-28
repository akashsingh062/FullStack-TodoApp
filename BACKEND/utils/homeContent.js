const year = new Date().getFullYear();
const homeContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo API Documentation</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      /* PROFESSIONAL DARK MODE PALETTE */
      --primary: #3b82f6;
      --primary-hover: #2563eb;
      --secondary: #8b5cf6;
      --accent: #10b981;
      --warning: #f59e0b;
      --danger: #ef4444;
      --info: #06b6d4;

      --bg-primary: #0f172a;
      --bg-secondary: #1e293b;
      --bg-tertiary: #334155;
      --bg-card: #1e293b;
      --bg-hover: #334155;

      --text-primary: #f8fafc;
      --text-secondary: #cbd5e1;
      --text-muted: #64748b;

      --border: #334155;
      --border-hover: #475569;
      --border-focus: #3b82f6;

      --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

      --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      --transition-fast: all 0.1s ease-out;

      --radius: 8px;
      --radius-lg: 12px;
      --radius-xl: 16px;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
      overflow-x: hidden;
      position: relative;
      min-height: 100vh;
    }

    /* SUBTLE PROFESSIONAL BACKGROUND */
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image:
        radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.03) 0%, transparent 50%);
      pointer-events: none;
      z-index: -1;
    }



    /* SUBTLE PROFESSIONAL ANIMATIONS */
    @keyframes slide-up {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scale-in {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes border-flow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    /* OPTIMIZED CONTROL PANEL */
    .control-panel {
      position: fixed;
      top: 2rem;
      right: 2rem;
      z-index: 1000;
      display: flex;
      gap: 1rem;
    }

    .control-btn {
      width: 50px;
      height: 50px;
      border-radius: var(--radius);
      background: var(--bg-card);
      border: 1px solid var(--border);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: var(--transition);
      backdrop-filter: blur(10px);
      font-size: 1.2rem;
    }

    .control-btn:hover {
      background: var(--primary);
      color: var(--bg-primary);
      box-shadow: var(--glow);
      transform: translateY(-2px);
    }

    /* MAIN CONTAINER */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      position: relative;
    }

    /* HERO SECTION */
    .hero {
      text-align: center;
      padding: 4rem 2rem;
      margin-bottom: 4rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      position: relative;
      animation: slide-up 0.6s ease-out;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg,
        transparent,
        var(--primary),
        transparent);
      background-size: 200% 100%;
      animation: border-flow 4s ease-in-out infinite;
    }
    /* OPTIMIZED TYPOGRAPHY */
    .title {
      font-family: 'Inter', sans-serif;
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 700;
      margin: 0 0 1rem 0;
      color: var(--text-primary);
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    .subtitle {
      font-size: clamp(1.2rem, 3vw, 1.8rem);
      color: var(--text-secondary);
      margin: 0 0 2rem 0;
      font-weight: 300;
      opacity: 0.9;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 50px;
      padding: 0.5rem 1rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--accent);
    }

    .status-dot {
      width: 6px;
      height: 6px;
      background: var(--accent);
      border-radius: 50%;
      animation: pulse 2s ease-in-out infinite;
    }

    /* OPTIMIZED SECTIONS */
    .section {
      margin-bottom: 3rem;
      animation: slide-up 0.6s ease-out;
      animation-fill-mode: both;
    }

    .section:nth-child(2) { animation-delay: 0.2s; }
    .section:nth-child(3) { animation-delay: 0.4s; }

    .section-title {
      font-family: 'Inter', sans-serif;
      font-size: clamp(1.5rem, 3vw, 2rem);
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 2rem 0;
      display: flex;
      align-items: center;
      gap: 1rem;
      letter-spacing: -0.01em;
    }

    .section-icon {
      width: 2.5rem;
      height: 2.5rem;
      background: var(--primary);
      border-radius: var(--radius);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.1rem;
    }
    /* OPTIMIZED ENDPOINT GRID */
    .endpoint-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .endpoint-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.5rem;
      position: relative;
      cursor: pointer;
      transition: var(--transition);
      overflow: hidden;
      will-change: transform;
    }

    .endpoint-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: var(--method-color, var(--primary));
      transition: var(--transition);
    }

    .endpoint-card:hover {
      transform: translateY(-4px);
      border-color: var(--border-hover);
      box-shadow: var(--shadow);
    }

    .endpoint-card:hover::before {
      width: 6px;
      box-shadow: 0 0 10px var(--method-color, var(--primary));
    }

    .endpoint-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .endpoint-method {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .method-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      position: relative;
      overflow: hidden;
    }

    .method-badge::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: var(--transition);
    }

    .endpoint-card:hover .method-badge::before {
      left: 100%;
    }

    .method-get {
      background: var(--accent);
      --method-color: var(--accent);
    }
    .method-post {
      background: var(--primary);
      --method-color: var(--primary);
    }
    .method-put {
      background: var(--warning);
      --method-color: var(--warning);
    }
    .method-delete {
      background: var(--danger);
      --method-color: var(--danger);
    }

    .endpoint-path {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1rem;
      color: var(--text-primary);
      font-weight: 500;
    }

    .copy-btn {
      width: 40px;
      height: 40px;
      border-radius: var(--radius);
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: var(--transition);
      font-size: 1rem;
      opacity: 0;
      transform: scale(0.9);
    }

    .endpoint-card:hover .copy-btn {
      opacity: 1;
      transform: scale(1);
    }

    .copy-btn:hover {
      background: var(--primary);
      color: white;
      border-color: var(--primary);
      box-shadow: var(--glow);
    }

    .endpoint-description {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin: 0;
      line-height: 1.5;
    }
    /* OPTIMIZED FOOTER */
    .footer {
      text-align: center;
      padding: 3rem 2rem;
      margin-top: 4rem;
      background: var(--bg-secondary);
      border-top: 1px solid var(--border);
      position: relative;
    }

    .footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg,
        transparent,
        var(--primary),
        var(--secondary),
        var(--accent),
        transparent);
      background-size: 200% 100%;
      animation: border-flow 3s ease-in-out infinite;
    }

    .footer-content {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-bottom: 2rem;
      opacity: 0.8;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .footer-link {
      color: var(--text-secondary);
      text-decoration: none;
      transition: var(--transition);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: var(--radius);
      border: 1px solid transparent;
    }

    .footer-link:hover {
      color: var(--primary);
      border-color: var(--border);
      background: var(--bg-card);
    }

    /* OPTIMIZED RESPONSIVE DESIGN */
    @media (max-width: 1200px) {
      .endpoint-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .control-panel {
        top: 1rem;
        right: 1rem;
        gap: 0.5rem;
      }

      .control-btn {
        width: 45px;
        height: 45px;
        font-size: 1rem;
      }

      .container {
        padding: 1rem;
      }

      .hero {
        padding: 2rem 1rem;
        margin-bottom: 2rem;
      }

      .title {
        font-size: clamp(2.5rem, 10vw, 4rem);
      }

      .subtitle {
        font-size: clamp(1rem, 4vw, 1.5rem);
      }

      .section-title {
        font-size: clamp(1.5rem, 6vw, 2rem);
        gap: 0.75rem;
      }

      .section-icon {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1.1rem;
      }

      .endpoint-card {
        padding: 1.25rem;
      }

      .endpoint-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
      }

      .copy-btn {
        opacity: 1;
        transform: scale(1);
      }

      .footer-links {
        gap: 1rem;
      }
    }

    @media (max-width: 480px) {
      .endpoint-method {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .method-badge {
        font-size: 0.7rem;
        padding: 0.3rem 0.6rem;
      }

      .endpoint-path {
        font-size: 0.9rem;
        word-break: break-all;
      }

      .status-badge {
        padding: 0.6rem 1.2rem;
        font-size: 0.8rem;
      }

      .footer-links {
        flex-direction: column;
        gap: 0.75rem;
      }
    }
  </style>
</head>
<body>
  <!-- CONTROL PANEL -->
  <div class="control-panel">
    <div class="control-btn" onclick="toggleTheme()" title="Toggle Theme">
      <i class="fas fa-moon"></i>
    </div>
    <div class="control-btn" onclick="toggleAnimations()" title="Toggle Animations">
      <i class="fas fa-sliders-h"></i>
    </div>
  </div>

  <div class="container">
    <!-- HERO SECTION -->
    <section class="hero">
      <h1 class="title">Todo API</h1>
      <p class="subtitle">Modern REST API for Todo Management</p>
      <div class="status-badge">
        <div class="status-dot"></div>
        Server Online
      </div>
    </section>

    <!-- AUTHENTICATION SECTION -->
    <section class="section">
      <h2 class="section-title">
        <div class="section-icon">
          <i class="fas fa-shield-alt"></i>
        </div>
        Authentication
      </h2>
      <div class="endpoint-grid">
        <div class="endpoint-card method-post" onclick="copyEndpoint('/api/v1/auth/register')">
          <div class="endpoint-header">
            <div class="endpoint-method">
              <span class="method-badge method-post">POST</span>
              <span class="endpoint-path">/api/v1/auth/register</span>
            </div>
            <div class="copy-btn" title="Copy endpoint">
              <i class="fas fa-copy"></i>
            </div>
          </div>
          <p class="endpoint-description">Register a new user account</p>
        </div>

        <div class="endpoint-card method-post" onclick="copyEndpoint('/api/v1/auth/login')">
          <div class="endpoint-header">
            <div class="endpoint-method">
              <span class="method-badge method-post">POST</span>
              <span class="endpoint-path">/api/v1/auth/login</span>
            </div>
            <div class="copy-btn" title="Copy endpoint">
              <i class="fas fa-copy"></i>
            </div>
          </div>
          <p class="endpoint-description">Authenticate user and receive token</p>
        </div>

        <div class="endpoint-card method-post" onclick="copyEndpoint('/api/v1/auth/logout')">
          <div class="endpoint-header">
            <div class="endpoint-method">
              <span class="method-badge method-post">POST</span>
              <span class="endpoint-path">/api/v1/auth/logout</span>
            </div>
            <div class="copy-btn" title="Copy endpoint">
              <i class="fas fa-copy"></i>
            </div>
          </div>
          <p class="endpoint-description">Logout user and invalidate session</p>
        </div>

        <div class="endpoint-card method-post" onclick="copyEndpoint('/api/v1/auth/forgot-password')">
          <div class="endpoint-header">
            <div class="endpoint-method">
              <span class="method-badge method-post">POST</span>
              <span class="endpoint-path">/api/v1/auth/forgot-password</span>
            </div>
            <div class="copy-btn" title="Copy endpoint">
              <i class="fas fa-copy"></i>
            </div>
          </div>
          <p class="endpoint-description">Request password reset email</p>
        </div>

        <div class="endpoint-card method-post" onclick="copyEndpoint('/api/v1/auth/reset-password')">
          <div class="endpoint-header">
            <div class="endpoint-method">
              <span class="method-badge method-post">POST</span>
              <span class="endpoint-path">/api/v1/auth/reset-password</span>
            </div>
            <div class="copy-btn" title="Copy endpoint">
              <i class="fas fa-copy"></i>
            </div>
          </div>
          <p class="endpoint-description">Reset password with token</p>
        </div>

        <div class="endpoint-card method-post" onclick="copyEndpoint('/api/v1/auth/verify-email')">
          <div class="endpoint-header">
            <div class="endpoint-method">
              <span class="method-badge method-post">POST</span>
              <span class="endpoint-path">/api/v1/auth/verify-email</span>
            </div>
            <div class="copy-btn" title="Copy endpoint">
              <i class="fas fa-copy"></i>
            </div>
          </div>
          <p class="endpoint-description">Verify user email address</p>
        </div>
      </div>
    </section>

    <!-- TODO MANAGEMENT SECTION -->
    <section class="section">
      <h2 class="section-title">
        <div class="section-icon">
          <i class="fas fa-tasks"></i>
        </div>
        Todo Management
      </h2>
      <div class="endpoint-grid">
        <div class="endpoint-card method-get" onclick="copyEndpoint('/api/v1/todos')">
          <div class="endpoint-header">
            <div class="endpoint-method">
              <span class="method-badge method-get">GET</span>
              <span class="endpoint-path">/api/v1/todos</span>
            </div>
            <div class="copy-btn" title="Copy endpoint">
              <i class="fas fa-copy"></i>
            </div>
          </div>
          <p class="endpoint-description">Retrieve all todos for user</p>
        </div>

        <div class="endpoint-card method-post" onclick="copyEndpoint('/api/v1/todos')">
          <div class="endpoint-header">
            <div class="endpoint-method">
              <span class="method-badge method-post">POST</span>
              <span class="endpoint-path">/api/v1/todos</span>
            </div>
            <div class="copy-btn" title="Copy endpoint">
              <i class="fas fa-copy"></i>
            </div>
          </div>
          <p class="endpoint-description">Create a new todo item</p>
        </div>

        <div class="endpoint-card method-put" onclick="copyEndpoint('/api/v1/todos/:id')">
          <div class="endpoint-header">
            <div class="endpoint-method">
              <span class="method-badge method-put">PUT</span>
              <span class="endpoint-path">/api/v1/todos/:id</span>
            </div>
            <div class="copy-btn" title="Copy endpoint">
              <i class="fas fa-copy"></i>
            </div>
          </div>
          <p class="endpoint-description">Update an existing todo</p>
        </div>

        <div class="endpoint-card method-delete" onclick="copyEndpoint('/api/v1/todos/:id')">
          <div class="endpoint-header">
            <div class="endpoint-method">
              <span class="method-badge method-delete">DELETE</span>
              <span class="endpoint-path">/api/v1/todos/:id</span>
            </div>
            <div class="copy-btn" title="Copy endpoint">
              <i class="fas fa-copy"></i>
            </div>
          </div>
          <p class="endpoint-description">Delete a todo permanently</p>
        </div>
      </div>
    </section>
  </div>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-content">
      &copy; ${year} Todo API Documentation
    </div>
    <div class="footer-links">
      <a href="https://github.com/" target="_blank" rel="noopener" class="footer-link">
        <i class="fab fa-github"></i>
        GitHub
      </a>
      <a href="#" class="footer-link">
        <i class="fas fa-book"></i>
        Documentation
      </a>
      <a href="#" class="footer-link">
        <i class="fas fa-life-ring"></i>
        Support
      </a>
    </div>
  </footer>

  <script>
    // OPTIMIZED VARIABLES
    let animationsEnabled = true;
    let isDarkTheme = true;

    // OPTIMIZED COPY FUNCTION
    function copyEndpoint(text) {
      navigator.clipboard.writeText(text).then(() => {
        showNotification('Endpoint copied to clipboard!');
      }).catch(() => {
        showNotification('Failed to copy endpoint');
      });
    }

    // LIGHTWEIGHT NOTIFICATION SYSTEM
    function showNotification(message) {
      const notification = document.createElement('div');
      notification.textContent = message;
      notification.style.cssText = \`
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: var(--primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        font-size: 0.9rem;
        font-weight: 500;
        z-index: 10000;
        box-shadow: var(--shadow);
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
      \`;

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }

    // THEME TOGGLE
    function toggleTheme() {
      isDarkTheme = !isDarkTheme;
      const root = document.documentElement;

      if (isDarkTheme) {
        root.style.setProperty('--bg-primary', '#0a0a0f');
        root.style.setProperty('--bg-secondary', '#151520');
        root.style.setProperty('--bg-card', '#0f0f1a');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#b4b4c8');
      } else {
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#f8fafc');
        root.style.setProperty('--bg-card', '#ffffff');
        root.style.setProperty('--text-primary', '#1a1a2e');
        root.style.setProperty('--text-secondary', '#64748b');
      }

      localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
      showNotification(\`Switched to \${isDarkTheme ? 'dark' : 'light'} theme\`);
    }

    // ANIMATION TOGGLE
    function toggleAnimations() {
      animationsEnabled = !animationsEnabled;
      const root = document.documentElement;

      if (animationsEnabled) {
        root.style.setProperty('--transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)');
        root.style.setProperty('--transition-fast', 'all 0.15s ease-out');
      } else {
        root.style.setProperty('--transition', 'none');
        root.style.setProperty('--transition-fast', 'none');
      }

      localStorage.setItem('animations', animationsEnabled ? 'enabled' : 'disabled');
      showNotification(\`Animations \${animationsEnabled ? 'enabled' : 'disabled'}\`);
    }

    // OPTIMIZED INITIALIZATION
    document.addEventListener('DOMContentLoaded', () => {
      // Load saved preferences
      const savedTheme = localStorage.getItem('theme');
      const savedAnimations = localStorage.getItem('animations');

      if (savedTheme === 'light') {
        isDarkTheme = false;
        toggleTheme();
      }

      if (savedAnimations === 'disabled') {
        animationsEnabled = false;
        toggleAnimations();
      }

      // Add optimized animations
      const style = document.createElement('style');
      style.textContent = \`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideOutRight {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100%);
          }
        }
      \`;
      document.head.appendChild(style);

      // Startup notification
      setTimeout(() => {
        showNotification('Nexus API Portal initialized');
      }, 500);
    });

    // PERFORMANCE OPTIMIZATION
    // Use passive event listeners for better performance
    document.addEventListener('scroll', () => {
      // Throttled scroll handler if needed
    }, { passive: true });

    // Optimize resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Handle resize if needed
      }, 250);
    });
  </script>
</body>
</html>
`;
export { homeContent };