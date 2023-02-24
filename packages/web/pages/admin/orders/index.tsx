import React from "react";
import { GetServerSidePropsContext } from "next";

import AdminLayout from "@/views/admin/AdminLayout";

import Box from "@mui/material/Box";

import { allOrders } from "@/services/gql";
import { Order, Product } from "@ap-monorepo/api/src/graphql";
import { OrdersCard } from "@/views/admin/orders/OrdersCard";
import { apolloClient } from "@/services/apolloClient";
import { Typography } from "@/../ui/src";

type OrdersPageProps = {
    orders: Order[];
};

export default function Orders(props: OrdersPageProps) {
    const { orders } = props;
    return (
        <AdminLayout>
            {orders &&
                orders.map((order) => (
                    <Box key={order.id}>
                        <Typography>Order ID: {order.id}</Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 1,
                            }}
                        >
                            {JSON.parse(order.products)?.map(
                                (item: Product) => (
                                    <OrdersCard
                                        key={item.id}
                                        image={item.image}
                                        name={item.name}
                                        CardProps={{ mb: 1 }}
                                    />
                                )
                            )}
                        </Box>
                    </Box>
                ))}
        </AdminLayout>
    );
}

export const getServerSideProps = async ({
    req,
}: GetServerSidePropsContext) => {
    const client = apolloClient({ req, ssrMode: true });
    const orders = (await allOrders(client)).data.fetchOrders;
    console.log(orders);
    return {
        props: {
            orders,
        },
    };
};
