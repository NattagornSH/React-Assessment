import { useState, useEffect } from "react";
import MembersTable from "./MembersTable";

function UserSection() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch(
        "https://67eca027aa794fb3222e43e2.mockapi.io/members",
      );
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-slate-600">Loading members...</div>
    );
  }

  return (
    <div>
      <MembersTable members={members} showActions={false} />
    </div>
  );
}

export default UserSection;
