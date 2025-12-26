import React from "react";

type Props = {
  label: string;
  value: string | undefined | number;
};

const LabelCountItem = ({ label, value }: Props) => {
  // Handle different value types and ensure proper display
  const formatValue = (val: string | undefined | number) => {
    if (val === undefined || val === null) return "0";
    
    // If it's already a string (like formatted time), return as is
    if (typeof val === "string") return val;
    
    // If it's a number, format with locale string
    if (typeof val === "number") {
      return val.toLocaleString();
    }
    
    return "0";
  };

  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-600">
        {label}
      </p>
      <p className="text-2xl font-bold text-gray-900">
        {formatValue(value)}
      </p>
    </div>
  );
};

export default LabelCountItem;
