import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  wide?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Container<T extends ElementType = "div">({
  as,
  wide = false,
  className = "",
  children,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={`${wide ? "max-w-370" : "max-w-7xl"} mx-auto px-[clamp(20px,5vw,64px)] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
