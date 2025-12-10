"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProfessionals = void 0;
const react_1 = require("react");
const client_1 = __importDefault(require("../../lib/api/client"));
const useProfessionals = (filters) => {
    const [professionals, setProfessionals] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const fetchProfessionals = async () => {
            setIsLoading(true);
            try {
                const response = await client_1.default.getPros({
                    cityId: filters.cityId,
                    serviceCategoryId: filters.serviceCategoryId,
                    isVerified: filters.onlyVerified,
                });
                setProfessionals(response.items);
            }
            catch (error) {
                console.error('Error fetching professionals:', error);
                setProfessionals([]);
            }
            finally {
                setIsLoading(false);
            }
        };
        const timeoutId = setTimeout(fetchProfessionals, 800);
        return () => clearTimeout(timeoutId);
    }, [filters]);
    return { professionals, isLoading };
};
exports.useProfessionals = useProfessionals;
//# sourceMappingURL=use-mock-professionals.js.map