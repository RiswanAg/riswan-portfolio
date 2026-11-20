export type PortfolioTab = "projects" | "certificates" | "awards";

export const PORTFOLIO_TAB_EVENT = "portfolio:tab";

/** Lets other sections (the folder cards) open a tab and scroll to it. */
export function selectPortfolioTab(tab: PortfolioTab) {
  window.dispatchEvent(new CustomEvent<PortfolioTab>(PORTFOLIO_TAB_EVENT, { detail: tab }));
  document.getElementById("portfolio-showcase")?.scrollIntoView({ block: "start" });
}
