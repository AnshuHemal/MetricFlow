import React from "react";

type Props = {
  label: string;
  value: string | undefined | number;
};

const LabelCountItem = ({ label, value }: Props) => {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-600">
        {label}
      </p>
      <p className="text-2xl font-bold text-gray-900">
        {value?.toLocaleString() || 0}
      </p>
    </div>
  );
};

export default LabelCountItem;
