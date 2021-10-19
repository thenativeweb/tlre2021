import React, { FunctionComponent, ReactElement } from 'react';

interface ProviderConfig<T> {
  provider: React.ComponentType<T>;
  props?: React.ComponentProps<React.ComponentType<T>>;
}

type FlatProviderArray = ProviderConfig<any>[];

// eslint-disable-next-line func-style
function providerFrom<T> (provider: React.ComponentType<T>, props?: React.ComponentProps<React.ComponentType<T>>): ProviderConfig<T> {
  return {
    provider,
    props
  };
}

interface FlatProvidersProps {
  providers: FlatProviderArray;
  children: React.ReactNode;
}

const FlatProviders: FunctionComponent<FlatProvidersProps> = ({ providers, children }): ReactElement =>
  providers.reduceRight((innerChildren: any, nextProviderConf): any => {
    const { provider: ProviderComponent, props } = nextProviderConf;

    return (<ProviderComponent { ...props }>{ innerChildren }</ProviderComponent>);
  }, children);

export {
  FlatProviders,
  providerFrom
};

export type {
  FlatProviderArray,
  ProviderConfig
};
