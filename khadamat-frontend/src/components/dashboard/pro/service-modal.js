'use client';
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModal = void 0;
const react_1 = __importStar(require("react"));
const modal_1 = require("@/components/ui/modal");
const input_1 = require("@/components/ui/input");
const textarea_1 = require("@/components/ui/textarea");
const button_1 = require("@/components/ui/button");
const api_client_1 = require("@/lib/api-client");
const sonner_1 = require("sonner");
const ServiceModal = ({ isOpen, onClose, onSave, editingService, }) => {
    const [isSaving, setIsSaving] = (0, react_1.useState)(false);
    const [category, setCategory] = (0, react_1.useState)('');
    const [city, setCity] = (0, react_1.useState)('');
    const [price, setPrice] = (0, react_1.useState)('');
    const [description, setDescription] = (0, react_1.useState)('');
    const [categories, setCategories] = (0, react_1.useState)([]);
    const [cities, setCities] = (0, react_1.useState)([]);
    const isEditing = !!editingService;
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            try {
                const [cats, cits] = await Promise.all([
                    api_client_1.locationsApi.getCategories(),
                    api_client_1.locationsApi.getCities()
                ]);
                setCategories(cats);
                setCities(cits);
            }
            catch (error) {
                sonner_1.toast.error('Erreur lors du chargement des données');
            }
        };
        fetchData();
    }, []);
    (0, react_1.useEffect)(() => {
        if (isOpen) {
            if (isEditing) {
                setCategory(editingService.serviceCategoryId);
                setCity(editingService.cityId);
                setPrice(editingService.price.toString());
                setDescription(editingService.description);
            }
            else {
                setCategory('');
                setCity('');
                setPrice('');
                setDescription('');
            }
        }
    }, [isOpen, editingService, isEditing]);
    const handleSave = async () => {
        if (parseFloat(price) <= 0 || !description.trim() || !category || !city) {
            sonner_1.toast.error('Tous les champs sont requis et le prix doit être supérieur à 0.');
            return;
        }
        setIsSaving(true);
        try {
            if (isEditing) {
                const serviceData = {
                    id: editingService.id,
                    name: editingService.name,
                    category,
                    price: parseFloat(price),
                    description,
                    isActive: editingService.isActive,
                };
                onSave(serviceData);
            }
            else {
                await api_client_1.proApi.createService({
                    categoryId: category,
                    cityId: city,
                    basePrice: parseFloat(price),
                    description,
                });
                sonner_1.toast.success('Service créé avec succès');
                onClose();
            }
        }
        catch (error) {
            sonner_1.toast.error('Erreur lors de la sauvegarde');
        }
        finally {
            setIsSaving(false);
        }
    };
    return (<modal_1.Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Modifier le service' : 'Ajouter un service'} size="md">
      <div className="space-y-4">
        {!isEditing && (<div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Catégorie
            </label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="block w-full rounded-3xl border bg-surface px-3 py-2 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (<option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>))}
            </select>
          </div>)}

        {!isEditing && (<div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Ville
            </label>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="block w-full rounded-3xl border bg-surface px-3 py-2 text-text-primary focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="">Sélectionner une ville</option>
              {cities.map((cit) => (<option key={cit.id} value={cit.id}>
                  {cit.name}
                </option>))}
            </select>
          </div>)}

        {isEditing && (<div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Nom du service
            </label>
            <div className="block w-full rounded-3xl border bg-surface px-3 py-2 text-text-muted">
              {editingService.name}
            </div>
          </div>)}

        <input_1.Input label="Prix de base (DH)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Ex: 150"/>

        <textarea_1.Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Décrivez le service..." rows={4}/>

        <div className="flex justify-end space-x-3 pt-4">
          <button_1.Button variant="ghost" onClick={onClose} disabled={isSaving}>
            Annuler
          </button_1.Button>
          <button_1.Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Enregistrement...' : 'Enregistrer'}
          </button_1.Button>
        </div>
      </div>
    </modal_1.Modal>);
};
exports.ServiceModal = ServiceModal;
//# sourceMappingURL=service-modal.js.map