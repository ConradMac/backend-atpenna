function getQuery(prestations) {
    const query = {};
    if (prestation) {
        const regexPrestation = new RegExp(prestations);
        query.prestation = regexPrestation;
    }
}

module.exports = getQuery;
