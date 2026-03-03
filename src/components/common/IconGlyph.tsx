import {
  Bell,
  CircleHelp,
  CircleUserRound,
  EllipsisVertical,
  HandCoins,
  Home,
  HousePlus,
  Landmark,
  LayoutTemplate,
  Link,
  ListCheck,
  ListFilter,
  Search,
  Settings,
  ShieldCheck,
  ShieldPlus,
  Share2,
  UserRound,
  X,
  ArrowRight,
  Info,
  type LucideProps,
} from 'lucide-react'

const iconMap = {
  Home,
  Share2,
  ListFilter,
  ListCheck,
  UserRound,
  Search,
  EllipsisVertical,
  Link,
  HandCoins,
  X,
  LayoutTemplate,
  ShieldPlus,
  ShieldCheck,
  Landmark,
  Bell,
  CircleHelp,
  Settings,
  HousePlus,
  CircleUserRound,
  ArrowRight,
  Info,
}

interface Props extends LucideProps {
  name: keyof typeof iconMap
}

export function IconGlyph({ name, ...props }: Props) {
  const Cmp = iconMap[name]
  return <Cmp {...props} />
}
