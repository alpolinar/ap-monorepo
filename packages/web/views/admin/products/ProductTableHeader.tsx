import React from "react";

import { TableHead, TableRow, TableCell } from "@mui/material";

type TableHeaderProps = {
    headers: string[];
};

export default function ProductTableHeader({ headers }: TableHeaderProps) {
    return (
        <TableHead>
            <TableRow>
                {headers &&
                    headers.map((header) => (
                        <TableCell key={header}>{header}</TableCell>
                    ))}
            </TableRow>
        </TableHead>
    );
}
