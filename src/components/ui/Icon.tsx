import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

type IconsMap = Record<string, React.ComponentType<LucideProps>>;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const IconComponent = (Icons as unknown as IconsMap)[name] ?? Icons.Sparkles;
  return <IconComponent {...props} />;
}
