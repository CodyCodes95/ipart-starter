import { Loader2 } from "lucide-react";
import React, { FC } from "react";
import { cn } from "../utils/classNames";

type LoaderProps = {
  className?: string;
};

const Loader: FC<LoaderProps> = ({ className }) => {
  return <Loader2 className={cn("animate-spin", className)} />;
};

export default Loader;
