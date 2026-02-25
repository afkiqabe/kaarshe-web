export function WpHtml({ html }: { html: string }) {
  return (
    <div
      className="space-y-6 text-primary/70 leading-relaxed [&_a]:text-accent-burgundy [&_a]:font-bold hover:[&_a]:underline [&_h1]:text-primary [&_h1]:font-black [&_h2]:text-primary [&_h2]:font-bold [&_h3]:text-primary [&_h3]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_strong]:text-primary [&_blockquote]:border-l-4 [&_blockquote]:border-accent-burgundy/30 [&_blockquote]:pl-4 [&_blockquote]:text-primary/70"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
