export default function stringify(
  obj: any,
  options?: {
    indent?: string;
    maxDepth?: number;
    showUndefined?: boolean;
    showNull?: boolean;
    leadingComma?: boolean;
  }
): string;
