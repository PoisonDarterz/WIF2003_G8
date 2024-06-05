const adminNavItems = [
  {
    title: "Admin View",
    link: "/salary/adminview",
  },
  {
    title: "Benefits",
    link: "/salary/benefits",
  },
  {
    title: "Process Salary",
    link: "/salary/process",
  },
  {
    title: "Assign Benefits",
    link: "/salary/assign",
  },
];

const employeeNavItems = [
  {
    title: "View Salary",
    link: "/salary/view",
  },
  {
    title: "Benefits",
    link: "/salary/benefits",
  },
];

const adminHelpdeskNavItems = [
  {
    title: "Resolve Ticket",
    link: "/helpdesk/allEmployeeTickets",
  },
  {
    title: "Review Feedback",
    link: "/helpdesk/reviewFeedback",
  },
];

const employeeHelpdeskNavItems = [
  {
    title: "Review Ticket",
    link: "/helpdesk",
  },
  {
    title: "Feedback",
    link: "/helpdesk/feedback",
  },
];

export const navItems = (role) => [
  {
    title: "HOME",
    link: "/home",
    submenu: [],
  },
  {
    title: "ATTENDANCE",
    link: "/attendance",
    submenu: [],
  },
  {
    title: "SALARY",
    link: role === "Admin" ? "/salary/adminview" : "/salary/view",
    submenu: role === "Admin" ? adminNavItems : employeeNavItems,
  },
  {
    title: "INFORMATION",
    link: "/info/employeeList",
    submenu: [],
  },
  {
    title: "COMMUNITY",
    link: "/community",
    submenu: [],
  },
  {
    title: "HELPDESK",
    link: "/helpdesk",
    submenu:
      role === "Admin" ? adminHelpdeskNavItems : employeeHelpdeskNavItems,
  },
];
