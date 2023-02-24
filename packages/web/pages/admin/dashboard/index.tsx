import React from "react";

import AdminLayout from "@/views/admin/AdminLayout";

import { useAuthentication } from "@/store/authentication/authentication.hook";
import { Typography } from "@ap-monorepo/ui/src";

export default function Dashboard() {
    const userAuth = useAuthentication();

    return (
        <AdminLayout>
            <Typography variant="h5">
                Wecome back {userAuth.user?.name}
            </Typography>
        </AdminLayout>
    );
}
