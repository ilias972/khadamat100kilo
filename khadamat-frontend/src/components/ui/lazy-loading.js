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
exports.useLazyLoad = exports.VirtualizedList = exports.ProgressiveImage = exports.InfiniteScroll = exports.LazySection = exports.LazyImage = void 0;
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const utils_1 = require("@/lib/utils");
const feedback_system_1 = require("./feedback-system");
const LazyImage = ({ src, alt, fallbackSrc, className, containerClassName, blurDataURL, priority = false, placeholder = 'blur', onLoad, onError, ...imgProps }) => {
    const [isLoaded, setIsLoaded] = (0, react_1.useState)(false);
    const [hasError, setHasError] = (0, react_1.useState)(false);
    const [currentSrc, setCurrentSrc] = (0, react_1.useState)(fallbackSrc || src);
    const imgRef = (0, react_1.useRef)(null);
    const containerRef = (0, react_1.useRef)(null);
    const isInView = (0, framer_motion_1.useInView)(containerRef, { once: true, margin: "50px" });
    const handleLoad = (0, react_1.useCallback)(() => {
        setIsLoaded(true);
        onLoad?.();
    }, [onLoad]);
    const handleError = (0, react_1.useCallback)(() => {
        setHasError(true);
        if (currentSrc !== fallbackSrc && fallbackSrc) {
            setCurrentSrc(fallbackSrc);
            setHasError(false);
        }
        onError?.();
    }, [currentSrc, fallbackSrc, onError]);
    (0, react_1.useEffect)(() => {
        if (!isInView && !priority)
            return;
        const img = new Image();
        img.src = src;
        img.onload = handleLoad;
        img.onerror = handleError;
        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src, isInView, priority, handleLoad, handleError]);
    const shouldShowImage = isLoaded && !hasError && (isInView || priority);
    return (<div ref={containerRef} className={(0, utils_1.cn)('relative overflow-hidden', containerClassName)}>
      
      <framer_motion_1.AnimatePresence>
        {!shouldShowImage && (<framer_motion_1.motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className={(0, utils_1.cn)('absolute inset-0 flex items-center justify-center bg-gray-100', className)}>
            {placeholder === 'blur' && blurDataURL ? (<img src={blurDataURL} alt="" className="w-full h-full object-cover filter blur-sm scale-110" aria-hidden="true"/>) : placeholder === 'empty' ? (<div className="w-full h-full bg-gray-200 animate-pulse"/>) : (placeholder)}
          </framer_motion_1.motion.div>)}
      </framer_motion_1.AnimatePresence>

      
      <framer_motion_1.AnimatePresence>
        {!isLoaded && !hasError && (isInView || priority) && (<framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <feedback_system_1.LoadingSpinner size="md"/>
          </framer_motion_1.motion.div>)}
      </framer_motion_1.AnimatePresence>

      
      <framer_motion_1.AnimatePresence>
        {shouldShowImage && (<framer_motion_1.motion.div className={(0, utils_1.cn)('w-full h-full', className)} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <img ref={imgRef} src={currentSrc} alt={alt} className="w-full h-full object-cover" {...imgProps}/>
          </framer_motion_1.motion.div>)}
      </framer_motion_1.AnimatePresence>

      
      {hasError && (<div className={(0, utils_1.cn)('absolute inset-0 flex items-center justify-center bg-gray-100', className)}>
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <p className="text-sm">Image non disponible</p>
          </div>
        </div>)}
    </div>);
};
exports.LazyImage = LazyImage;
const LazySection = ({ children, className, threshold = 0.1, rootMargin = '0px 0px -100px 0px', triggerOnce = true, animationType = 'fade', staggerDelay = 0.1 }) => {
    const ref = (0, react_1.useRef)(null);
    const isInView = (0, framer_motion_1.useInView)(ref, {
        amount: threshold,
        margin: rootMargin,
        once: triggerOnce
    });
    if (animationType === 'stagger') {
        return (<framer_motion_1.motion.div ref={ref} className={className} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}>
        {react_1.default.Children.map(children, (child, index) => (<framer_motion_1.motion.div key={index} variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                }} transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
            {child}
          </framer_motion_1.motion.div>))}
      </framer_motion_1.motion.div>);
    }
    const getInitialVariant = () => {
        switch (animationType) {
            case 'fade':
                return { opacity: 0, y: 30 };
            case 'slide-up':
                return { opacity: 0, y: 50 };
            case 'slide-left':
                return { opacity: 0, x: -50 };
            case 'slide-right':
                return { opacity: 0, x: 50 };
            case 'scale':
                return { opacity: 0, scale: 0.9 };
            default:
                return { opacity: 0, y: 30 };
        }
    };
    const getAnimateVariant = () => {
        switch (animationType) {
            case 'fade':
                return { opacity: 1, y: 0 };
            case 'slide-up':
                return { opacity: 1, y: 0 };
            case 'slide-left':
                return { opacity: 1, x: 0 };
            case 'slide-right':
                return { opacity: 1, x: 0 };
            case 'scale':
                return { opacity: 1, scale: 1 };
            default:
                return { opacity: 1, y: 0 };
        }
    };
    return (<framer_motion_1.motion.div ref={ref} className={className} initial={getInitialVariant()} animate={isInView ? getAnimateVariant() : getInitialVariant()} transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </framer_motion_1.motion.div>);
};
exports.LazySection = LazySection;
const InfiniteScroll = ({ children, hasNextPage, isLoading, onLoadMore, threshold = 100, className, loadingComponent, endMessage }) => {
    const loadMoreRef = (0, react_1.useRef)(null);
    const isInView = (0, framer_motion_1.useInView)(loadMoreRef, { amount: 0.1 });
    (0, react_1.useEffect)(() => {
        if (isInView && hasNextPage && !isLoading) {
            onLoadMore();
        }
    }, [isInView, hasNextPage, isLoading, onLoadMore]);
    return (<div className={className}>
      {children}

      
      {isLoading && (<framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center py-8">
          {loadingComponent || (<div className="flex items-center space-x-2 text-gray-600">
              <feedback_system_1.LoadingSpinner size="md"/>
              <span>Chargement...</span>
            </div>)}
        </framer_motion_1.motion.div>)}

      
      {hasNextPage && !isLoading && (<div ref={loadMoreRef} className="h-4"/>)}

      
      {!hasNextPage && !isLoading && endMessage && (<framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 text-gray-500">
          {endMessage}
        </framer_motion_1.motion.div>)}
    </div>);
};
exports.InfiniteScroll = InfiniteScroll;
const ProgressiveImage = ({ qualitySrcSet, ...props }) => {
    const [quality, setQuality] = (0, react_1.useState)('low');
    const [isHighQualityLoaded, setIsHighQualityLoaded] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (!qualitySrcSet)
            return;
        const mediumTimer = setTimeout(() => {
            setQuality('medium');
        }, 100);
        const highTimer = setTimeout(() => {
            setQuality('high');
            setIsHighQualityLoaded(true);
        }, 500);
        return () => {
            clearTimeout(mediumTimer);
            clearTimeout(highTimer);
        };
    }, [qualitySrcSet]);
    const currentSrc = qualitySrcSet ? qualitySrcSet[quality] : props.src;
    return (<exports.LazyImage {...props} src={currentSrc} className={(0, utils_1.cn)(props.className, !isHighQualityLoaded && 'filter blur-sm', isHighQualityLoaded && 'filter-none')} onLoad={() => {
            if (quality === 'high') {
                setIsHighQualityLoaded(true);
            }
            props.onLoad?.();
        }}/>);
};
exports.ProgressiveImage = ProgressiveImage;
const VirtualizedList = ({ items, itemHeight, containerHeight, renderItem, className, overscan = 5 }) => {
    const [scrollTop, setScrollTop] = (0, react_1.useState)(0);
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(items.length - 1, Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan);
    const visibleItems = items.slice(startIndex, endIndex + 1);
    const handleScroll = (e) => {
        setScrollTop(e.currentTarget.scrollTop);
    };
    return (<div className={(0, utils_1.cn)('overflow-auto', className)} style={{ height: containerHeight }} onScroll={handleScroll}>
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <framer_motion_1.motion.div style={{
            transform: `translateY(${startIndex * itemHeight}px)`
        }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          {visibleItems.map((item, index) => (<div key={startIndex + index} style={{ height: itemHeight }}>
              {renderItem(item, startIndex + index)}
            </div>))}
        </framer_motion_1.motion.div>
      </div>
    </div>);
};
exports.VirtualizedList = VirtualizedList;
const useLazyLoad = (options) => {
    const [isInView, setIsInView] = (0, react_1.useState)(false);
    const [hasBeenInView, setHasBeenInView] = (0, react_1.useState)(false);
    const ref = (0, react_1.useRef)(null);
    const setRef = (0, react_1.useCallback)((node) => {
        if (ref.current) {
            const observer = new IntersectionObserver(() => { }, options);
            observer.disconnect();
        }
        ref.current = node;
        if (node) {
            const observer = new IntersectionObserver(([entry]) => {
                setIsInView(entry.isIntersecting);
                if (entry.isIntersecting && !hasBeenInView) {
                    setHasBeenInView(true);
                }
            }, options);
            observer.observe(node);
            return () => observer.disconnect();
        }
    }, [options, hasBeenInView]);
    return { ref: setRef, isInView, hasBeenInView };
};
exports.useLazyLoad = useLazyLoad;
//# sourceMappingURL=lazy-loading.js.map