import React from "react";
import CategoriesTable from "../../_components/CategoriesTable";

const page = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
        <p className="text-sm text-muted-foreground">
          Manage gear categories available across the platform.
        </p>
      </div>
      <CategoriesTable></CategoriesTable>
    </div>
  );
};

export default page;
