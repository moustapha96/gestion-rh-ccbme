import { AdminBreadcrumb } from "@/components";

import DemandeurListe from "./components/DemandeurListe";

const AdminDemandeur = () => {
  return (
    <>
      <AdminBreadcrumb title="Liste Demandeurs" />
      <section>
        <div className="container">
          <div className="my-6 space-y-6">
            <div className="grid grid-cols-1">
              <DemandeurListe />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDemandeur;
