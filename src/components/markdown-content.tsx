import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { cn } from '@/lib/utils';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={cn("prose prose-invert max-w-none", className)}>
      <ReactMarkdown 
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({node, ...props}) => <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />,
          h2: ({node, ...props}) => <h3 className="text-2xl font-bold mt-6 mb-3" {...props} />,
          h3: ({node, ...props}) => <h4 className="text-xl font-semibold mt-4 mb-2" {...props} />,
          a: ({node, ...props}) => <a className="text-primary underline underline-offset-4 hover:text-primary/80" target="_blank" rel="noopener noreferrer" {...props} />,
          code: ({node, className, children, ...props}) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !String(children).includes('\n');
            return isInline ? (
              <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm" {...props}>
                {children}
              </code>
            ) : (
              <div className="relative my-4 overflow-hidden rounded-lg bg-muted p-4">
                 <code className={cn("font-mono text-sm block overflow-x-auto", className)} {...props}>
                  {children}
                </code>
              </div>
            );
          },
          pre: ({node, ...props}) => <pre className="bg-transparent p-0 m-0" {...props} />,
          img: ({node, ...props}) => <img className="max-w-full h-auto rounded-lg border border-border/50" {...props} />,
          table: ({node, ...props}) => <div className="my-6 w-full overflow-y-auto"><table className="w-full text-left text-sm" {...props} /></div>,
          th: ({node, ...props}) => <th className="border-b px-4 py-2 font-medium" {...props} />,
          td: ({node, ...props}) => <td className="border-b px-4 py-2" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
