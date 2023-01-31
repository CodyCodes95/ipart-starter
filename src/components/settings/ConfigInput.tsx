import React from "react";

type ConfigInputProps = {
  label: string;
  children: React.ReactNode;
}

const ConfigInput:React.FC<ConfigInputProps> = ({ label, children }) => {
  return (
    <div className="PanelField Left">
      <div style={{ display: "inline" }}>
        <label>{label}</label>
      </div>

      <div className="PanelFieldValue InputXLargeWrapper">{children}</div>
    </div>
  );
};

export default ConfigInput;
