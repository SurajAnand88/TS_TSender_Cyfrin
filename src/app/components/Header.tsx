"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { FaGithub } from "react-icons/fa"

export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2">
        <FaGithub className="text-gray-800 text-2xl" />
        <span className="text-xl font-semibold text-black">TSender</span>
      </div>

      <ConnectButton />
    </header>
  )
}
