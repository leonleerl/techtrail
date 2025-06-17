import { MarkdownRenderer } from "@/components/ui";

const sampleMarkdown = `# 测试 Markdown 渲染

这是一个 **Markdown** 测试页面，用来验证我们的渲染功能。

## 功能特性

1. **粗体文本**
2. *斜体文本*
3. \`行内代码\`
4. [链接示例](https://example.com)

### 代码块示例

\`\`\`javascript
function hello() {
  console.log("Hello, Markdown!");
}
\`\`\`

### 引用

> 这是一个引用块
> 可以包含多行内容

### 表格

| 功能 | 状态 | 描述 |
|------|------|------|
| 渲染 | ✅ | 正常工作 |
| 编辑 | ✅ | 支持实时预览 |
| 存储 | ✅ | 保存到数据库 |

### 列表

- 无序列表项 1
- 无序列表项 2
  - 嵌套项目
  - 另一个嵌套项目

1. 有序列表项 1
2. 有序列表项 2
3. 有序列表项 3
`;

export default function TestMarkdownPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Markdown 渲染测试</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">原始 Markdown:</h2>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
            {sampleMarkdown}
          </pre>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">渲染结果:</h2>
          <div className="border p-4 rounded-lg bg-white">
            <MarkdownRenderer content={sampleMarkdown} />
          </div>
        </div>
      </div>
    </div>
  );
} 