import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import React, { useMemo } from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  // 预先从 content 中提取所有标题，生成确定性的 id 列表
  const headingIds = useMemo(() => {
    const ids: string[] = [];
    const idCounter = new Map<string, number>();
    const lines = content.split('\n');

    lines.forEach((line) => {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const text = match[2]
          .replace(/\*\*(.+?)\*\*/g, '$1') // 粗体
          .replace(/\*(.+?)\*/g, '$1') // 斜体
          .replace(/`(.+?)`/g, '$1') // 行内代码
          .replace(/\[(.+?)\]\(.+?\)/g, '$1') // 链接
          .trim();
        
        const baseId = text.toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-');
        
        // 确保 id 唯一性
        let id = baseId;
        if (idCounter.has(baseId)) {
          const count = idCounter.get(baseId)! + 1;
          idCounter.set(baseId, count);
          id = `${baseId}-${count}`;
        } else {
          idCounter.set(baseId, 0);
        }
        
        ids.push(id);
      }
    });

    return ids;
  }, [content]);

  // 使用闭包创建组件函数，每个组件实例都有自己的索引计数器
  let headingIndex = 0;
  
  const createHeadingComponent = (Tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', className: string) => {
    const Component = (props: React.ComponentPropsWithoutRef<typeof Tag>) => {
      const id = headingIds[headingIndex] || `heading-${headingIndex}`;
      headingIndex++;
      return React.createElement(Tag, { ...props, id, className }, props.children);
    };
    Component.displayName = Tag.toUpperCase();
    return Component;
  };

  return (
    <div className={`prose prose-sm max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
        components={{
          // 自定义组件样式
          h1: createHeadingComponent('h1', 'text-2xl font-bold mb-4 mt-6 text-gray-900 dark:text-gray-100 scroll-mt-20'),
          h2: createHeadingComponent('h2', 'text-xl font-semibold mb-3 mt-5 text-gray-800 dark:text-gray-200 scroll-mt-20'),
          h3: createHeadingComponent('h3', 'text-lg font-medium mb-2 mt-4 text-gray-700 dark:text-gray-300 scroll-mt-20'),
          h4: createHeadingComponent('h4', 'text-base font-medium mb-2 mt-3 text-gray-700 dark:text-gray-300 scroll-mt-20'),
          h5: createHeadingComponent('h5', 'text-sm font-medium mb-1 mt-2 text-gray-700 dark:text-gray-300 scroll-mt-20'),
          h6: createHeadingComponent('h6', 'text-sm font-medium mb-1 mt-2 text-gray-700 dark:text-gray-300 scroll-mt-20'),
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
            // 代码块会被 rehype-highlight 处理，className 包含语言信息
            return (
              <code className={`hljs ${className || ''}`}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="rounded mb-3 overflow-x-auto">
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