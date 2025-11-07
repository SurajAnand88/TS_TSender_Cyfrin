"use client";

import {getDefaultConfig} from "@rainbow-me/rainbowkit";
import {anvil, mainnet, zksync} from "wagmi/chains";

export default getDefaultConfig({
    appName: "TSender",
    projectId: "b489dab4097835c9497cf3d7eb9686f4",
    chains: [anvil,zksync,mainnet],
    ssr:false
})