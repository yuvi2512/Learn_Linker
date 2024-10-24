import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const Assignment = () => {
  const { data: session } = useSession();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/AssignmentAPI?student_name=${session.user.name}`
      );
      if (response.data) {
        console.log(response.data);
        toast.success("Data fetched successfully!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch Data.");
    }
  };

  useEffect(() => {
    if (session.user.name) fetchData();
  }, [session.user.name]);

  return (
    <>
      <h1>Upcoming Feature!!!!</h1>
    </>
  );
};

export default Assignment;
