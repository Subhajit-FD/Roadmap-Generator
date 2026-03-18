"use client";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/core/logo";
import { useScroll } from "@/hooks/use-scroll";
import { Button, buttonVariants } from "@/components/ui/button";
import { MobileNav } from "@/components/core/mobile-nav";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export function Header() {
	const scrolled = useScroll(10);
	const { user, handleLogout } = useAuth();
	const navLinks = [{
		label: "Features",
		href: "/features",
	},{
		label: "Pricing",
		href: "/pricing",
	}];

	return (
		<header
			className={cn(
				"sticky top-0 z-50 mx-auto w-full max-w-5xl border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
				{
					"border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-3xl md:shadow":
						scrolled,
				}
			)}
		>
			<nav
				className={cn(
					"flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
					{
						"md:px-2": scrolled,
					}
				)}
			>
				<Link
					className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50"
					to="/"
				>
					<Logo />
				</Link>
				<div className="hidden items-center gap-2 md:flex">
					<div>
						{navLinks.map((link) => (
							<a 
								key={link.label} 
								className={buttonVariants({ variant: "ghost", size: "sm" })} 
								href={link.href}
							>
								{link.label}
							</a>
						))}
					</div>
					{user ? (
						<div className="flex items-center gap-4">
							<Link to="/dashboard" className={buttonVariants({ variant: "ghost", size: "sm" })} >
								Dashboard
							</Link>
							{user.unlimitedExpiresAt && new Date(user.unlimitedExpiresAt) > new Date() ? (
								<div className={buttonVariants({ variant: "outline", size: "sm" })}>
									<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
									Unlimited
								</div>
							) : (
								<div className={buttonVariants({ variant: "outline", size: "sm" })}>
									<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
									Tokens: {user.tokens ?? 0}
								</div>
							)}
							<Button variant="outline" size="sm" onClick={handleLogout}>
								Logout
							</Button>
						</div>
					) : (
						<Link className={buttonVariants({ variant: "outline", size: "sm" })} to="/sign-in">
							Sign In
						</Link>
					)}
					<Link to="/get-started" className={buttonVariants({size: "sm"})}>Get Started</Link>
					<AnimatedThemeToggler />
				</div>
				<MobileNav />
			</nav>
		</header>
	);
}
