import { FaClipboardList, FaColumns } from "react-icons/fa";

export const navAdmAtt = [
  {
    to: "/attendance/admin",
    icon: <FaClipboardList className="mr-2" />,
    label: "Review Leave",
  },
  {
    to: "/attendance/admin/attendance-history-admin",
    icon: <FaColumns className="mr-2" />,
    label: "Attendance History",
  },
];