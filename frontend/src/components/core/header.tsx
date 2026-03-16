"use client";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/core/logo";
import { useScroll } from "@/hooks/use-scroll";
import { Button, buttonVariants } from "@/components/ui/button";
import { MobileNav } from "@/components/core/mobile-nav";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useAppSelector, useAppDispatch } from "@/redux/redux-hooks";
import { Link } from "react-router-dom";
import { logoutUser } from "@/redux/features/authentication/authenticationSlice";


export function Header() {
	const scrolled = useScroll(10);
	const navLinks = useAppSelector((state) => state.navlinks);
	const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(logoutUser());
	};

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
							<Link key={link.label} className={buttonVariants({ variant: "ghost", size: "sm" })} to={link.href}>
								{link.label}
							</Link>
						))}
					</div>
					{isAuthenticated ? (
						<Button variant="outline" size="sm" onClick={handleLogout}>
							Logout
						</Button>
					) : (
						<Link className={buttonVariants({ variant: "outline", size: "sm" })} to="/sign-in">
							Sign In
						</Link>
					)}
					<Button size="sm">Get Started</Button>
					<AnimatedThemeToggler />
				</div>
				<MobileNav />
			</nav>
		</header>
	);
}
