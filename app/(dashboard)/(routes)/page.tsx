"use client";
import privateClient from "@/api/config/private.client";
import publicClient from "@/api/config/public.client";
import Loading from "@/components/Loading";
import Overview from "@/components/Overview";
import Heading from "@/components/ui/Heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { priceFormat } from "@/lib/utils";
import { CreditCard, Package } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
interface ErrorAuthori {
  data: {
    statusCode: number;
    message: string;
  };
}
const DashboardPage = () => {
  const [orders, setOrders] = useState<any>();
  const [authori, setAuthori] = useState<any>();
  const [userList, setUserList] = useState<any>();
  const [products, setProducts] = useState<any>();
  const [isUser, setIsUser] = useState<any>(false);
  const [loadingFetchData, setLoadingFetchData] = useState<Boolean>(false);
  const [total, setTotal] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const OrderData = await privateClient("order/order-list");
        const UserData = await privateClient("user/get-user-list");
        const ProductData = await publicClient("product/product-list");
        

        setOrders(OrderData?.data?.content);
        setAuthori(OrderData?.data);
        setUserList(UserData?.data?.content);
        setProducts(ProductData?.data?.content);

        setLoadingFetchData(false);
      } catch (error) {
        toast.error((error as ErrorAuthori).data?.message);
        setLoadingFetchData(false);
        // if (
        //   (error as ErrorAuthori).data?.statusCode === 401 &&
        //   (error as ErrorAuthori).data?.message === "Unauthorized"
        // ) {
        //   const handleSignOut = () => {
        //     if (typeof window !== "undefined") {
        //       localStorage.removeItem("user");
        //     }
        //     router.push("/sign-in");
        //   };
        //   handleSignOut();
        // }
      }
    };
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        if (userData.role) {
          setIsUser(true);
          setLoadingFetchData(true);
          setTimeout(() => {
            fetchData();
          }, 1500);
        }
      } else {
        redirect("/sign-in");
      }
    }
  }, [router]);
  useEffect(() => {
    if (!orders || !userList || !products) return;

    const totalRevenue = orders.reduce(
      (acc: number, order: any) => acc + order.total,
      0
    );
    setTotal(totalRevenue);
  }, [orders, userList, products]);

  // Conditional rendering based on data and loading state
  if (loadingFetchData) {
    return <Loading />;
  }
  return (
    <div>
      {loadingFetchData && <Loading />}
      {isUser && (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <Heading title="Dashboard" description="Overview of your store" />
            <Separator />
            <div className="grid gap-4 grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm lg:text-2xl font-bold">
                    {priceFormat.format(total)}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Number of orders
                  </CardTitle>
                  <CreditCard className="text-muted-foreground w-4 h-4" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm lg:text-2xl font-bold">
                    {orders?.length}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Products In stock
                  </CardTitle>
                  <Package className="text-muted-foreground w-4 h-4" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm lg:text-2xl font-bold">
                    {products?.length}
                  </p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview data={orders} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
