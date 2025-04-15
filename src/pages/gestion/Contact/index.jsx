import { useState, useEffect } from "react";
import { GestionBreadcrumb } from "@/components";
import { useAuthContext } from "@/context/useAuthContext";
import { getCommandeApprouveClientsEntreprise, getCommandeECDVClientsEntreprise, getCommandeRejeteClientsEntreprise } from "@/services/entrepriseFunctionService";

const ContactGestion = () => {



    return (
        <>
            <GestionBreadcrumb title="Gestion des contacts" />
            <section>
                <div className="container">
                    <div className="my-6 space-y-6">

                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactGestion;