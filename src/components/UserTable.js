import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const UserTable = ({ users }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>Password</TableCell>
          <TableCell>Mobile Number</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={index}>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.password}</TableCell>
            <TableCell>{user.mobileNumber}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
