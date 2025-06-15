import React from "react";
import TableQuestion from "../../../../components/dashboard/admin/TableQuestion";
import FormEditQuestion from "../../../../components/dashboard/admin/FormEditQuestion";

const SchoolEnvironment = () => {
  return (
    <div>
      <TableQuestion id={4}>
        <FormEditQuestion />
      </TableQuestion>
    </div>
  );
};

export default SchoolEnvironment;
