// import basicSetup from "../wallet-setup/wallet-setup";
// import { testWithSynpress } from "@synthetixio/synpress";
// import { MetaMask, metaMaskFixtures } from "@synthetixio/synpress/playwright";

// const test = testWithSynpress(metaMaskFixtures(basicSetup));
// const { expect } = test;

import {test,expect} from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/TSender/);
});

// test("should show the airdrop form if Connected, else not", async ({
//   page,
//   context,
//   metamaskPage,
//   extensionId,
// }) => {
//   await page.goto("/");
//   await expect(page.getByText("Connect Wallet")).toBeVisible();

//   const metaMask = new MetaMask(
//     context,
//     metamaskPage,
//     basicSetup.walletPassword,
//     extensionId
//   );
//   await page.getByTestId("rk-connect-button").click();
//   await page
//     .getByTestId("rk-wallet-option-metaMask")
//     .waitFor({ state: "visible", timeout: 30000 });
//   await page.getByTestId("rk-wallet-option-metaMask").click();
//   await metaMask.connectToDapp();

//   const customNetwork = {
//     symbol: "ETH",
//     name:"Anvil",
//     rpcUrl: "http://localhost:8545",
//     chainId: 31337,
    
//   }

//   await metaMask.addNetwork(customNetwork);

//   await expect(page.getByText("Token Address")).toBeVisible();
// });
