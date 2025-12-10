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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModal = void 0;
const react_1 = __importStar(require("react"));
const navigation_1 = require("next/navigation");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const zod_2 = require("zod");
const sonner_1 = require("sonner");
const modal_1 = require("@/components/ui/modal");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const textarea_1 = require("@/components/ui/textarea");
const client_1 = __importDefault(require("@/lib/api/client"));
const bookingSchema = zod_2.z.object({
    scheduledDate: zod_2.z.string().min(1, 'La date est requise').refine((date) => {
        const selectedDate = new Date(date);
        const now = new Date();
        return selectedDate > now;
    }, 'La date doit être dans le futur'),
    description: zod_2.z.string().min(10, 'La description doit contenir au moins 10 caractères'),
});
const BookingModal = ({ selectedService, isOpen, onClose, }) => {
    const router = (0, navigation_1.useRouter)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const { register, handleSubmit, formState: { errors }, reset, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(bookingSchema),
    });
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await client_1.default.createBooking({
                proId: selectedService.proProfileId,
                serviceCategoryId: selectedService.serviceCategoryId,
                cityId: selectedService.cityId,
                description: data.description,
                scheduledDate: data.scheduledDate,
                priceEstimate: selectedService.basePrice,
            });
            sonner_1.toast.success('Réservation créée avec succès !');
            onClose();
            reset();
            router.push('/dashboard');
        }
        catch (error) {
            console.error('Booking error:', error);
            sonner_1.toast.error(error.message || 'Erreur lors de la création de la réservation');
        }
        finally {
            setLoading(false);
        }
    };
    return (<modal_1.Modal isOpen={isOpen} onClose={onClose} title="Réserver ce service">
      <div className="space-y-6">
        
        <div className="bg-surface rounded-lg p-4">
          <div className="text-center">
            <h3 className="font-semibold text-text-primary mb-2">Prix estimé</h3>
            <p className="text-2xl font-bold text-primary-500">{selectedService.basePrice} DH</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <input_1.Input type="datetime-local" label="Date et heure souhaitées *" {...register('scheduledDate')} error={errors.scheduledDate?.message} min={new Date().toISOString().slice(0, 16)}/>

          
          <textarea_1.Textarea label="Description de votre besoin *" placeholder="Décrivez en détail ce dont vous avez besoin..." rows={4} {...register('description')} error={errors.description?.message}/>

          
          <div className="flex space-x-3 pt-4">
            <button_1.Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={loading}>
              Annuler
            </button_1.Button>
            <button_1.Button type="submit" className="flex-1 bg-[#F97B22] hover:bg-[#F97B22]/90" disabled={loading}>
              {loading ? 'Création en cours...' : 'Réserver ce service'}
            </button_1.Button>
          </div>
        </form>
      </div>
    </modal_1.Modal>);
};
exports.BookingModal = BookingModal;
//# sourceMappingURL=booking-modal.js.map