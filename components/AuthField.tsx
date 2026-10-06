import type { ComponentProps } from "react";
import { fieldStyles, labelStyles } from "./fieldStyles";

type AuthFieldProps = Omit<ComponentProps<"input">, "id" | "type"> & {
  id: string;
  label: string;
  type: "email" | "password";
  autoComplete: string;
};

export default function AuthField({ id, label, ...inputProps }: AuthFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelStyles}>
        {label}
      </label>
      <input id={id} name={id} required className={fieldStyles} {...inputProps} />
    </div>
  );
}
