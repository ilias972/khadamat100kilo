"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartContainer = ChartContainer;
exports.ChartLegend = ChartLegend;
exports.ChartTooltip = ChartTooltip;
exports.ResponsiveChartContainer = ResponsiveChartContainer;
const react_1 = __importDefault(require("react"));
const utils_1 = require("@/lib/utils");
const loading_1 = require("@/components/ui/loading");
function ChartContainer({ title, subtitle, children, loading = false, error = null, className, actions, height = 300, showBorder = true }) {
    if (loading) {
        return (<div className={(0, utils_1.cn)('bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)]', showBorder && 'border border-border-light', className)} style={{ height: `${height + 80}px` }}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-text-primary font-heading">{title}</h3>
              {subtitle && (<p className="text-sm text-text-secondary mt-1">{subtitle}</p>)}
            </div>
            {actions}
          </div>
          <div className="flex items-center justify-center h-full">
            <loading_1.Loading size="md"/>
          </div>
        </div>
      </div>);
    }
    if (error) {
        return (<div className={(0, utils_1.cn)('bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-red-200', className)} style={{ height: `${height + 80}px` }}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-text-primary font-heading">{title}</h3>
              {subtitle && (<p className="text-sm text-text-secondary mt-1">{subtitle}</p>)}
            </div>
            {actions}
          </div>
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <p className="text-red-600 font-medium mb-2">Erreur de chargement</p>
              <p className="text-sm text-text-secondary">{error}</p>
            </div>
          </div>
        </div>
      </div>);
    }
    return (<div className={(0, utils_1.cn)('bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)]', showBorder && 'border border-border-light', className)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-text-primary font-heading">{title}</h3>
            {subtitle && (<p className="text-sm text-text-secondary mt-1">{subtitle}</p>)}
          </div>
          {actions}
        </div>
        <div style={{ height: `${height}px` }}>
          {children}
        </div>
      </div>
    </div>);
}
function ChartLegend({ items, className }) {
    return (<div className={(0, utils_1.cn)('flex flex-wrap gap-4 justify-center mt-4', className)}>
      {items.map((item, index) => (<div key={index} className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}/>
          <span className="text-sm text-text-secondary">{item.label}</span>
          {item.value && (<span className="text-sm font-medium text-text-primary">{item.value}</span>)}
        </div>))}
    </div>);
}
function ChartTooltip({ active, payload, label, formatter }) {
    if (!active || !payload || !payload.length)
        return null;
    return (<div className="bg-white/95 backdrop-blur-sm border border-border-light rounded-lg shadow-lg p-3">
      {label && (<p className="text-sm font-medium text-text-primary mb-2">{label}</p>)}
      {payload.map((entry, index) => {
            const formattedValue = formatter
                ? formatter(entry.value, entry.dataKey)[0]
                : entry.value.toLocaleString();
            return (<div key={index} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}/>
            <span className="text-sm text-text-secondary">
              {formatter ? formatter(entry.value, entry.dataKey)[1] : entry.dataKey}:
            </span>
            <span className="text-sm font-medium text-text-primary">
              {formattedValue}
            </span>
          </div>);
        })}
    </div>);
}
function ResponsiveChartContainer({ children, aspectRatio = 16 / 9, className }) {
    return (<div className={(0, utils_1.cn)('relative w-full', className)}>
      <div className="w-full" style={{
            paddingBottom: `${100 / aspectRatio}%`
        }}/>
      <div className="absolute inset-0">
        {children}
      </div>
    </div>);
}
//# sourceMappingURL=ChartContainer.js.map