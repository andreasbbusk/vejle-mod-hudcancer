import PageTransition from "@/modules/components/layout/page-transition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
