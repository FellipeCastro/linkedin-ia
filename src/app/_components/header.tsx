"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Header() {
    return (
        <header className="h-16 border-b border-gray-200 bg-white">
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                    <Sparkles className="h-6 w-6" />
                    <span className="font-bold text-xl">Linkedin IA</span>
                </Link>

                <nav className="flex items-center gap-8">
                    <Link
                        href="#como-funciona"
                        className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        Como funciona
                    </Link>
                    <Link
                        href="#exemplos"
                        className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        Exemplos
                    </Link>
                </nav>
            </div>
        </header>
    );
}
