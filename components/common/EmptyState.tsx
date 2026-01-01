import Link from "next/link";
import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  actionOnClick?: () => void;
}

const EmptyState = ({
  icon,
  title,
  description,
  actionText,
  actionLink,
  actionOnClick,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}

      <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{description}</p>

      {actionText && actionLink && (
        <Link
          href={actionLink}
          className="px-6 py-2 bg-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          {actionText}
        </Link>
      )}

      {actionText && actionOnClick && (
        <button
          onClick={actionOnClick}
          className="px-6 py-2 bg-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
