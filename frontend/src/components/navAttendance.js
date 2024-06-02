import {
  FaHistory,
  FaClipboardList,
  FaCalendarPlus,
  FaClipboardCheck,
  FaUserCog,
} from "react-icons/fa";

export const navAttendance = [
  {
    to: "/attendance",
    icon: <FaHistory className="mr-2" />,
    label: "Attendance History",
  },
  {
    to: "/attendance/record-attendance",
    icon: <FaClipboardList className="mr-2" />,
    label: "Record Attendance",
  },
  {
    to: "/attendance/apply-leave",
    icon: <FaCalendarPlus className="mr-2" />,
    label: "Apply For Leave",
  },
  {
    to: "/attendance/leave-history",
    icon: <FaClipboardCheck className="mr-2" />,
    label: "Leave History",
  },
];
