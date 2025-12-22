import { AnalyticsType } from "@/configs/type";
import React from "react";

type Props = {
  label: string
  value: string | undefined|number
};

const LabelCountItem = ({ label, value }: Props) => {
  return (
    <div>
      <h2>{label}</h2>
      <h2 className="font-bold text-4xl">{value}</h2>
    </div>
  );
};

export default LabelCountItem;
