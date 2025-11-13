import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { useMemo } from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Helper function to generate unique heading IDs
function generateHeadingId(text: string, usedIds: Set<string>): string {
  const baseId = String(text)
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  let id = baseId;
  let counter = 1;
  while (usedIds.has(id)) {
    id = `${baseId}-${counter}`;
    counter++;
  }
  usedIds.add(id);
  return id;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  // Track used IDs to ensure uniqueness
  const usedIds = useMemo(() => new Set<string>(), [content]);

  return (
    <div className={`prose prose-sm max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          // 自定义组件样式
          h1: ({ children }) => {
            const id = generateHeadingId(String(children), usedIds);
            return <h1 id={id} className="text-2xl font-bold mb-4 mt-6 text-gray-900 dark:text-gray-100 scroll-mt-20">{children}</h1>;
          },
          h2: ({ children }) => {
            const id = generateHeadingId(String(children), usedIds);
            return <h2 id={id} className="text-xl font-semibold mb-3 mt-5 text-gray-800 dark:text-gray-200 scroll-mt-20">{children}</h2>;
          },
          h3: ({ children }) => {
            const id = generateHeadingId(String(children), usedIds);
            return <h3 id={id} className="text-lg font-medium mb-2 mt-4 text-gray-700 dark:text-gray-300 scroll-mt-20">{children}</h3>;
          },
          p: ({ children }) => <p className="mb-3 text-gray-600 dark:text-gray-400 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="mb-3 pl-6 list-disc text-gray-600 dark:text-gray-400">{children}</ul>,
          ol: ({ children }) => <ol className="mb-3 pl-6 list-decimal text-gray-600 dark:text-gray-400">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-400 pl-4 py-2 mb-3 bg-gray-50 dark:bg-gray-800 italic text-gray-700 dark:text-gray-300">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-red-600 dark:text-red-400">
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm font-mono overflow-x-auto">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded mb-3 overflow-x-auto">
              {children}
            </pre>
          ),
          a: ({ children, href }) => (
            <a 
              href={href} 
              className="text-blue-600 dark:text-blue-400 hover:underline" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-3">
              <table className="min-w-full border border-gray-300 dark:border-gray-600">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-left font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 