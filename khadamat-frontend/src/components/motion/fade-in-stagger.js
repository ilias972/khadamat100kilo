'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FadeInStaggerGrid = exports.FadeInStaggerRight = exports.FadeInStaggerLeft = exports.FadeInStaggerDown = exports.FadeInStaggerUp = exports.FadeInStagger = void 0;
const react_1 = __importDefault(require("react"));
const framer_motion_1 = require("framer-motion");
const FadeInStagger = ({ children, className = '', staggerDelay = 0.1, direction = 'up', distance = 20, duration = 300, once = true, triggerOnce = true }) => {
    const getInitialPosition = () => {
        switch (direction) {
            case 'up':
                return { y: distance };
            case 'down':
                return { y: -distance };
            case 'left':
                return { x: distance };
            case 'right':
                return { x: -distance };
            case 'none':
            default:
                return {};
        }
    };
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.2,
            }
        }
    };
    const childVariants = {
        hidden: {
            opacity: 0,
            ...getInitialPosition()
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0
        }
    };
    return (<framer_motion_1.motion.div className={className} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
            once: triggerOnce,
            margin: once ? "-50px" : "0px"
        }}>
      {react_1.default.Children.map(children, (child, index) => (<framer_motion_1.motion.div key={index} variants={childVariants} style={{
                position: 'relative'
            }}>
          {child}
        </framer_motion_1.motion.div>))}
    </framer_motion_1.motion.div>);
};
exports.FadeInStagger = FadeInStagger;
const FadeInStaggerUp = (props) => (<exports.FadeInStagger {...props} direction="up"/>);
exports.FadeInStaggerUp = FadeInStaggerUp;
const FadeInStaggerDown = (props) => (<exports.FadeInStagger {...props} direction="down"/>);
exports.FadeInStaggerDown = FadeInStaggerDown;
const FadeInStaggerLeft = (props) => (<exports.FadeInStagger {...props} direction="left"/>);
exports.FadeInStaggerLeft = FadeInStaggerLeft;
const FadeInStaggerRight = (props) => (<exports.FadeInStagger {...props} direction="right"/>);
exports.FadeInStaggerRight = FadeInStaggerRight;
const FadeInStaggerGrid = ({ children, columns = 3, rows, staggerDelay = 0.05, ...props }) => {
    const childrenArray = react_1.default.Children.toArray(children);
    const totalItems = childrenArray.length;
    const actualRows = rows || Math.ceil(totalItems / columns);
    return (<framer_motion_1.motion.div className={props.className} initial="hidden" whileInView="visible" viewport={{
            once: props.triggerOnce,
            margin: props.once ? "-50px" : "0px"
        }} variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: staggerDelay,
                    delayChildren: 0.1,
                }
            }
        }}>
      {childrenArray.map((child, index) => {
            const row = Math.floor(index / columns);
            const col = index % columns;
            return (<framer_motion_1.motion.div key={index} variants={{
                    hidden: {
                        opacity: 0,
                        y: 30,
                        scale: 0.9
                    },
                    visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                            duration: props.duration ? props.duration / 1000 : 0.3,
                            ease: "easeOut",
                            delay: (row * 0.1) + (col * 0.05)
                        }
                    }
                }} style={{
                    position: 'relative'
                }}>
            {child}
          </framer_motion_1.motion.div>);
        })}
    </framer_motion_1.motion.div>);
};
exports.FadeInStaggerGrid = FadeInStaggerGrid;
exports.default = exports.FadeInStagger;
//# sourceMappingURL=fade-in-stagger.js.map