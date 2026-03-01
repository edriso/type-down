export default function Header({ darkMode, onToggleDarkMode }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-bold tracking-tight">
        <span className="text-indigo-600 dark:text-indigo-400">Type</span>
        <span className="text-gray-400">-</span>
        <span>Down</span>
      </h1>
      <button
        onClick={onToggleDarkMode}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
        aria-label="Toggle dark mode"
      >
        {darkMode ? '☀ Light' : '● Dark'}
      </button>
    </header>
  )
}
