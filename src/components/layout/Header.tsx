"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { navigation } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { Container } from "./Container";

export function Header() {
  const [menu, setMenu] = useState({ isOpen: false, openedOnPathname: "" });
  const pathname = usePathname();

  const isMenuOpen = menu.isOpen && menu.openedOnPathname === pathname;

  const toggleMenu = () => {
    setMenu((prev) => {
      const currentlyOpen = prev.isOpen && prev.openedOnPathname === pathname;
      return { isOpen: !currentlyOpen, openedOnPathname: pathname };
    });
  };

  const closeMenu = () => {
    setMenu({ isOpen: false, openedOnPathname: pathname });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-primary/5",
      )}
    >
      <Container>
        <nav className="flex items-center justify-between py-6">
          <Logo variant="dark" />

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-10">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-bold uppercase tracking-widest transition-colors",
                    pathname === item.href
                      ? "text-primary"
                      : "text-primary/70 hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button href="/contact" size="md">
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-primary"
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? "close" : "menu"} size="lg" />
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/5">
            <ul className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block text-base font-bold uppercase tracking-wider transition-colors",
                      pathname === item.href
                        ? "text-primary"
                        : "text-primary/70 hover:text-primary",
                    )}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  href="/contact"
                  size="sm"
                  className="w-full"
                  onClick={closeMenu}
                >
                  Contact
                </Button>
              </li>
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}
