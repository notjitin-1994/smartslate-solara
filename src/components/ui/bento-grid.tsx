import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className?: string
  background?: ReactNode
  Icon: React.ElementType
  description: string
  href?: string
  cta?: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-[24px]",
      "bg-[rgba(13,27,42,0.4)] backdrop-blur-[30px]",
      "[border:1px_solid_rgba(167,218,219,0.1)]",
      "transform-gpu transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
      "hover:[border:1px_solid_rgba(167,218,219,0.4)] hover:[box-shadow:0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 z-0">{background}</div>
    <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 transition-all duration-300">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[16px] bg-[rgba(167,218,219,0.15)] border border-[rgba(167,218,219,0.3)] text-[#a7dadb]">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">
        {name}
      </h3>
      <p className="max-w-lg text-[#b0c5c6] text-sm leading-relaxed">{description}</p>
    </div>

    {href && cta && (
      <div className="pointer-events-none absolute bottom-0 z-20 flex w-full flex-row items-center p-6 opacity-0 transition-all duration-300 group-hover:opacity-100">
        <a href={href} className="pointer-events-auto flex items-center gap-2 text-[#a7dadb] font-bold text-sm hover:underline">
          {cta}
          <ArrowRight size={16} />
        </a>
      </div>
    )}

    <div className="pointer-events-none absolute inset-0 z-0 transform-gpu transition-all duration-300 group-hover:bg-[#020C1B]/10" />
  </div>
)

export { BentoCard, BentoGrid }
