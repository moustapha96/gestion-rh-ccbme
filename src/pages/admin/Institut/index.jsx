// import { AdminBreadcrumb } from "@/components";
// import InstitutListe from "./components/InstitutListe";

// const AdminInstitut = () => {
//   return (
//     <>
//       <AdminBreadcrumb title="Liste Instituts" />
//       <section>
//         <div className="container">
//           <div className="my-6 space-y-6">
//             <div className="grid grid-cols-1">
//               <InstitutListe />
//             </div>

//             <div className="grid grid-cols-1">
//               <DetailsInstitut />
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default AdminInstitut;
import { useState, useEffect } from "react";
import { AdminBreadcrumb } from "@/components";
import InstitutListe from "./components/InstitutListe";
import DetailsInstitut from "./components/DetailsInstitut"; // Assurez-vous que ce composant est importé

const AdminInstitut = () => {
  const [selectedInstitut, setSelectedInstitut] = useState(null); // État pour l'institut sélectionné

  return (
    <>
      <AdminBreadcrumb title="Liste Instituts" />
      <section>
        <div className="container">
          <div className="my-6 space-y-6">
            <div className="grid grid-cols-1">
              {/* Passez setSelectedInstitut comme prop à InstitutListe */}
              <InstitutListe setSelectedInstitut={setSelectedInstitut} />
            </div>

            <div className="grid grid-cols-1">
              {/* Passez selectedInstitut comme prop à DetailsInstitut */}
              <DetailsInstitut institut={selectedInstitut} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminInstitut;
