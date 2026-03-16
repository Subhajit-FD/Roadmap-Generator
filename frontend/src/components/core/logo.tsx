import { cn } from "@/lib/utils";

export function Logo({className}:{className?: string}) {
	return (
		<div className="flex items-center gap-2">
			<div className={cn("size-3 rounded-full bg-primary", className)} />
			<span className="text-lg font-semibold">Reset</span>
		</div>
	);
}
