const DetailsInstitut = ({ institut }) => {
    if (!institut) {
        return <div>Sélectionnez un institut pour voir les détails</div>;
    }

    return (
        <div className="rounded-md border border-default-200 bg-white p-4">
            <h2 className="text-lg font-semibold">{institut.name}</h2>
            <p>Type: {institut.type}</p>
            <p>Pays de résidence: {institut.paysResidence}</p>
            <p>Nombre de documents: {institut.documents.length}</p>
            {/* Ajoutez ici d'autres informations sur l'institut */}
        </div>
    );
};

export default DetailsInstitut;
