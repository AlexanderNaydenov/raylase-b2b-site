import type { HTMLAttributes } from "react";

type Props = {
  html: string;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "dangerouslySetInnerHTML">;

export function RichHtml({ html, className = "", ...rest }: Props) {
  return (
    <div
      {...rest}
      className={`rich-html max-w-none text-zinc-400 [&_a]:text-[#00a3e0] [&_a]:underline-offset-2 hover:[&_a]:underline [&_p]:mb-4 [&_p]:leading-relaxed [&_p:last-child]:mb-0 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
