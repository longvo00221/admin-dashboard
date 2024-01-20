import Navbar from "@/components/Navbar";
interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {


  return (
  <>
    <Navbar/>
    {children}
  </>);
}
