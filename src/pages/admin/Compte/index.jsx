import { AdminBreadcrumb } from "@/components";


const AdminCompte = () => {
    return (
        <>
            <AdminBreadcrumb title="Liste de comptes" />
            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        <div className="grid grid-cols-1">
                            liste des comptes
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AdminCompte;
