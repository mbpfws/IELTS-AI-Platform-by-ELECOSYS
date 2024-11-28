"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="flex h-14 items-center px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-8 flex-1">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-semibold text-lg">IELTS AI Platform</span>
            <span className="text-xs text-slate-500">by ELECOSYS</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="/agents/writing">
              <Button variant="ghost" className="text-sm">Writing Agent</Button>
            </Link>
            <Link href="/agents/speaking">
              <Button variant="ghost" className="text-sm">Speaking Agent</Button>
            </Link>
            <Link href="/agents/create">
              <Button variant="ghost" className="text-sm">Create Agent</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
