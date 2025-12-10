"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProDetail = useProDetail;
const react_1 = require("react");
const client_1 = __importDefault(require("../../lib/api/client"));
function useProDetail(id) {
    const [professional, setProfessional] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchProfessional = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const found = await client_1.default.getProById(id);
                setProfessional(found);
            }
            catch (err) {
                setError('Erreur lors du chargement du professionnel');
                setProfessional(null);
            }
            finally {
                setIsLoading(false);
            }
        };
        if (id) {
            fetchProfessional();
        }
    }, [id]);
    return { professional, isLoading, error };
}
//# sourceMappingURL=use-pro-detail.js.map