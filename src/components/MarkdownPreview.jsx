import ReactMarkdown from 'react-markdown'

export default function MarkdownPreview({ content }) {
  if (!content) {
    return (
      <div className="text-sm text-gray-400 italic p-4">
        Preview will appear as you type...
      </div>
    )
  }

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none p-4 overflow-auto">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
