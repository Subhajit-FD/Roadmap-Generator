import { cn } from "@/lib/utils";
import React from "react";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { Button, buttonVariants } from "@/components/ui/button";
import { XIcon, ListIcon } from "@phosphor-icons/react";
import { useAppSelector, useAppDispatch } from "@/redux/redux-hooks";
import { Link } from "react-router-dom";
import { logoutUser } from "@/redux/features/authentication/authenticationSlice";

export function MobileNav() {
	const [open, setOpen] = React.useState(false);
	const navLinks = useAppSelector((state) => state.navlinks);
	const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(logoutUser());
		setOpen(false); // Close menu after logout
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
					<PortalBackdrop />
					<div
						className={cn(
							"data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
							"size-full p-4"
						)}
						data-slot={open ? "open" : "closed"}
					>
						<div className="grid gap-y-2">
							{navLinks.map((link) => (
								<Button
									asChild
									className="justify-start"
									key={link.label}
									variant="ghost"
								>
									<a href={link.href}>{link.label}</a>
								</Button>
							))}
						</div>
						<div className="mt-12 flex flex-col gap-2">
							{isAuthenticated ? (
								<Button variant="outline" className="w-full" onClick={handleLogout}>
									Logout
								</Button>
							) : (
								<Link className={buttonVariants({ variant: "outline", className: "w-full" })} to="/sign-in" onClick={() => setOpen(false)}>
									Sign In
								</Link>
							)}
							<Button className="w-full">Get Started</Button>
						</div>
					</div>
				</Portal>
			)}
		</div>
	);
}
