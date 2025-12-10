'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProsGrid = void 0;
const react_1 = __importDefault(require("react"));
const pro_card_1 = require("./pro-card");
const pros_empty_state_1 = require("./pros-empty-state");
const pros_skeleton_1 = require("./pros-skeleton");
const pros_pagination_1 = require("./pros-pagination");
const ProsGrid = ({ professionals, isLoading = false, isUsingMocks = false, onPageChange, currentPage, totalPages, }) => {
    if (isLoading) {
        return <pros_skeleton_1.ProsSkeleton />;
    }
    if (!professionals || professionals.length === 0) {
        return <pros_empty_state_1.ProsEmptyState />;
    }
    return (<div className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionals.map((pro) => (<pro_card_1.ProCard key={pro.id} professional={pro}/>))}
      </div>

      
      <pros_pagination_1.ProsPagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
    </div>);
};
exports.ProsGrid = ProsGrid;
//# sourceMappingURL=pros-grid.js.map