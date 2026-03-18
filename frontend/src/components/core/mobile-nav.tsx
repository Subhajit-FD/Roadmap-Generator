import { cn } from "@/lib/utils";
import React from "react";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { Button, buttonVariants } from "@/components/ui/button";
import { XIcon, ListIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function MobileNav() {
	const { user, handleLogout } = useAuth();
	const [open, setOpen] = React.useState(false);
	const navLinks = [{
		label: "Features",
		href: "/features",
	},{
		label: "Pricing",
		href: "/pricing",
	}];

	const handleLogoutAndClose = async () => {
		try {
			await handleLogout();
		} catch {
			// ignore
		}
		setOpen(false);
	};

	return (
		<div className="md:hidden">
			<Button
				aria-controls="mobile-menu"
				aria-expanded={open}
				aria-label="Toggle menu"
				className="md:hidden"
				onClick={() => setOpen(!open)}
				size="icon"
				variant="outline"
			>
				{open ? (
					<XIcon className="size-4.5" />
				) : (
					<ListIcon className="size-4.5" />
				)}
			</Button>
			{open && (
				<Portal className="top-14" id="mobile-menu">
					<PortalBackdrop onClick={() => setOpen(false)} />
					<div
						className={cn(
							"data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
							"size-full p-4 flex flex-col bg-background border-b border-border shadow-2xl"
						)}
						data-slot={open ? "open" : "closed"}
					>
						<div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
							<span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">System Theme</span>
							<AnimatedThemeToggler />
						</div>

						<div className="grid gap-y-2">
							{navLinks.map((link) => (
								<Button
									asChild
									className="justify-start uppercase tracking-widest text-[10px] font-bold"
									key={link.label}
									variant="ghost"
									onClick={() => setOpen(false)}
								>
									<Link to={link.href}>{link.label}</Link>
								</Button>
							))}
							{user && (
								<Button
									asChild
									className="justify-start uppercase tracking-widest text-[10px] font-bold"
									variant="ghost"
									onClick={() => setOpen(false)}
								>
									<Link to="/dashboard">Dashboard</Link>
								</Button>
							)}
						</div>

						<div className="mt-auto pb-8 flex flex-col gap-4">
							{user && (
								<div className="flex flex-col gap-2">
									{user.unlimitedExpiresAt && new Date(user.unlimitedExpiresAt) > new Date() ? (
										<div className="flex items-center gap-2 px-4 py-2 border border-border bg-secondary/10 uppercase tracking-widest text-[10px] font-bold">
											<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
											Unlimited Access
										</div>
									) : (
										<div className="flex items-center gap-2 px-4 py-2 border border-border bg-secondary/10 uppercase tracking-widest text-[10px] font-bold">
											<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
											Tokens: {user.tokens ?? 0}
										</div>
									)}
								</div>
							)}

							<div className="grid grid-cols-2 gap-2">
								{user ? (
									<Button variant="outline" className="w-full uppercase tracking-widest text-[10px] font-bold py-6" onClick={handleLogoutAndClose}>
										Logout
									</Button>
								) : (
									<Link 
										className={buttonVariants({ variant: "outline", className: "w-full uppercase tracking-widest text-[10px] font-bold py-6" })} 
										to="/sign-in" 
										onClick={() => setOpen(false)}
									>
										Sign In
									</Link>
								)}
								<Link 
									to="/get-started" 
									className={buttonVariants({ variant: "default", className: "w-full uppercase tracking-widest text-[10px] font-bold py-6" })}
									onClick={() => setOpen(false)}
								>
									Get Started
								</Link>
							</div>
						</div>
					</div>
				</Portal>
			)}
		</div>
	);
}
