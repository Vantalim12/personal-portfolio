import React, { lazy, Suspense } from "react";
import type { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

const fallback = <div style={{ background: "#ddd", width: 24, height: 24 }} />;

interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports;
}

const iconComponents = Object.fromEntries(
  Object.entries(dynamicIconImports).map(([name, importIcon]) => [
    name,
    lazy(importIcon),
  ]),
) as unknown as Record<
  keyof typeof dynamicIconImports,
  React.LazyExoticComponent<React.ComponentType<LucideProps>>
>;

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = iconComponents[name];

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

export default Icon;
