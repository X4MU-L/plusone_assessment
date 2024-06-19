import React, { memo, useRef, useState, useEffect } from "react";

type Options = {
  duration: number;
  fill: FillMode;
};
const AnimationWrapper = memo(
  ({ show, children }: { show: boolean; children: React.ReactNode }) => {
    const elementRef = useRef<Element | null>(null);

    const [removeState, setRemove] = useState(!show);

    useEffect(() => {
      const options: Options = { duration: 200, fill: "forwards" };
      const from = { opacity: 0, transform: "translateX(100%)" };
      const to = { opacity: 1, transform: "translateX(0)" };
      const childElement = elementRef.current;
      let animation;
      if (show) {
        setRemove(false);
        if (!childElement) return;
        animation = childElement.animate([from, to], options);
      } else {
        if (!childElement) return;
        animation = childElement.animate([to, from], options);

        animation.onfinish = () => {
          setRemove(true);
        };
      }

      return () => {
        animation?.cancel();
        console.log("unmounted");
      };
    }, [show, removeState]);

    return (
      !removeState && (
        <div
          ref={(element) => {
            if (element) elementRef.current = element;
          }}
        >
          {children}
        </div>
      )
    );
  }
);

export default AnimationWrapper;
