import React, { ComponentType } from 'react';
import { Suspense } from 'react';

type WrappedComponentType =
  | React.ReactChild
  | React.ReactFragment
  | React.ReactPortal;
type FallbackComponentType = WrappedComponentType | boolean | null;
function withSuspense<P>(
  WrappedComponent: ComponentType<P>,
  FallbackComponent: FallbackComponentType,
) {
  return class extends React.Component<P> {
    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <Suspense fallback={FallbackComponent}>
          <WrappedComponent {...this.props} />
        </Suspense>
      );
    }
  };
}

export default withSuspense;
