"use client";
import privateClient from "@/api/config/private.client";
import { UserColumn } from "@/components/users/Columns";
import UserClient from "@/components/users/client";
import { useEffect, useState } from "react";
interface currUser {
  id_user: number;
}
const UsersPage = () => {
  const [userList, setUserList] = useState<Array<Object>>([]);
  const [currentUser, setCurrentUser] = useState<currUser>();
  useEffect(() => {
    const fetchUserListDataFromApi = async () => {
      try {
        const data = await privateClient.get("user/get-user-list");
        setUserList(data.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserListDataFromApi();
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {

        const userData = JSON.parse(user);
        setCurrentUser(userData.id_user)

      }
    }

  }, [])
  const formattedUser: UserColumn[] = userList.map((user: any, i: number) => ({
    id: user.id_user,
    currUserId: currentUser,
    stt: i + 1,
    name: user.id_user === currentUser ? `${user.name} (current)` : user.name,
    email: user.email,
    birthday: user.birthday,
    address: user.address,
    phone: user.phone,
    role: user.role,
  })).sort((a, b) => (a.name.includes('(current)') ? -1 : b.name.includes('(current)') ? 1 : 0)).map((user, i) => ({ ...user, stt: i + 1 }));;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserClient data={formattedUser} />
      </div>
    </div>
  )
};

export default UsersPage;
