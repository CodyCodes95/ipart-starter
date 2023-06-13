import { FC } from "react";

type FieldsetProps = {
    children: React.ReactNode;
    label: string;
}

const Fieldset: FC<FieldsetProps> = ({ children, label }) => {
  return (
     <div className="ShowFieldset flex w-full flex-col p-4">
        <fieldset>
              <legend>{label}</legend>
              {children}
          </fieldset>
        </div>
              
  )
}

export default Fieldset