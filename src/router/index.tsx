import {
    createBrowserRouter,
} from "react-router-dom";
import LayoutPage from "../page/Layout";
import Home from "../page/Home";
import Role from "../page/Role";
import Salary from "../page/Salary";
import Permission from "../page/Permission";
import Approval from "../page/Approval";
import Social from "../page/Social";
import Attendance from "../page/Attendance";
import Organization from "../page/Organization";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/permission",
                element: <Permission />,
            },
            {
                path: "/approval",
                element: <Approval />,
            },
            {
                path: "/organization",
                element: <Organization />,
            },
            {
                path: "/social",
                element: <Social />,
            },
            {
                path: "/attendance",
                element: <Attendance />,
            },
            {
                path: "/role",
                element: <Role />,
            },
            {
                path: "/salary",
                element: <Salary />,
            },
        ],
    },
])

export default router