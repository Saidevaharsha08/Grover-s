import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  inline?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, inline = true, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: !inline,
        throwOnError: false,
      });
    } catch {
      return math;
    }
  }, [math, inline]);

  return (
    <span
      className={`katex-render ${inline ? 'inline-block align-baseline mx-0.5' : 'block my-2 text-center'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
